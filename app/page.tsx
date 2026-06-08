'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ScrollReveal from './components/ScrollReveal'

const LanAnimation = dynamic(() => import('./components/LanAnimation'), { ssr: false })

const FEATURES = [
  { tag: 'MESSAGING', title: 'Real-time chat', body: "Instant peer-to-peer messages over TCP. Read receipts, seen indicators, unread boundaries — everything you expect, none of the cloud.", symbol: '↗' },
  { tag: 'FILES', title: 'Drag & drop transfer', body: "Send any file directly device-to-device. Preview PDFs and images inline. No size limits, no upload queues.", symbol: '⇅' },
  { tag: 'PRESENCE', title: 'Live presence', body: "Active, background, and offline states updated in real time via UDP broadcast. Know who's available before you send.", symbol: '◉' },
  { tag: 'PRIVACY', title: 'IP masking', body: "Biometric-gated IP reveal — Touch ID on Mac, fingerprint on Android, Windows Hello on PC. Your network address stays hidden by default.", symbol: '⊗' },
]

const STEPS = [
  { n: '01', title: 'Connect to the same network', body: "WiFi, ethernet, or hotspot. As long as devices share a subnet, Offline Era finds them automatically via UDP multicast." },
  { n: '02', title: 'Devices discover each other', body: "No pairing, no accounts. A stable UUID identifies each device across DHCP reassignments and reinstalls." },
  { n: '03', title: 'Start messaging', body: "Open a chat, drag files, check who's online. Everything is direct TCP — nothing leaves your local network." },
]

const BUILT_FOR = [
  { title: 'Government offices', body: 'Secure internal comms on isolated intranets. No data ever touches the public internet.' },
  { title: 'Air-gapped labs', body: 'Research environments where internet access is prohibited. Offline Era was built exactly for this.' },
  { title: 'Field operations', body: 'Remote sites, military, disaster response. If devices share a network, it works.' },
  { title: 'Schools & campuses', body: 'Local network messaging without cloud accounts or student data leaving the building.' },
]

const PLATFORMS = [
  { name: 'macOS', sub: 'Apple Silicon + Intel', label: 'Download .dmg', href: 'https://github.com/NagaDurgaSai/offline_era/releases/latest', available: true },
  { name: 'Windows', sub: 'Windows 10 / 11', label: 'Download .exe', href: 'https://github.com/NagaDurgaSai/offline_era/releases/latest', available: true },
  { name: 'Android', sub: 'Android 8+', label: 'Download .apk', href: 'https://github.com/NagaDurgaSai/offline_era/releases/latest', available: true },
  { name: 'iOS / iPadOS', sub: 'iOS 16+', label: 'Under testing', href: null, available: false },
]

const S: Record<string, React.CSSProperties> = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '120px 48px', borderTop: '1px solid var(--border)' },
  sectionMobile: { padding: '80px 24px' },
  label: { fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-muted)' },
  h2: { fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 16, color: 'var(--fg)' },
}

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-anim { display: none !important; } @media (min-width: 769px) { .hero-anim { display: flex !important; } }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .features-card { border-right: none !important; border-bottom: 1px solid var(--border); }
          .how-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .dl-grid { grid-template-columns: 1fr 1fr !important; }
          .dl-card { border-right: none !important; border-bottom: 1px solid var(--border); }
          .built-grid { grid-template-columns: 1fr 1fr !important; }
          .built-card { border-right: none !important; border-bottom: 1px solid var(--border); }
          .mockup-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .nav-links { display: none !important; }
          .section-pad { padding: 80px 24px !important; }
          .hero-left { padding-right: 0 !important; border-right: none !important; }
          .footer-inner { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .dl-grid { grid-template-columns: 1fr !important; }
          .built-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--border)',
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.18em' }}>OFFLINE ERA</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['#features','#mockup','#download'].map((href, i) => (
            <a key={href} href={href} style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--fg-muted)')}>
              {['Features','Screenshots','Download'][i]}
            </a>
          ))}
          <a href="https://github.com/NagaDurgaSai/offline_era" target="_blank"
            style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--fg-muted)')}>GitHub</a>
          <a href="https://github.com/NagaDurgaSai/offline_era/releases/latest" target="_blank"
            style={{ fontSize: 13, color: '#000', background: 'var(--accent)', padding: '8px 18px', borderRadius: 999, textDecoration: 'none', fontWeight: 500 }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}>Download</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        minHeight: 'calc(100vh - 61px)', maxWidth: 1400, margin: '0 auto', padding: '0 48px',
      }}>
        <div className="hero-left" style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          paddingRight: 64, borderRight: '1px solid var(--border)',
          paddingTop: 80, paddingBottom: 80,
        }}>
          <ScrollReveal delay={0}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 36 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: 'var(--fg-muted)', letterSpacing: '0.14em' }}>v1.5.3 — No internet required</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 style={{ fontSize: 'clamp(48px, 5.5vw, 84px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.92, marginBottom: 32 }}>
              Your devices<br />already share<br />
              <span style={{ color: 'var(--accent)' }}>a network.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-muted)', maxWidth: 400, marginBottom: 44 }}>
              Offline Era is a peer-to-peer LAN messenger built for teams that work without internet.
              Messages, files, presence — no server, no cloud, no accounts.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              <a href="https://github.com/NagaDurgaSai/offline_era/releases/latest" target="_blank"
                style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--accent)', color: '#000', padding: '14px 28px', borderRadius: 999, textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'transform 0.15s' }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}>Download free</a>
              <a href="https://github.com/NagaDurgaSai/offline_era" target="_blank"
                style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border)', color: 'var(--fg-muted)', padding: '14px 28px', borderRadius: 999, textDecoration: 'none', fontSize: 14, transition: 'border-color 0.2s, color 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'var(--fg)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-muted)' }}>View source</a>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['macOS', 'Windows', 'Android', 'iOS — Testing'].map(p => (
                <span key={p} style={{ fontSize: 11, color: 'var(--fg-dim)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 4, letterSpacing: '0.06em' }}>{p}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <div className="hero-anim" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0 48px 64px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '44px 44px', maskImage: 'radial-gradient(ellipse 75% 75% at 55% 50%, black 30%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 55% 50%, black 30%, transparent 100%)' }} />
          <div style={{ width: '100%', height: 520, position: 'relative', zIndex: 1 }}>
            <LanAnimation />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          {[
            { val: '0 bytes', label: 'sent to the cloud' },
            { val: 'P2P', label: 'direct TCP connection' },
            { val: 'MIT', label: 'open source license' },
            { val: '4 platforms', label: 'one codebase' },
          ].map((s, i) => (
            <div key={s.val} style={{ flex: 1, padding: '28px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="section-pad" style={S.section}>
        <ScrollReveal>
          <div style={{ marginBottom: 72 }}>
            <span style={S.label}>FEATURES</span>
            <h2 style={S.h2}>Built for the<br />air-gapped reality.</h2>
          </div>
        </ScrollReveal>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid var(--border)' }}>
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.tag} delay={i * 80}>
              <div className="features-card" style={{ padding: '40px 36px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', transition: 'background 0.2s', height: '100%' }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                <div style={{ fontSize: 28, marginBottom: 24, color: 'var(--accent)', fontWeight: 300 }}>{f.symbol}</div>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--fg-muted)', marginBottom: 12 }}>{f.tag}</div>
                <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 16, lineHeight: 1.2 }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-muted)' }}>{f.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* MOCKUP */}
      <section id="mockup" className="section-pad" style={S.section}>
        <ScrollReveal>
          <div style={{ marginBottom: 64 }}>
            <span style={S.label}>THE APP</span>
            <h2 style={S.h2}>Exactly what you need.<br />Nothing you don't.</h2>
          </div>
        </ScrollReveal>
        <div className="mockup-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--border)' }}>
          <ScrollReveal delay={0}>
            <div style={{ background: 'var(--bg)', padding: 2 }}>
              <Image src="/offline-era-web/home.png" alt="Offline Era home screen" width={1232} height={976} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ background: 'var(--bg)', padding: 2 }}>
              <Image src="/offline-era-web/profile.png" alt="Offline Era profile screen" width={1232} height={976} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }} />
            </div>
          </ScrollReveal>
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 24, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 12, color: 'var(--fg-dim)' }}>macOS · v1.5.3</span>
        </div>
      </section>

      {/* BUILT FOR */}
      <section className="section-pad" style={S.section}>
        <ScrollReveal>
          <div style={{ marginBottom: 72 }}>
            <span style={S.label}>BUILT FOR</span>
            <h2 style={S.h2}>Where the internet<br />is not an option.</h2>
          </div>
        </ScrollReveal>
        <div className="built-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid var(--border)' }}>
          {BUILT_FOR.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 80}>
              <div className="built-card" style={{ padding: '40px 32px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', height: '100%' }}>
                <h3 style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 14, lineHeight: 1.3 }}>{b.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-muted)' }}>{b.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad how-grid" style={{ ...S.section, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <ScrollReveal>
          <span style={S.label}>HOW IT WORKS</span>
          <h2 style={S.h2}>Zero config.<br />Just connect.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--fg-muted)', marginTop: 24, maxWidth: 360 }}>
            UDP multicast handles discovery. TCP handles everything else. No router config, no port forwarding, no accounts.
          </p>
        </ScrollReveal>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 100}>
              <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 24, paddingBottom: 48, position: 'relative' }}>
                {i < STEPS.length - 1 && <div style={{ position: 'absolute', left: 20, top: 32, width: 1, height: 'calc(100% - 8px)', background: 'linear-gradient(var(--border), transparent)' }} />}
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--fg-muted)', background: 'var(--bg)', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--fg-muted)' }}>{s.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="section-pad" style={S.section}>
        <ScrollReveal>
          <div style={{ marginBottom: 72, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span style={S.label}>DOWNLOAD</span>
              <h2 style={S.h2}>Free. Always.</h2>
            </div>
            <p style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 280 }}>
              Open source under MIT. Self-host it, fork it, read every line.
            </p>
          </div>
        </ScrollReveal>
        <div className="dl-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid var(--border)' }}>
          {PLATFORMS.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 70}>
              <div className="dl-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 32px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', height: '100%', minHeight: 180 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', color: p.available ? 'var(--fg)' : 'var(--fg-muted)', marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--fg-muted)' }}>{p.sub}</p>
                </div>
                <div style={{ marginTop: 24 }}>
                  {p.available ? (
                    <a href={p.href!} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent)', letterSpacing: '0.08em', textDecoration: 'none', border: '1px solid rgba(184,255,87,0.25)', padding: '7px 14px', borderRadius: 999, transition: 'background 0.2s' }}
                      onMouseOver={e => (e.currentTarget.style.background = 'rgba(184,255,87,0.08)')}
                      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>{p.label} ↗</a>
                  ) : (
                    <span style={{ fontSize: 12, color: 'var(--fg-dim)', letterSpacing: '0.08em', border: '1px solid var(--border)', padding: '7px 14px', borderRadius: 999, display: 'inline-block' }}>{p.label}</span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <a href="https://github.com/NagaDurgaSai/offline_era/releases" target="_blank"
            style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--fg-muted)')}>View all releases →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', maxWidth: 1400, margin: '0 auto', padding: '40px 48px' }}>
        <div className="footer-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontSize: 12, letterSpacing: '0.18em', color: 'var(--fg-muted)' }}>OFFLINE ERA</span>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <a href="https://github.com/NagaDurgaSai/offline_era" target="_blank"
              style={{ fontSize: 12, color: 'var(--fg-dim)', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--fg-muted)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--fg-dim)')}>GitHub</a>
            <span style={{ fontSize: 12, color: 'var(--fg-dim)' }}>Built by ryomensukuna</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
