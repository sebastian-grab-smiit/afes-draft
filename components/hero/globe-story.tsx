"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import type { GlobeMethods } from "react-globe.gl";
import { AFES_LOCATIONS } from "@/lib/afes-locations";

type GlobePoint = (typeof AFES_LOCATIONS)[number] & {
  pinScale: number;
  pinOpacity: number;
};

type GlobeArc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  dashOffset: number;
};

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

interface GlobeStoryProps {
  progress: number;
}

type GlobeViewState = "overview" | "focus";

const OVERVIEW_POV = { lat: 18, lng: 0, altitude: 2.05 } as const;
const FOCUS_POV = { lat: 50, lng: 10, altitude: 0.72 } as const;
const ENTER_FOCUS_THRESHOLD = 0.16;
const LEAVE_FOCUS_THRESHOLD = 0.14;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function GlobeStory({ progress }: GlobeStoryProps) {
  const globeWrapRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const rafRef = useRef<number | null>(null);
  const isScrollControlledRef = useRef(false);
  const idleLngRef = useRef(0);
  const idleLastTsRef = useRef(0);
  const viewStateRef = useRef<GlobeViewState>("overview");
  const pendingViewStateRef = useRef<GlobeViewState | null>(null);
  const transitionTweenRef = useRef<gsap.core.Tween | null>(null);
  const viewBlendRef = useRef({ value: 0 });
  const viewBlendCommittedRef = useRef(0);

  const [isMounted, setIsMounted] = useState(false);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 520, height: 520 });
  const [viewBlend, setViewBlend] = useState(0);
  const [countriesGeoJson, setCountriesGeoJson] = useState<GeoJSON.FeatureCollection | null>(null);

  const smoothedProgress = useMemo(() => {
    // Reduce high-frequency prop jitter while preserving visual continuity.
    return Math.round(clamp01(progress) * 120) / 120;
  }, [progress]);

  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color("#c5d4db");
    material.emissive = new THREE.Color("#edf8ff");
    material.specular = new THREE.Color("#000000");
    material.shininess = 1;
    return material;
  }, []);

  const markerReveal = useMemo(() => {
    const t = clamp01((viewBlend - 0.82) / 0.18);
    return easeInOutCubic(t);
  }, [viewBlend]);

  const points = useMemo<GlobePoint[]>(() => {
    if (markerReveal <= 0.03) return [];

    return AFES_LOCATIONS.map((location) => ({
      ...location,
      pinScale: 0.35 + markerReveal * 0.85,
      pinOpacity: 1,
    }));
  }, [markerReveal]);

  const introArcs = useMemo<GlobeArc[]>(() => {
    const revealFactor = clamp01((0.42 - viewBlend) / 0.42);
    if (revealFactor <= 0.02) return [];

    const alpha = 0.9 * revealFactor;
    const total = 8;
    const golden = 137.508;

    return Array.from({ length: total }, (_, index) => {
      const startLat = (((index * 29.7) % 140) - 70);
      const startLng = ((index * golden * 1.9) % 360) - 180;

      const endLat = Math.max(-70, Math.min(70, -startLat * 0.82 + ((index % 3) - 1) * 6));
      const rawOppositeLng = startLng + 170 + (index % 2 === 0 ? 12 : -12);
      const endLng = ((rawOppositeLng + 540) % 360) - 180;

      return {
        startLat,
        startLng,
        endLat,
        endLng,
        color: `rgba(70,185,170,${alpha.toFixed(3)})`,
        dashOffset: (index * 0.37) % 1,
      };
    });
  }, [viewBlend]);

  useEffect(() => {
    setIsMounted(true);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const side = Math.min(entry.contentRect.width, 760);
      const width = Math.max(360, side);
      const height = Math.max(420, Math.min(entry.contentRect.height, 760));

      setDimensions({ width, height });
    });

    if (globeWrapRef.current) {
      observer.observe(globeWrapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;

    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((response) => response.json())
      .then((data: GeoJSON.FeatureCollection) => {
        if (mounted) {
          setCountriesGeoJson(data);
        }
      })
      .catch(() => {
        if (mounted) {
          setCountriesGeoJson(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      viewStateRef.current = "focus";
      viewBlendRef.current.value = 1;
      viewBlendCommittedRef.current = 1;
      setViewBlend(1);
      globeRef.current?.pointOfView(FOCUS_POV, 0);
      isScrollControlledRef.current = true;
      return;
    }

    const resolveTargetState = (clamped: number, current: GlobeViewState): GlobeViewState => {
      if (current === "overview") {
        return clamped >= ENTER_FOCUS_THRESHOLD ? "focus" : "overview";
      }

      return clamped <= LEAVE_FOCUS_THRESHOLD ? "overview" : "focus";
    };

    const applyBlend = () => {
      const globe = globeRef.current;
      const blend = clamp01(viewBlendRef.current.value);
      if (globe) {
        globe.pointOfView(
          {
            lat: lerp(OVERVIEW_POV.lat, FOCUS_POV.lat, blend),
            lng: lerp(OVERVIEW_POV.lng, FOCUS_POV.lng, blend),
            altitude: lerp(OVERVIEW_POV.altitude, FOCUS_POV.altitude, blend),
          },
          0
        );
      }

      const quantized = Math.round(blend * 200) / 200;
      if (quantized === viewBlendCommittedRef.current) return;
      viewBlendCommittedRef.current = quantized;
      setViewBlend(quantized);
    };

    const startTransition = (targetState: GlobeViewState) => {
      const targetBlend = targetState === "focus" ? 1 : 0;

      transitionTweenRef.current?.kill();
      isScrollControlledRef.current = true;

      transitionTweenRef.current = gsap.to(viewBlendRef.current, {
        value: targetBlend,
        duration: 0.68,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: applyBlend,
        onComplete: () => {
          transitionTweenRef.current = null;
          viewStateRef.current = targetState;

          const pending = pendingViewStateRef.current;
          pendingViewStateRef.current = null;

          if (pending && pending !== viewStateRef.current) {
            startTransition(pending);
            return;
          }

          if (viewStateRef.current === "overview") {
            const globe = globeRef.current;
            if (globe) {
              idleLngRef.current = globe.pointOfView().lng;
            }
            isScrollControlledRef.current = false;
            return;
          }

          isScrollControlledRef.current = true;
        },
      });
    };

    const clampedProgress = smoothedProgress;
    const desiredState = resolveTargetState(clampedProgress, viewStateRef.current);

    if (desiredState === viewStateRef.current && !transitionTweenRef.current) {
      return;
    }

    if (transitionTweenRef.current) {
      pendingViewStateRef.current = desiredState;
      return;
    }

    startTransition(desiredState);
  }, [isMounted, smoothedProgress]);

  useEffect(() => {
    const animateIdle = (ts: number) => {
      const globe = globeRef.current;
      if (globe) {
        if (!isScrollControlledRef.current) {
          if (ts - idleLastTsRef.current >= 33) {
            idleLastTsRef.current = ts;
            idleLngRef.current += 0.05;
            globe.pointOfView({ lat: 18, lng: idleLngRef.current, altitude: 2.05 }, 0);
          }
        }
      }

      rafRef.current = requestAnimationFrame(animateIdle);
    };

    rafRef.current = requestAnimationFrame(animateIdle);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isGlobeReady) return;

    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    controls.autoRotate = false;
    controls.enableZoom = false;

    globe.pointOfView(OVERVIEW_POV, 0);
  }, [isGlobeReady]);

  useEffect(() => {
    const hideOverlayTooltip = () => {
      const overlay = document.getElementById("globe-tooltip-overlay") as HTMLDivElement | null;
      if (overlay) {
        overlay.style.opacity = "0";
      }
    };

    window.addEventListener("scroll", hideOverlayTooltip, { passive: true });
    window.addEventListener("wheel", hideOverlayTooltip, { passive: true });
    window.addEventListener("touchmove", hideOverlayTooltip, { passive: true });
    window.addEventListener("blur", hideOverlayTooltip);
    document.addEventListener("visibilitychange", hideOverlayTooltip);

    return () => {
      window.removeEventListener("scroll", hideOverlayTooltip);
      window.removeEventListener("wheel", hideOverlayTooltip);
      window.removeEventListener("touchmove", hideOverlayTooltip);
      window.removeEventListener("blur", hideOverlayTooltip);
      document.removeEventListener("visibilitychange", hideOverlayTooltip);
    };
  }, []);

  return (
    <div className="relative h-[calc(100vh-8rem)] min-h-[520px] w-full">
      <div
        ref={globeWrapRef}
        className="mx-auto flex h-[80vh] min-h-[560px] w-full max-w-[48rem] items-start justify-center"
      >
        <div className="relative h-full w-full overflow-visible">
          {isMounted && (
            <Globe
              ref={globeRef}
              onGlobeReady={() => setIsGlobeReady(true)}
              width={dimensions.width}
              height={dimensions.height}
              animateIn={false}
              globeImageUrl={null}
              bumpImageUrl={null}
              globeMaterial={globeMaterial}
              backgroundColor="rgba(0,0,0,0)"
              showAtmosphere
              atmosphereColor="#c5d4db"
              atmosphereAltitude={0.14}
              showGraticules={false}
              polygonsData={countriesGeoJson?.features ?? []}
              polygonCapColor={() => "#c5d4db"}
              polygonSideColor={() => "#c5d4db"}
              polygonStrokeColor={() => "rgb(255, 255, 255)"}
              polygonAltitude={0.008}
              arcsData={introArcs}
              arcStartLat="startLat"
              arcStartLng="startLng"
              arcEndLat="endLat"
              arcEndLng="endLng"
              arcColor="color"
              arcStroke={0.7}
              arcAltitudeAutoScale={0.36}
              arcDashLength={0.42}
              arcDashGap={1.1}
              arcDashInitialGap="dashOffset"
              arcDashAnimateTime={4600}
              arcsTransitionDuration={250}
              htmlElementsData={points}
              htmlLat="lat"
              htmlLng="lng"
              htmlElement={(point) => {
                const p = point as GlobePoint;
                const el = document.createElement("div");
                el.style.position = "relative";
                el.style.transform = `translate(-50%, -100%) scale(${p.pinScale})`;
                el.style.transformOrigin = "center bottom";
                el.style.opacity = "1";
                el.style.transition = "transform 260ms ease";
                el.style.pointerEvents = "auto";
                el.style.cursor = "pointer";
                el.style.zIndex = "2";

                const marker = document.createElement("span");
                marker.style.display = "block";
                marker.style.position = "relative";
                marker.style.width = "15px";
                marker.style.height = "15px";
                marker.style.background = "#16aea3";

                if (!p.simpleMarker) {
                  const icon = document.createElement("span");
                  icon.style.position = "absolute";
                  icon.style.left = "50%";
                  icon.style.top = "50%";
                  icon.style.width = "8px";
                  icon.style.height = "8px";
                  icon.style.transform = "translate(-50%, -50%)";
                  icon.style.background = "#ffffff";
                  icon.style.webkitMask = "url(/icon.svg) center / contain no-repeat";
                  icon.style.mask = "url(/icon.svg) center / contain no-repeat";
                  marker.appendChild(icon);
                }

                const getOverlayTooltip = () => {
                  let overlay = document.getElementById("globe-tooltip-overlay") as HTMLDivElement | null;

                  if (!overlay) {
                    overlay = document.createElement("div");
                    overlay.id = "globe-tooltip-overlay";
                    overlay.style.position = "fixed";
                    overlay.style.left = "0";
                    overlay.style.top = "0";
                    overlay.style.minWidth = "280px";
                    overlay.style.maxWidth = "320px";
                    overlay.style.padding = "12px 14px";
                    overlay.style.borderRadius = "10px";
                    overlay.style.background = "rgba(11, 22, 45, 0.97)";
                    overlay.style.color = "#ffffff";
                    overlay.style.boxShadow = "0 10px 28px rgba(0,0,0,.28)";
                    overlay.style.border = "1px solid rgba(255,255,255,.14)";
                    overlay.style.fontFamily = "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
                    overlay.style.fontSize = "12px";
                    overlay.style.lineHeight = "1.35";
                    overlay.style.whiteSpace = "normal";
                    overlay.style.zIndex = "2147483647";
                    overlay.style.opacity = "0";
                    overlay.style.pointerEvents = "none";
                    overlay.style.transition = "opacity 160ms ease";
                    document.body.appendChild(overlay);
                  }

                  return overlay;
                };

                el.appendChild(marker);

                if (p.simpleMarker) {
                  return el;
                }

                const parts: string[] = [];
                parts.push(`<div style=\"font-size:13px;font-weight:700;margin-bottom:2px;color:#9fe6dd\">${p.name}</div>`);
                parts.push(`<div style=\"font-weight:600;margin-bottom:6px\">${p.company}</div>`);

                if (p.addressLines?.length) {
                  parts.push(`<div style=\"margin-bottom:6px;opacity:.95\">${p.addressLines.join("<br/>")}</div>`);
                }

                if (p.phone?.length) {
                  parts.push(`<div style=\"margin-bottom:4px\"><span style=\"opacity:.7\">T:</span> ${p.phone.join(" / ")}</div>`);
                }

                if (p.fax?.length) {
                  parts.push(`<div style=\"margin-bottom:4px\"><span style=\"opacity:.7\">F:</span> ${p.fax.join(" / ")}</div>`);
                }

                if (p.email) {
                  parts.push(`<div style=\"margin-bottom:4px;word-break:break-word\">${p.email}</div>`);
                }

                if (p.management) {
                  parts.push(`<div style=\"margin-bottom:2px\"><span style=\"opacity:.7\">Management:</span> ${p.management}</div>`);
                }

                if (p.officeHead) {
                  parts.push(`<div><span style=\"opacity:.7\">Office management:</span> ${p.officeHead}</div>`);
                }

                const positionTooltip = (event: MouseEvent) => {
                  const overlay = getOverlayTooltip();
                  const xOffset = 14;
                  const yOffset = 14;
                  const vw = window.innerWidth;
                  const vh = window.innerHeight;
                  const rect = overlay.getBoundingClientRect();

                  let left = event.clientX + xOffset;
                  let top = event.clientY + yOffset;

                  if (left + rect.width > vw - 12) {
                    left = event.clientX - rect.width - xOffset;
                  }

                  if (top + rect.height > vh - 12) {
                    top = vh - rect.height - 12;
                  }

                  if (top < 12) {
                    top = 12;
                  }

                  if (left < 12) {
                    left = 12;
                  }

                  overlay.style.left = `${left}px`;
                  overlay.style.top = `${top}px`;
                };

                el.addEventListener("mouseenter", (event) => {
                  const overlay = getOverlayTooltip();
                  overlay.innerHTML = parts.join("");
                  positionTooltip(event);
                  el.style.zIndex = "1000";
                  overlay.style.opacity = "1";
                });

                el.addEventListener("mousemove", (event) => {
                  positionTooltip(event);
                });

                el.addEventListener("mouseleave", () => {
                  const overlay = getOverlayTooltip();
                  el.style.zIndex = "2";
                  overlay.style.opacity = "0";
                });

                return el;
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
