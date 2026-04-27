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
      className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8 pt-20 pb-16"
      style={{
        background: '#050505',
        backgroundImage: 'radial-gradient(circle at 50% 0%, #1a0b2e 0%, transparent 50%), radial-gradient(circle at 50% 100%, #081121 0%, transparent 50%)',
        position: 'relative'
      }}
    >
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Antigravity Cursor Glow */}
      <div 
        className="pointer-events-none absolute z-0 transition-opacity duration-300 ease-out"
        style={{
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 60%)`
        }}
      />
      
      {/* Dynamic Cursor Flare (Sharper Inner Glow) */}
      <div 
        className="pointer-events-none absolute z-0 transition-opacity duration-150 ease-out"
        style={{
          top: position.y - 150, left: position.x - 150,
          width: 300, height: 300,
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 60%)`,
          filter: 'blur(40px)',
          transform: 'translateZ(0)'
        }}
      />

      {/* Hero Content - Centered (Antigravity Style) */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center mt-12">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8"
          style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-purple-200 tracking-wide">RedForge OS — AI Agent Platform</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.1] mb-8">
          Bangun <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Otak Digital</span>
          <br className="hidden sm:block" /> Untuk Bisnis Anda.
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-light">
          Platform AI Agentic yang secara otomatis menelan data website Anda, 
          memproses <span className="text-purple-300">RAG (Retrieval-Augmented Generation)</span>, 
          dan merespons pelanggan layaknya manusia super.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center">
          <Link 
            href="/register" 
            className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full sm:w-auto text-center"
          >
            Deploy AI Agent Sekarang
          </Link>
          <Link 
            href="#demo" 
            className="px-8 py-4 rounded-xl bg-transparent text-white font-medium border border-gray-700 hover:border-gray-500 hover:bg-gray-800 transition-all w-full sm:w-auto text-center"
          >
            Lihat Arsitektur
          </Link>
        </div>

        {/* Floating Glassmorphic Terminal/Chat UI */}
        <div className="w-full max-w-4xl mt-20 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-20 animate-pulse" />
          <div className="relative rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-800 p-2 sm:p-4 overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="flex items-center gap-2 px-3 pb-3 border-b border-gray-800 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="text-xs text-gray-500 ml-4 font-mono">redforge-agent ~ terminal</div>
            </div>
            
            {/* Terminal Content */}
            <div className="text-left font-mono text-sm sm:text-base p-2 sm:p-4 text-gray-300 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-cyan-400">➜</span>
                <span className="text-purple-400">~</span>
                <span className="text-white">redforge init --url https://smartkos.com</span>
              </div>
              <div className="pl-6 text-gray-500">
                [1/3] Scraping knowledge base... <span className="text-green-400">DONE</span><br/>
                [2/3] Generating vector embeddings (1536 dim)... <span className="text-green-400">DONE</span><br/>
                [3/3] Deploying agentic RAG endpoints... <span className="text-green-400">DONE</span>
              </div>
              <div className="flex items-start gap-3 mt-4">
                <span className="text-green-400">✔</span>
                <span className="text-white font-semibold">Agent deployed successfully in 4.2s.</span>
              </div>
              <div className="pl-6 text-gray-400 border-l-2 border-purple-500/30 ml-1 mt-2 p-3 bg-white/[0.02] rounded-r">
                <div className="text-indigo-300 font-bold mb-1">User:</div>
                "Berapa harga kost termurah?"
                <div className="text-purple-400 font-bold mt-3 mb-1">RedForge AI:</div>
                <span className="text-gray-200">"Harga kost termurah adalah Rp 450.000/bulan (Kamar Tipe A). Apakah Anda ingin saya kirimkan link pemesanannya?"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
