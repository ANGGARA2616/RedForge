"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link href="/" className="navbar__logo">
          <div className="navbar__logo-icon">🔥</div>
          <span className="gradient-text">RedForge</span>
        </Link>
        <div className="navbar__links">
          <a href="#features" className="navbar__link">Fitur</a>
          <a href="#how-it-works" className="navbar__link">Cara Kerja</a>
          <a href="#pricing" className="navbar__link">Harga</a>
          <a href="#testimonials" className="navbar__link">Testimoni</a>
        </div>
        <div className="navbar__actions">
          <Link href="/login" className="btn btn--ghost">Masuk</Link>
          <Link href="/register" className="btn btn--primary">Mulai Gratis</Link>
        </div>
      </div>
    </nav>
  );
}
