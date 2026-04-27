"use client";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

// =============================================
// OPSI 1: PARTICLE CONSTELLATION EFFECT
// Partikel melayang di background hero.
// Saat kursor bergerak mendekati partikel,
// partikel tertarik dan membentuk garis
// penghubung seperti jaringan saraf / konstelasi.
// =============================================

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function HeroCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const PARTICLE_COUNT = 80;
  const CONNECT_DISTANCE = 120;
  const MOUSE_RADIUS = 180;
  const MOUSE_FORCE = 0.08;
  const RETURN_SPEED = 0.02;
  const COLORS = [
    "rgba(139, 92, 246, 0.7)",
    "rgba(99, 102, 241, 0.6)",
    "rgba(34, 211, 238, 0.5)",
    "rgba(168, 85, 247, 0.5)",
    "rgba(59, 130, 246, 0.4)",
  ];

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = hero.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.baseX += p.vx;
        p.baseY += p.vy;
        if (p.baseX < 0 || p.baseX > canvas.width) { p.vx *= -1; p.baseX = Math.max(0, Math.min(canvas.width, p.baseX)); }
        if (p.baseY < 0 || p.baseY > canvas.height) { p.vy *= -1; p.baseY = Math.max(0, Math.min(canvas.height, p.baseY)); }

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x += dx * force * MOUSE_FORCE;
          p.y += dy * force * MOUSE_FORCE;
        } else {
          p.x += (p.baseX - p.x) * RETURN_SPEED;
          p.y += (p.baseY - p.y) * RETURN_SPEED;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < CONNECT_DISTANCE) {
            const opacity = 1 - cdist / CONNECT_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.3})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        if (dist < MOUSE_RADIUS) {
          const opacity = 1 - dist / MOUSE_RADIUS;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <>
      <style>{`
        .ag-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
          background-color: #050510;
          color: white;
          padding: 120px 24px 80px;
        }
        .ag-hero-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .ag-hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ag-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border-radius: 9999px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          background-color: rgba(139, 92, 246, 0.08);
          backdrop-filter: blur(12px);
          margin-bottom: 36px;
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.12);
        }
        .ag-badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background-color: #a78bfa;
          animation: ag-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes ag-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .ag-badge-text { font-size: 0.85rem; font-weight: 500; color: #d8b4fe; letter-spacing: 0.03em; }
        .ag-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 24px;
        }
        .ag-gradient-text {
          background-image: linear-gradient(135deg, #c084fc, #818cf8, #22d3ee);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ag-desc {
          font-size: clamp(1rem, 1.8vw, 1.15rem); color: #9ca3af;
          max-width: 560px; margin-bottom: 40px; line-height: 1.7; font-weight: 300;
        }
        .ag-actions { display: flex; gap: 16px; align-items: center; justify-content: center; flex-wrap: wrap; }
        .ag-btn-primary {
          padding: 16px 36px; border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #6366f1);
          color: white !important; font-weight: 700; font-size: 0.95rem;
          transition: all 0.25s ease; text-decoration: none;
          box-shadow: 0 4px 24px rgba(124, 58, 237, 0.35);
        }
        .ag-btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 36px rgba(124, 58, 237, 0.5); }
        .ag-btn-outline {
          padding: 16px 36px; border-radius: 14px; background-color: transparent;
          color: white !important; font-weight: 500; font-size: 0.95rem;
          border: 1px solid #374151; transition: all 0.25s ease; text-decoration: none;
        }
        .ag-btn-outline:hover { border-color: #6b7280; background-color: rgba(255,255,255,0.04); }

        /* Chat Preview Mockup */
        .ag-chat-preview {
          width: 100%;
          max-width: 420px;
          margin-top: 64px;
          position: relative;
          z-index: 10;
        }
        .ag-chat-glow {
          position: absolute;
          inset: -4px;
          background: linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4);
          border-radius: 24px;
          filter: blur(28px);
          opacity: 0.2;
          animation: ag-glow-pulse 5s ease-in-out infinite alternate;
        }
        @keyframes ag-glow-pulse { 0% { opacity: 0.15; } 100% { opacity: 0.3; } }
        .ag-chat-window {
          position: relative;
          background-color: rgba(15, 15, 25, 0.92);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.6);
          overflow: hidden;
        }
        .ag-chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background-color: rgba(124, 58, 237, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .ag-chat-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .ag-chat-header-info { text-align: left; }
        .ag-chat-header-name { font-size: 0.9rem; font-weight: 600; color: #f3f4f6; }
        .ag-chat-header-status { font-size: 0.75rem; color: #4ade80; display: flex; align-items: center; gap: 4px; }
        .ag-chat-header-status::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background-color: #4ade80; display: inline-block;
        }
        .ag-chat-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 220px;
        }
        .ag-msg {
          max-width: 82%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.88rem;
          line-height: 1.5;
        }
        .ag-msg-ai {
          background-color: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.15);
          color: #e5e7eb;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .ag-msg-user {
          background: linear-gradient(135deg, #7c3aed, #6366f1);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .ag-chat-input {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background-color: rgba(255, 255, 255, 0.02);
        }
        .ag-chat-input-field {
          flex: 1;
          padding: 10px 16px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #6b7280;
          font-size: 0.85rem;
        }
        .ag-chat-send {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #6366f1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ag-chat-send svg { width: 16px; height: 16px; color: white; }

        /* Stats */
        .ag-stats {
          display: flex;
          gap: 48px;
          margin-top: 56px;
          position: relative;
          z-index: 10;
        }
        .ag-stat { text-align: center; }
        .ag-stat-value {
          font-size: 1.6rem; font-weight: 800;
          background-image: linear-gradient(135deg, #c084fc, #22d3ee);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ag-stat-label { font-size: 0.8rem; color: #6b7280; margin-top: 4px; }

        @media (max-width: 768px) {
          .ag-hero { padding: 100px 16px 60px; }
          .ag-title { font-size: 2.2rem; }
          .ag-actions { flex-direction: column; width: 100%; }
          .ag-btn-primary, .ag-btn-outline { width: 100%; text-align: center; }
          .ag-chat-preview { max-width: 100%; margin-top: 48px; }
          .ag-stats { gap: 24px; }
          .ag-stat-value { font-size: 1.3rem; }
        }
      `}</style>

      <section ref={heroRef} className="ag-hero" id="hero">
        <canvas ref={canvasRef} className="ag-hero-canvas" />
        <div className="ag-hero-content">
          <div className="ag-badge">
            <span className="ag-badge-dot" />
            <span className="ag-badge-text">AI Chatbot SaaS Platform</span>
          </div>
          <h1 className="ag-title">
            AI Chatbot yang <span className="ag-gradient-text">Benar-Benar Paham</span> Bisnis Anda
          </h1>
          <p className="ag-desc">
            Pasang chatbot cerdas di website Anda dalam 5 menit. AI kami belajar langsung dari konten website Anda dan menjawab pelanggan 24/7.
          </p>
          <div className="ag-actions">
            <Link href="/register" className="ag-btn-primary">Coba Gratis Sekarang</Link>
            <a href="#how-it-works" className="ag-btn-outline">Lihat Cara Kerja</a>
          </div>

          {/* Chat Widget Mockup */}
          <div className="ag-chat-preview">
            <div className="ag-chat-glow" />
            <div className="ag-chat-window">
              <div className="ag-chat-header">
                <div className="ag-chat-avatar">🤖</div>
                <div className="ag-chat-header-info">
                  <div className="ag-chat-header-name">RedForge Assistant</div>
                  <div className="ag-chat-header-status">Online</div>
                </div>
              </div>
              <div className="ag-chat-body">
                <div className="ag-msg ag-msg-ai">
                  Halo! 👋 Saya asisten virtual SmartKos. Ada yang bisa saya bantu?
                </div>
                <div className="ag-msg ag-msg-user">
                  Berapa harga kost termurah?
                </div>
                <div className="ag-msg ag-msg-ai">
                  Harga termurah adalah <strong>Rp 450.000/bulan</strong> untuk Kamar Tipe A (fasilitas: WiFi, AC, kamar mandi dalam). Mau saya bantu proses booking?
                </div>
              </div>
              <div className="ag-chat-input">
                <div className="ag-chat-input-field">Ketik pesan...</div>
                <div className="ag-chat-send">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="ag-stats">
            <div className="ag-stat">
              <div className="ag-stat-value">3x</div>
              <div className="ag-stat-label">Konversi Naik</div>
            </div>
            <div className="ag-stat">
              <div className="ag-stat-value">24/7</div>
              <div className="ag-stat-label">Layanan Non-Stop</div>
            </div>
            <div className="ag-stat">
              <div className="ag-stat-value">5 mnt</div>
              <div className="ag-stat-label">Setup Pertama</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
