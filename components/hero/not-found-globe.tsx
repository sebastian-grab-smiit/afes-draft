"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import type { GlobeMethods } from "react-globe.gl";

type GlobeArc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  dashOffset: number;
};

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function NotFoundGlobe() {
  const globeWrapRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const rafRef = useRef<number | null>(null);
  const idleLngRef = useRef(0);

  const [isMounted, setIsMounted] = useState(false);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 560, height: 560 });
  const [countriesGeoJson, setCountriesGeoJson] = useState<GeoJSON.FeatureCollection | null>(null);

  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color("#e9f6ff");
    material.emissive = new THREE.Color("#edf8ff");
    material.specular = new THREE.Color("#000000");
    material.shininess = 1;
    return material;
  }, []);

  const arcs = useMemo<GlobeArc[]>(() => {
    const total = 12;
    const golden = 137.508;

    return Array.from({ length: total }, (_, index) => {
      const startLat = ((index * 29.7) % 140) - 70;
      const startLng = ((index * golden * 1.9) % 360) - 180;

      const endLat = Math.max(-70, Math.min(70, -startLat * 0.82 + ((index % 3) - 1) * 8));
      const rawOppositeLng = startLng + 170 + (index % 2 === 0 ? 16 : -16);
      const endLng = ((rawOppositeLng + 540) % 360) - 180;

      return {
        startLat,
        startLng,
        endLat,
        endLng,
        color: "rgba(70,185,170,0.9)",
        dashOffset: (index * 0.33) % 1,
      };
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const side = Math.min(entry.contentRect.width, 820);
      const width = Math.max(420, side);
      const height = Math.max(460, Math.min(entry.contentRect.height, 820));

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
    if (!isGlobeReady) return;

    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    controls.autoRotate = false;
    controls.enableZoom = false;

    globe.pointOfView({ lat: 18, lng: 0, altitude: 2.05 }, 0);
  }, [isGlobeReady]);

  useEffect(() => {
    const animateIdle = () => {
      const globe = globeRef.current;
      if (globe) {
        idleLngRef.current += 0.05;
        globe.pointOfView({ lat: 18, lng: idleLngRef.current, altitude: 2.05 }, 0);
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

  return (
    <div className="relative h-[calc(100vh-8rem)] min-h-[520px] w-full">
      <div ref={globeWrapRef} className="mx-auto flex h-[82vh] min-h-[560px] w-full max-w-[52rem] items-start justify-center">
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
              polygonAltitude={0.02}
              arcsData={arcs}
              arcStartLat="startLat"
              arcStartLng="startLng"
              arcEndLat="endLat"
              arcEndLng="endLng"
              arcColor="color"
              arcStroke={0.7}
              arcAltitudeAutoScale={0.38}
              arcDashLength={0.42}
              arcDashGap={1.1}
              arcDashInitialGap="dashOffset"
              arcDashAnimateTime={4600}
              arcsTransitionDuration={0}
            />
          )}
        </div>
      </div>
    </div>
  );
}
