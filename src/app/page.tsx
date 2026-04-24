import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <div className="bg-grid" />
      <div className="bg-orb bg-orb--purple" />
      <div className="bg-orb bg-orb--cyan" />
      <Navbar />

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <div className="hero__badge">
                <span className="hero__badge-dot" />
                Platform AI Chatbot #1 di Indonesia
              </div>
              <h1 className="hero__title">
                Ubah Pengunjung Jadi <span className="gradient-text">Pembeli</span> dengan AI Chatbot Cerdas
              </h1>
              <p className="hero__desc">
                RedForge melatih AI dari data website Anda secara otomatis, memberikan rekomendasi produk pintar, dan terintegrasi hanya dengan copy-paste widget.
              </p>
              <div className="hero__actions">
                <Link href="/register" className="btn btn--primary btn--large">🚀 Coba Gratis 14 Hari</Link>
                <a href="#how-it-works" className="btn btn--outline btn--large">▶ Lihat Demo</a>
              </div>
              <div className="hero__stats">
                <div className="hero__stat">
                  <div className="hero__stat-value gradient-text">3x</div>
                  <div className="hero__stat-label">Konversi Lebih Tinggi</div>
                </div>
                <div className="hero__stat">
                  <div className="hero__stat-value gradient-text">24/7</div>
                  <div className="hero__stat-label">Layanan Non-Stop</div>
                </div>
                <div className="hero__stat">
                  <div className="hero__stat-value gradient-text">5 mnt</div>
                  <div className="hero__stat-label">Setup Pertama</div>
                </div>
              </div>
            </div>
            <div className="hero__visual">
              <div className="hero__image">
                <Image src="/images/hero-illustration.png" alt="RedForge AI Chatbot" width={600} height={400} priority />
              </div>
              <div className="hero__float-card hero__float-card--top">
                <div className="hero__float-icon hero__float-icon--purple">🤖</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>AI Merespons</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Rekomendasi dikirim!</div>
                </div>
              </div>
              <div className="hero__float-card hero__float-card--bottom">
                <div className="hero__float-icon hero__float-icon--cyan">📈</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>+47% Konversi</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Bulan ini</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Showcase Sections */}
      <section className="showcase">
        <div className="container">
          <ScrollReveal>
            <div className="showcase__row">
              <div className="showcase__visual">
                <div className="showcase__image">
                  <Image src="/images/smart-recommendation.png" alt="Smart Recommendation" width={560} height={380} />
                </div>
              </div>
              <div className="showcase__content">
                <div className="section-label">Smart Recommendation</div>
                <h2 className="section-title">Rekomendasi Produk <span className="gradient-text">Cerdas & Personal</span></h2>
                <p className="section-desc">AI kami menganalisis perilaku pengunjung dan menampilkan produk yang paling relevan secara otomatis.</p>
                <ul className="showcase__list">
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Analisis intent pengunjung secara real-time</li>
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Rekomendasi berbasis data riwayat & preferensi</li>
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Direct link ke halaman produk (RAG-powered)</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="showcase__row showcase__row--reverse">
              <div className="showcase__content">
                <div className="section-label">Integrasi Mudah</div>
                <h2 className="section-title">Pasang Widget <span className="gradient-text">Tanpa Coding</span></h2>
                <p className="section-desc">Generate kode snippet dan tempel di website Anda. Tidak perlu keahlian teknis.</p>
                <ul className="showcase__list">
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Kode embed satu baris yang ringan</li>
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Kompatibel dengan semua platform</li>
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Loading cepat tanpa memperlambat website</li>
                </ul>
              </div>
              <div className="showcase__visual">
                <div className="showcase__image">
                  <Image src="/images/widget-feature.png" alt="Widget Integration" width={560} height={380} />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="showcase__row">
              <div className="showcase__visual">
                <div className="showcase__image">
                  <Image src="/images/ai-training-feature.png" alt="AI Training" width={560} height={380} />
                </div>
              </div>
              <div className="showcase__content">
                <div className="section-label">Auto-Training AI</div>
                <h2 className="section-title">AI yang <span className="gradient-text">Belajar Sendiri</span> dari Website Anda</h2>
                <p className="section-desc">Cukup berikan URL, AI kami akan memetakan seluruh data website dan melatih diri secara otomatis.</p>
                <ul className="showcase__list">
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Auto-scraping halaman produk, FAQ, dan konten</li>
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Pembaruan knowledge base otomatis</li>
                  <li className="showcase__list-item"><span className="showcase__list-check">✓</span>Akurasi jawaban tinggi dengan teknologi RAG</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing" id="pricing">
        <div className="container">
          <ScrollReveal>
            <div className="pricing__header">
              <div className="section-label">Harga</div>
              <h2 className="section-title">Pilih Paket yang <span className="gradient-text">Sesuai Bisnis Anda</span></h2>
              <p className="section-desc">Mulai gratis, upgrade kapan saja sesuai pertumbuhan bisnis Anda.</p>
            </div>
          </ScrollReveal>
          <div className="pricing__grid">
            <ScrollReveal><div className="pricing-card">
              <div className="pricing-card__name">Starter</div>
              <div className="pricing-card__price">Gratis</div>
              <div className="pricing-card__desc">Cocok untuk mencoba dan bisnis kecil</div>
              <div className="pricing-card__features">
                {["1 Website","500 pesan/bulan","Widget embed dasar","Auto-scraping 10 halaman","Branding RedForge"].map((f,i)=>(
                  <div key={i} className="pricing-card__feature"><span className="pricing-card__feature-icon">✓</span>{f}</div>
                ))}
              </div>
              <Link href="/register" className="btn btn--outline">Mulai Gratis</Link>
            </div></ScrollReveal>

            <ScrollReveal><div className="pricing-card pricing-card--featured">
              <div className="pricing-card__badge">POPULER</div>
              <div className="pricing-card__name">Pro</div>
              <div className="pricing-card__price">Rp299K <span>/bulan</span></div>
              <div className="pricing-card__desc">Untuk bisnis yang serius meningkatkan konversi</div>
              <div className="pricing-card__features">
                {["5 Website","10.000 pesan/bulan","Kustomisasi penuh brand","Auto-scraping unlimited","Smart recommendation AI","Analytics dashboard"].map((f,i)=>(
                  <div key={i} className="pricing-card__feature"><span className="pricing-card__feature-icon">✓</span>{f}</div>
                ))}
              </div>
              <Link href="/register" className="btn btn--primary">Pilih Paket Pro</Link>
            </div></ScrollReveal>

            <ScrollReveal><div className="pricing-card">
              <div className="pricing-card__name">Enterprise</div>
              <div className="pricing-card__price">Custom</div>
              <div className="pricing-card__desc">Solusi lengkap untuk skala besar</div>
              <div className="pricing-card__features">
                {["Unlimited website","Unlimited pesan","Integrasi ERP/CRM","Dedicated support 24/7","Custom AI persona","SLA 99.9% uptime"].map((f,i)=>(
                  <div key={i} className="pricing-card__feature"><span className="pricing-card__feature-icon">✓</span>{f}</div>
                ))}
              </div>
              <Link href="#" className="btn btn--outline">Hubungi Sales</Link>
            </div></ScrollReveal>
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
    </>
  );
}
