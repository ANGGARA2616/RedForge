"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    setLoading(true);
    try {
      const result = await signUp.email({ name, email, password });
      if (result.error) {
        setError(result.error.message || "Pendaftaran gagal. Coba lagi.");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-orb bg-orb--purple" />
      <div className="bg-orb bg-orb--cyan" />
      <div className="auth-page">
        <div className="auth-card">
          <Link href="/" className="navbar__logo" style={{ justifyContent: "center", marginBottom: 32 }}>
            <div className="navbar__logo-icon">🔥</div>
            <span className="gradient-text">RedForge</span>
          </Link>
          <h1 className="auth-card__title">Buat Akun Baru</h1>
          <p className="auth-card__desc">Mulai gratis 14 hari, tanpa kartu kredit</p>
          {error && <div className="form-error" style={{ textAlign: "center", marginBottom: 16 }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nama Lengkap</label>
              <input id="name" type="text" className="form-input" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" type="email" className="form-input" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input id="password" type="password" className="form-input" placeholder="Min. 8 karakter" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn--primary btn--large" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? "Memproses..." : "Daftar Sekarang"}
            </button>
          </form>
          <div className="auth-card__footer">
            Sudah punya akun? <Link href="/login">Masuk</Link>
          </div>
        </div>
      </div>
    </>
  );
}
