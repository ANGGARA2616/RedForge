"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserChatbots, deleteChatbot } from "@/app/actions/chatbot";
import { Bot, MessageSquare, TrendingUp, Plus, ExternalLink, Settings, Trash2 } from "lucide-react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  
  const [chatbots, setChatbots] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (session) {
      getUserChatbots().then((res) => {
        if (res.success) setChatbots(res.chatbots);
        setLoadingData(false);
      });
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending || loadingData) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-dark)", color: "var(--text-primary)" }}>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const totalMessages = chatbots.reduce((acc, bot) => acc + (bot.totalMessages || 0), 0);

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
      
      <div style={{ paddingTop: 120, position: "relative", zIndex: 1, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <div>
              <h1 className="section-title" style={{ marginBottom: 8 }}>
                Dashboard <span className="gradient-text">RedForge</span>
              </h1>
              <p className="section-desc">
                Kelola chatbot AI Anda dari satu tempat.
              </p>
            </div>
            <Link href="/dashboard/create" className="btn btn--primary">
              <Plus size={18} /> Buat Chatbot Baru
            </Link>
          </div>

          {/* Overview Stats */}
          <div className="features__grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 48 }}>
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--purple"><Bot /></div>
              <div style={{ fontSize: "2rem", fontWeight: 800 }}>{chatbots.length}</div>
              <h3 className="feature-card__title">Chatbot Aktif</h3>
              <p className="feature-card__desc">Total chatbot Anda</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--cyan"><MessageSquare /></div>
              <div style={{ fontSize: "2rem", fontWeight: 800 }}>{totalMessages}</div>
              <h3 className="feature-card__title">Total Pesan</h3>
              <p className="feature-card__desc">Sepanjang waktu</p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon feature-card__icon--blue"><TrendingUp /></div>
              <div style={{ fontSize: "2rem", fontWeight: 800 }}>0%</div>
              <h3 className="feature-card__title">Konversi</h3>
              <p className="feature-card__desc">Rata-rata konversi</p>
            </div>
          </div>

          {/* Chatbot List */}
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 24 }}>Daftar Chatbot Anda</h2>
          
          {chatbots.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--surface)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--border)" }}>
              <Bot size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>Belum ada chatbot</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Mulai otomatisasi layanan pelanggan website Anda sekarang.</p>
              <Link href="/dashboard/create" className="btn btn--primary">
                + Buat Chatbot Pertama Anda
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
              {chatbots.map(bot => (
                <div key={bot.id} className="feature-card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: bot.brandColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
                        {bot.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 600, fontSize: "1.1rem" }}>{bot.name}</h3>
                        <a href={bot.websiteUrl} target="_blank" rel="noreferrer" style={{ fontSize: "0.8rem", color: "var(--accent)", display: "flex", alignItems: "center", gap: 4 }}>
                          {bot.websiteUrl.replace(/^https?:\/\//, '')} <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: bot.isActive ? "#10B981" : "#F59E0B" }} title={bot.isActive ? "Aktif" : "Tidak Aktif"} />
                  </div>
                  
                  <div style={{ display: "flex", gap: 16, borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Pesan</div>
                      <div style={{ fontWeight: 600 }}>{bot.totalMessages || 0}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Persona</div>
                      <div style={{ fontWeight: 600, textTransform: "capitalize" }}>{bot.aiPersona}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
                    <Link
                      href={`/dashboard/edit/${bot.id}`}
                      className="btn btn--outline"
                      style={{ flex: "1 1 100%", padding: "8px 0", fontSize: "0.85rem", justifyContent: "center" }}
                    >
                      <Settings size={14} style={{ display: 'inline', marginRight: 4 }} /> Edit Chatbot
                    </Link>
                    <button 
                      className="btn btn--outline" 
                      style={{ flex: 1, padding: "8px 0", fontSize: "0.85rem" }}
                      onClick={async () => {
                        const btn = document.getElementById(`scrape-btn-${bot.id}`);
                        if (btn) btn.innerText = "Membaca...";
                        try {
                          const res = await fetch("/api/scrape", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ url: bot.websiteUrl, chatbotId: bot.id })
                          });
                          const data = await res.json();
                          alert(data.message || data.error);
                        } catch (e) {
                          alert("Gagal melatih AI");
                        }
                        if (btn) btn.innerText = "Latih AI dari URL";
                      }}
                      id={`scrape-btn-${bot.id}`}
                    >
                      Latih AI dari URL
                    </button>
                    <button 
                      className="btn btn--primary" 
                      style={{ flex: 1, padding: "8px 0", fontSize: "0.85rem" }}
                      onClick={() => {
                        const snippet = `<script src="${window.location.origin}/widget.js" data-bot-id="${bot.id}"></script>`;
                        navigator.clipboard.writeText(snippet);
                        alert("Kode widget berhasil di-copy! Tempel di dalam tag <body> SmartKos Anda.");
                      }}
                    >
                      Copy Widget Code
                    </button>
                    <button 
                      className="btn btn--outline" 
                      style={{ flex: "1 1 100%", padding: "8px 0", fontSize: "0.85rem", justifyContent: "center", color: "#F87171", borderColor: "#F87171" }}
                      onClick={async () => {
                        if (!confirm(`Yakin ingin menghapus chatbot "${bot.name}"? Semua data training dan riwayat percakapan akan ikut terhapus.`)) return;
                        const res = await deleteChatbot(bot.id);
                        if (res.success) {
                          setChatbots(prev => prev.filter(b => b.id !== bot.id));
                          alert("Chatbot berhasil dihapus.");
                        } else {
                          alert(res.error || "Gagal menghapus chatbot");
                        }
                      }}
                    >
                      <Trash2 size={14} style={{ display: 'inline', marginRight: 4 }} /> Hapus Chatbot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
