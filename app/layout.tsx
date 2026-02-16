import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'AFES – International Insurance Services',
  description:
    'Cross-border claims handling with local execution, centralized steering, and consistent reporting.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
