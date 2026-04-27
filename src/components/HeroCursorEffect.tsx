"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

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
    <>
      <style>{`
        .ag-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 90vh;
          overflow: hidden;
          background-color: #050505;
          color: white;
          padding: 120px 24px 80px;
          background-image: radial-gradient(circle at 50% 0%, #1a0b2e 0%, transparent 50%), radial-gradient(circle at 50% 100%, #081121 0%, transparent 50%);
        }
        .ag-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.04;
          pointer-events: none;
          background-image: linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .ag-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          background-color: rgba(139, 92, 246, 0.1);
          backdrop-filter: blur(12px);
          margin-bottom: 32px;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.15);
          position: relative;
          z-index: 10;
        }
        .ag-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #c084fc;
          animation: ag-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes ag-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .ag-badge-text {
          font-size: 0.85rem;
          font-weight: 500;
          color: #e9d5ff;
          letter-spacing: 0.025em;
        }
        .ag-title {
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 32px;
          text-align: center;
          position: relative;
          z-index: 10;
        }
        .ag-gradient-text {
          background-image: linear-gradient(to right, #c084fc, #818cf8, #22d3ee);
          -webkit-background-clip: text;
          color: transparent;
        }
        .ag-desc {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #9ca3af;
          max-width: 650px;
          margin-bottom: 40px;
          line-height: 1.6;
          font-weight: 300;
          text-align: center;
          position: relative;
          z-index: 10;
        }
        .ag-desc-highlight {
          color: #d8b4fe;
          font-weight: 500;
        }
        .ag-actions {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          z-index: 10;
          flex-wrap: wrap;
        }
        .ag-btn-primary {
          padding: 16px 32px;
          border-radius: 12px;
          background-color: white;
          color: black !important;
          font-weight: 600;
          transition: all 0.2s;
          box-shadow: 0 0 0 rgba(255,255,255,0);
          text-decoration: none;
        }
        .ag-btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(255,255,255,0.3);
        }
        .ag-btn-outline {
          padding: 16px 32px;
          border-radius: 12px;
          background-color: transparent;
          color: white !important;
          font-weight: 500;
          border: 1px solid #374151;
          transition: all 0.2s;
          text-decoration: none;
        }
        .ag-btn-outline:hover {
          border-color: #6b7280;
          background-color: rgba(255,255,255,0.05);
        }
        .ag-terminal {
          width: 100%;
          max-width: 800px;
          margin-top: 80px;
          position: relative;
          z-index: 10;
        }
        .ag-terminal-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(to right, #8b5cf6, #06b6d4);
          border-radius: 20px;
          filter: blur(20px);
          opacity: 0.25;
          animation: ag-pulse 4s infinite alternate;
        }
        .ag-terminal-window {
          position: relative;
          background-color: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(24px);
          border: 1px solid #1f2937;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .ag-terminal-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 16px;
          border-bottom: 1px solid #1f2937;
          margin-bottom: 20px;
        }
        .ag-terminal-dot { width: 12px; height: 12px; border-radius: 50%; }
        .ag-terminal-dot.red { background-color: #ef4444; }
        .ag-terminal-dot.yellow { background-color: #eab308; }
        .ag-terminal-dot.green { background-color: #22c55e; }
        .ag-terminal-title {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.8rem;
          color: #6b7280;
          margin-left: 16px;
        }
        .ag-terminal-body {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.9rem;
          color: #d1d5db;
          text-align: left;
          line-height: 1.6;
        }
        .ag-term-line { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; }
        .ag-term-block { padding-left: 24px; color: #6b7280; margin-bottom: 20px; }
        .ag-term-success { color: #4ade80; }
        .ag-chat-demo {
          margin-left: 24px;
          padding: 20px;
          background-color: rgba(255,255,255,0.02);
          border-left: 2px solid rgba(139, 92, 246, 0.4);
          border-radius: 0 8px 8px 0;
          margin-top: 20px;
        }
      `}</style>

      <section ref={heroRef} className="ag-hero" id="hero">
        <div className="ag-grid" />
        
        {/* Antigravity Cursor Glow */}
        <div 
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            pointerEvents: 'none', zIndex: 0, transition: 'opacity 0.3s ease',
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 60%)`
          }}
        />
        
        {/* Dynamic Cursor Flare (Sharper Inner Glow) */}
        <div 
          style={{
            position: 'absolute', pointerEvents: 'none', zIndex: 0,
            transition: 'opacity 0.15s ease',
            top: position.y - 150, left: position.x - 150,
            width: 300, height: 300,
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 60%)`,
            filter: 'blur(40px)', transform: 'translateZ(0)'
          }}
        />

        <div className="ag-badge">
          <span className="ag-badge-dot" />
          <span className="ag-badge-text">RedForge OS — AI Agent Platform</span>
        </div>

        <h1 className="ag-title">
          Bangun <span className="ag-gradient-text">Otak Digital</span>
          <br /> Untuk Bisnis Anda.
        </h1>
        
        <p className="ag-desc">
          Platform AI Agentic yang secara otomatis menelan data website Anda, 
          memproses <span className="ag-desc-highlight">RAG (Retrieval-Augmented Generation)</span>, 
          dan merespons pelanggan layaknya manusia super.
        </p>
        
        <div className="ag-actions">
          <Link href="/register" className="ag-btn-primary">
            Deploy AI Agent Sekarang
          </Link>
          <Link href="#demo" className="ag-btn-outline">
            Lihat Arsitektur
          </Link>
        </div>

        {/* Floating Glassmorphic Terminal/Chat UI */}
        <div className="ag-terminal">
          <div className="ag-terminal-glow" />
          <div className="ag-terminal-window">
            <div className="ag-terminal-header">
              <div className="ag-terminal-dot red" />
              <div className="ag-terminal-dot yellow" />
              <div className="ag-terminal-dot green" />
              <div className="ag-terminal-title">redforge-agent ~ terminal</div>
            </div>
            
            <div className="ag-terminal-body">
              <div className="ag-term-line">
                <span style={{color: '#22d3ee'}}>➜</span>
                <span style={{color: '#c084fc'}}>~</span>
                <span style={{color: 'white'}}>redforge init --url https://smartkos.com</span>
              </div>
              <div className="ag-term-block">
                [1/3] Scraping knowledge base... <span className="ag-term-success">DONE</span><br/>
                [2/3] Generating vector embeddings (1536 dim)... <span className="ag-term-success">DONE</span><br/>
                [3/3] Deploying agentic RAG endpoints... <span className="ag-term-success">DONE</span>
              </div>
              <div className="ag-term-line">
                <span className="ag-term-success">✔</span>
                <span style={{color: 'white', fontWeight: 600}}>Agent deployed successfully in 4.2s.</span>
              </div>
              <div className="ag-chat-demo">
                <div style={{color: '#a5b4fc', fontWeight: 700, marginBottom: '6px'}}>User:</div>
                <div style={{marginBottom: '20px'}}>"Berapa harga kost termurah?"</div>
                <div style={{color: '#c084fc', fontWeight: 700, marginBottom: '6px'}}>RedForge AI:</div>
                <div style={{color: '#e5e7eb'}}>"Harga kost termurah adalah Rp 450.000/bulan (Kamar Tipe A). Apakah Anda ingin saya kirimkan link pemesanannya?"</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
