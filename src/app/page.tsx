
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import HeroCursorEffect from "@/components/HeroCursorEffect";
export default function Home() {
  return (
    <>
      <div className="bg-grid" />
      <div className="bg-orb bg-orb--purple" />
      <div className="bg-orb bg-orb--cyan" />
      <Navbar />

      {/* Hero */}
      <HeroCursorEffect />

      {/* Features */}
      <section className="features" id="features">
        <div className="container">
          <ScrollReveal>
            <div className="features__header">
              <div className="section-label">Fitur Unggulan</div>
              <h2 className="section-title">Semua yang Anda Butuhkan dalam <span className="gradient-text">Satu Platform</span></h2>
              <p className="section-desc">RedForge menggabungkan kekuatan AI, automasi, dan personalisasi untuk membantu bisnis Anda tumbuh lebih cepat.</p>
            </div>
          </ScrollReveal>
          <div className="features__grid">
            {[
              { icon: "🧠", color: "purple", title: "Smart AI Recommendation", desc: "Rekomendasi produk pintar berbasis data & perilaku pengunjung secara real-time menggunakan AI." },
              { icon: "📋", color: "cyan", title: "Widget Copy-Paste", desc: "Integrasikan chatbot ke website Anda hanya dengan menyalin dan menempel kode snippet sederhana." },
              { icon: "🎨", color: "blue", title: "Kustomisasi Branding", desc: "Sesuaikan tampilan, warna, logo, dan gaya bahasa AI chatbot sesuai identitas brand Anda." },
              { icon: "⚡", color: "pink", title: "Auto-Scraping & Training", desc: "Masukkan URL website Anda, AI kami otomatis mempelajari seluruh konten dan data produk." },
            ].map((f, i) => (
              <ScrollReveal key={i}>
                <div className="feature-card">
                  <div className={`feature-card__icon feature-card__icon--${f.color}`}>{f.icon}</div>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <ScrollReveal>
            <div className="how-it-works__header">
              <div className="section-label">Cara Kerja</div>
              <h2 className="section-title">Mulai dalam <span className="gradient-text">3 Langkah Mudah</span></h2>
              <p className="section-desc">Tidak perlu coding. Tidak perlu developer. Siapa saja bisa setup RedForge dalam hitungan menit.</p>
            </div>
          </ScrollReveal>
          <div className="steps">
            {[
              { num: "1", title: "Masukkan URL Website", desc: "Cukup masukkan URL website Anda. AI kami akan otomatis melakukan scraping dan mempelajari semua konten." },
              { num: "2", title: "Kustomisasi Chatbot", desc: "Atur tampilan, warna, logo, dan persona gaya bahasa AI sesuai brand identity bisnis Anda." },
              { num: "3", title: "Pasang & Jalankan", desc: "Copy-paste kode widget ke website Anda. Chatbot AI langsung aktif dan siap melayani pelanggan 24/7." },
            ].map((s, i) => (
              <ScrollReveal key={i}>
                <div className="step">
                  <div className="step__number">{s.num}</div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__desc">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* Pricing */}
      <section className="pricing" id="pricing">
        <div className="container">
          <ScrollReveal>
            <div className="pricing__header">
              <div className="section-label">Harga</div>
              <h2 className="section-title">Investasi Kecil, <span className="gradient-text">Dampak Besar</span></h2>
              <p className="section-desc">Mulai gratis tanpa kartu kredit. Upgrade kapan saja.</p>
            </div>
          </ScrollReveal>
          <div className="pricing__grid">
            {/* Starter */}
            <ScrollReveal>
              <div className="pr-card">
                <div className="pr-card__icon">🚀</div>
                <div className="pr-card__name">Starter</div>
                <div className="pr-card__price">Gratis</div>
                <div className="pr-card__tagline">Untuk mencoba kekuatan AI chatbot</div>
                <div className="pr-card__divider" />
                <ul className="pr-card__features">
                  <li><span className="pr-check">✓</span>1 chatbot / website</li>
                  <li><span className="pr-check">✓</span>500 pesan / bulan</li>
                  <li><span className="pr-check">✓</span>Auto-scraping 10 halaman</li>
                  <li><span className="pr-check">✓</span>Widget embed dasar</li>
                  <li className="pr-muted"><span className="pr-x">✕</span>Kustomisasi branding</li>
                  <li className="pr-muted"><span className="pr-x">✕</span>Analytics dashboard</li>
                </ul>
                <Link href="/register" className="pr-card__btn pr-card__btn--outline">Mulai Gratis</Link>
              </div>
            </ScrollReveal>

            {/* Pro */}
            <ScrollReveal>
              <div className="pr-card pr-card--featured">
                <div className="pr-card__badge">PALING POPULER</div>
                <div className="pr-card__icon">⚡</div>
                <div className="pr-card__name">Pro</div>
                <div className="pr-card__price">Rp299K<span>/bulan</span></div>
                <div className="pr-card__tagline">Untuk bisnis yang serius meningkatkan konversi</div>
                <div className="pr-card__divider" />
                <ul className="pr-card__features">
                  <li><span className="pr-check">✓</span>5 chatbot / website</li>
                  <li><span className="pr-check">✓</span>10.000 pesan / bulan</li>
                  <li><span className="pr-check">✓</span>Auto-scraping unlimited</li>
                  <li><span className="pr-check">✓</span>Kustomisasi branding penuh</li>
                  <li><span className="pr-check">✓</span>Smart recommendation AI</li>
                  <li><span className="pr-check">✓</span>Analytics & insight dashboard</li>
                </ul>
                <Link href="/register" className="pr-card__btn pr-card__btn--primary">Pilih Paket Pro</Link>
              </div>
            </ScrollReveal>

            {/* Enterprise */}
            <ScrollReveal>
              <div className="pr-card">
                <div className="pr-card__icon">🏢</div>
                <div className="pr-card__name">Enterprise</div>
                <div className="pr-card__price">Custom</div>
                <div className="pr-card__tagline">Solusi skala besar dengan dukungan prioritas</div>
                <div className="pr-card__divider" />
                <ul className="pr-card__features">
                  <li><span className="pr-check">✓</span>Unlimited chatbot & website</li>
                  <li><span className="pr-check">✓</span>Unlimited pesan</li>
                  <li><span className="pr-check">✓</span>Integrasi ERP / CRM</li>
                  <li><span className="pr-check">✓</span>Custom AI persona & tone</li>
                  <li><span className="pr-check">✓</span>Dedicated support 24/7</li>
                  <li><span className="pr-check">✓</span>SLA 99.9% uptime</li>
                </ul>
                <Link href="#" className="pr-card__btn pr-card__btn--outline">Hubungi Sales</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <ScrollReveal>
            <div className="testimonials__header">
              <div className="section-label">Testimoni</div>
              <h2 className="section-title">Dipercaya oleh <span className="gradient-text">Ratusan Bisnis</span></h2>
              <p className="section-desc">Lihat bagaimana RedForge membantu bisnis meningkatkan konversi dan kepuasan pelanggan.</p>
            </div>
          </ScrollReveal>
          <div className="testimonials__grid">
            {[
              { stars: "★★★★★", text: "Konversi naik 47% setelah pasang RedForge. AI-nya benar-benar paham produk kami.", avatar: "A", name: "Andi Pratama", role: "CEO, TokoDigital.id" },
              { stars: "★★★★★", text: "Setup cuma 5 menit, langsung jalan! Widget-nya ringan dan tampilannya bisa disesuaikan.", avatar: "S", name: "Sarah Wijaya", role: "Founder, FashionHub" },
              { stars: "★★★★★", text: "Fitur auto-scraping-nya luar biasa. AI langsung belajar dari semua halaman produk kami.", avatar: "B", name: "Budi Santoso", role: "CTO, MartOnline" },
            ].map((t, i) => (
              <ScrollReveal key={i}>
                <div className="testimonial-card">
                  <div className="testimonial-card__stars">{t.stars}</div>
                  <p className="testimonial-card__text">&ldquo;{t.text}&rdquo;</p>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">{t.avatar}</div>
                    <div>
                      <div className="testimonial-card__name">{t.name}</div>
                      <div className="testimonial-card__role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <ScrollReveal>
            <div className="cta__box">
              <div className="section-label">Mulai Sekarang</div>
              <h2 className="section-title">Siap Meningkatkan <span className="gradient-text">Konversi Bisnis Anda?</span></h2>
              <p className="section-desc">Daftar gratis hari ini dan rasakan kekuatan AI chatbot yang benar-benar memahami bisnis Anda.</p>
              <div className="cta__actions">
                <Link href="/register" className="btn btn--primary btn--large">🚀 Mulai Gratis Sekarang</Link>
                <Link href="#" className="btn btn--outline btn--large">📞 Jadwalkan Demo</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div>
              <Link href="/" className="navbar__logo">
                <div className="navbar__logo-icon">🔥</div>
                <span className="gradient-text">RedForge</span>
              </Link>
              <p className="footer__brand-desc">Platform AI Chatbot SaaS yang membantu bisnis meningkatkan konversi melalui rekomendasi produk cerdas.</p>
            </div>
            <div>
              <div className="footer__col-title">Produk</div>
              <div className="footer__col-links">
                <a href="#features" className="footer__col-link">Fitur</a>
                <a href="#pricing" className="footer__col-link">Harga</a>
                <Link href="#" className="footer__col-link">Integrasi</Link>
                <Link href="#" className="footer__col-link">API Docs</Link>
              </div>
            </div>
            <div>
              <div className="footer__col-title">Perusahaan</div>
              <div className="footer__col-links">
                <Link href="#" className="footer__col-link">Tentang Kami</Link>
                <Link href="#" className="footer__col-link">Blog</Link>
                <Link href="#" className="footer__col-link">Karir</Link>
              </div>
            </div>
            <div>
              <div className="footer__col-title">Legal</div>
              <div className="footer__col-links">
                <Link href="#" className="footer__col-link">Privacy Policy</Link>
                <Link href="#" className="footer__col-link">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 RedForge. All rights reserved.</span>
            <span>Made with 🔥 in Indonesia</span>
          </div>
        </div>
      </footer>
      <Script 
        src="https://red-forge.vercel.app/widget.js" 
        data-bot-id="7b3cc168-d26b-48b0-b901-5008cf049e9e" 
        strategy="lazyOnload"
      />
    </>
  );
}
