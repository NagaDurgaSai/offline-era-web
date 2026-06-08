import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Offline Era — LAN Messenger',
  description: 'Peer-to-peer messaging, file transfer and presence. No internet. No server. Just your network.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
