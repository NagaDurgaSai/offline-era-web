import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Styrene A', sans-serif",
        color: '#F5F5F0',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p style={{ color: '#B8FF57', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
        404
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>
        Page not found.
      </h1>
      <p style={{ color: '#888', fontSize: '1rem', maxWidth: '400px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
        This page doesn't exist or was moved. Head back and stay on the local network.
      </p>
      <Link
        href="/"
        style={{
          backgroundColor: '#B8FF57',
          color: '#0A0A0A',
          padding: '0.75rem 2rem',
          borderRadius: '4px',
          fontWeight: 600,
          fontSize: '0.9rem',
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}
      >
        Go Home
      </Link>
    </main>
  )
}
