"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroCursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseenter", () => setIsHovering(true));
      hero.addEventListener("mouseleave", () => setIsHovering(false));
      return () => {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseenter", () => setIsHovering(true));
        hero.removeEventListener("mouseleave", () => setIsHovering(false));
      };
    }
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="hero" 
      id="hero"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Efek Senter/Cursor Glow */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.4s ease',
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.12), transparent 80%)`
        }}
      />
      
      {/* Konten Utama Hero */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
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
  );
}
