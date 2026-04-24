"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-dark)", color: "var(--text-primary)" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <div className="bg-grid" />
      <nav className="navbar scrolled">
        <div className="container">
          <Link href="/" className="navbar__logo">
            <div className="navbar__logo-icon">🔥</div>
            <span className="gradient-text">RedForge</span>
          </Link>
          <div className="navbar__actions">
            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Halo, {session.user.name}
            </span>
            <button
              className="btn btn--ghost"
              onClick={() => signOut().then(() => router.push("/"))}
            >
              Keluar
            </button>
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: 120, position: "relative", zIndex: 1 }}>
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: 8 }}>
            Dashboard <span className="gradient-text">RedForge</span>
          </h1>
          <p className="section-desc" style={{ marginBottom: 48 }}>
            Kelola chatbot AI Anda dari satu tempat.
          </p>
          <div className="features__grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { icon: "🤖", title: "Chatbot Aktif", value: "0", desc: "Belum ada chatbot" },
              { icon: "💬", title: "Total Pesan", value: "0", desc: "Bulan ini" },
              { icon: "📈", title: "Konversi", value: "0%", desc: "Rate konversi" },
            ].map((card, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__icon feature-card__icon--purple">{card.icon}</div>
                <div style={{ fontSize: "2rem", fontWeight: 800 }}>{card.value}</div>
                <h3 className="feature-card__title">{card.title}</h3>
                <p className="feature-card__desc">{card.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <button className="btn btn--primary btn--large">+ Buat Chatbot Baru</button>
          </div>
        </div>
      </div>
    </>
  );
}
