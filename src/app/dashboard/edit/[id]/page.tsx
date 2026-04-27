"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getChatbotById, updateChatbot } from "@/app/actions/chatbot";
import { ArrowLeft, Bot, Palette, Type, Database, ChevronDown, ChevronUp } from "lucide-react";

export default function EditChatbotPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [chatbot, setChatbot] = useState<any>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (id) {
      getChatbotById(id).then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setChatbot(res.chatbot);
        }
        setFetching(false);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await updateChatbot(id, formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  if (fetching) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-dark)", color: "var(--text-primary)" }}>
        <p>Loading...</p>
      </div>
    );
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
            <Link href="/dashboard" className="btn btn--ghost">Kembali</Link>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: 120, paddingBottom: 60, position: "relative", zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ marginBottom: 40 }}>
            <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", marginBottom: 16 }}>
              <ArrowLeft size={16} /> Kembali ke Dashboard
            </Link>
            <h1 className="section-title" style={{ marginBottom: 8, fontSize: "2.5rem" }}>
              Edit <span className="gradient-text">Chatbot AI</span>
            </h1>
            <p className="section-desc">Ubah pengaturan dan persona chatbot Anda.</p>
          </div>

          {error && (
            <div style={{ padding: "12px 16px", background: "rgba(248, 113, 113, 0.1)", border: "1px solid #F87171", borderRadius: "8px", color: "#F87171", marginBottom: 24 }}>
              {error}
            </div>
          )}

          {chatbot && (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Bagian 1: Info Dasar */}
              <div className="feature-card" style={{ padding: 32 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: "1.2rem", fontWeight: 700 }}>
                  <Bot size={24} color="var(--accent)" /> Informasi Dasar
                </h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Nama Chatbot</label>
                  <input id="name" name="name" type="text" className="form-input" defaultValue={chatbot.name} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="websiteUrl">URL Website</label>
                  <input id="websiteUrl" name="websiteUrl" type="url" className="form-input" defaultValue={chatbot.websiteUrl} required />
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 6 }}>Mengubah URL tidak akan menghapus knowledge base sebelumnya.</p>
                </div>
              </div>

              {/* Bagian 2: Tampilan */}
              <div className="feature-card" style={{ padding: 32 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: "1.2rem", fontWeight: 700 }}>
                  <Palette size={24} color="var(--primary-light)" /> Kustomisasi Tampilan
                </h3>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="brandColor">Warna Utama (Brand Color)</label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input id="brandColor" name="brandColor" type="color" defaultValue={chatbot.brandColor} style={{ width: 48, height: 48, padding: 0, border: "none", borderRadius: 8, cursor: "pointer", background: "transparent" }} />
                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Pilih warna yang sesuai dengan tema website Anda</span>
                  </div>
                </div>
              </div>

              {/* Bagian 3: Persona AI */}
              <div className="feature-card" style={{ padding: 32 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: "1.2rem", fontWeight: 700 }}>
                  <Type size={24} color="#F472B6" /> Kepribadian AI
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="aiPersona">Karakter / Persona</label>
                    <select id="aiPersona" name="aiPersona" className="form-input" style={{ appearance: "auto" }} defaultValue={chatbot.aiPersona}>
                      <option value="friendly">Ramah & Membantu</option>
                      <option value="professional">Profesional & Formal</option>
                      <option value="energetic">Ceria & Energetik</option>
                      <option value="humorous">Humoris & Santai</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="aiLanguageStyle">Gaya Bahasa</label>
                    <select id="aiLanguageStyle" name="aiLanguageStyle" className="form-input" style={{ appearance: "auto" }} defaultValue={chatbot.aiLanguageStyle}>
                      <option value="standard">Bahasa Baku</option>
                      <option value="casual">Bahasa Santai / Gaul</option>
                      <option value="persuasive">Bahasa Sales / Persuasif</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bagian 4: Custom API (Opsional) */}
              <div className="feature-card" style={{ padding: 32 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: "1.2rem", fontWeight: 700 }}>
                  <Database size={24} color="#06B6D4" /> Integrasi Data Real-Time
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.6 }}>
                  <strong>Opsional.</strong> Hubungkan chatbot ke API website Anda untuk mengakses data terbaru seperti stok produk, harga, atau ketersediaan kamar secara real-time.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="customApiUrl">URL API Endpoint</label>
                  <input id="customApiUrl" name="customApiUrl" type="url" className="form-input" defaultValue={chatbot.customApiUrl || ""} placeholder="https://website-anda.com/api/redforge/data" />
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 6 }}>
                    Chatbot akan memanggil URL ini dengan parameter <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4, fontSize: "0.78rem" }}>?query=pertanyaan_pengunjung</code> untuk mendapatkan data terbaru.
                  </p>
                </div>

                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" htmlFor="customApiKey">API Key (jika ada)</label>
                  <input id="customApiKey" name="customApiKey" type="password" className="form-input" defaultValue={chatbot.customApiKey || ""} placeholder="Opsional — untuk keamanan API Anda" />
                </div>

                {/* Panduan */}
                <button
                  type="button"
                  onClick={() => setShowGuide(!showGuide)}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.2)", borderRadius: 8, padding: "10px 16px", color: "#06B6D4", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
                >
                  {showGuide ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  Bagaimana cara membuat API Endpoint di website saya?
                </button>

                {showGuide && (
                  <div style={{ marginTop: 16, padding: 20, background: "rgba(0,0,0,0.2)", borderRadius: 12, border: "1px solid var(--border)", fontSize: "0.84rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                    <p style={{ marginBottom: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                      Buat satu API endpoint di website Anda yang menerima parameter <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>query</code> dan mengembalikan data dalam format JSON.
                    </p>

                    <p style={{ marginBottom: 8, fontWeight: 600, color: "#06B6D4" }}>Contoh Request dari RedForge:</p>
                    <pre style={{ background: "rgba(0,0,0,0.3)", padding: 14, borderRadius: 8, overflow: "auto", marginBottom: 16, fontSize: "0.8rem", color: "#d1d5db" }}>
{`GET https://website-anda.com/api/redforge/data?query=stok+kamar+tipe+a`}
                    </pre>

                    <p style={{ marginBottom: 8, fontWeight: 600, color: "#06B6D4" }}>Contoh Response yang diharapkan:</p>
                    <pre style={{ background: "rgba(0,0,0,0.3)", padding: 14, borderRadius: 8, overflow: "auto", marginBottom: 20, fontSize: "0.8rem", color: "#d1d5db" }}>
{`{
  "results": "Kamar Tipe A: tersedia 3 unit. Harga Rp 500.000/bulan.
Kamar Tipe B: tersedia 1 unit. Harga Rp 650.000/bulan."
}`}
                    </pre>

                    <p style={{ marginBottom: 12, fontWeight: 600, color: "var(--text-primary)" }}>Contoh Kode per Platform:</p>

                    {/* Next.js */}
                    <p style={{ fontWeight: 600, color: "#4ade80", marginBottom: 4 }}>Next.js (App Router)</p>
                    <pre style={{ background: "rgba(0,0,0,0.3)", padding: 14, borderRadius: 8, overflow: "auto", marginBottom: 16, fontSize: "0.78rem", color: "#d1d5db" }}>
{`// app/api/redforge/data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // koneksi database Anda

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  const apiKey = req.headers.get("x-api-key");
  
  // Opsional: validasi API key
  // if (apiKey !== process.env.REDFORGE_API_KEY) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // Ambil data dari database Anda
  const products = await db.query.product.findMany({
    where: (p, { ilike }) => ilike(p.name, \`%\${query}%\`),
    limit: 5,
  });

  const results = products
    .map(p => \`\${p.name}: \${p.stock > 0 ? "tersedia " + p.stock + " unit" : "habis"}. Harga \${p.price}\`)
    .join("\\n");

  return NextResponse.json({ results });
}`}
                    </pre>

                    {/* Express */}
                    <p style={{ fontWeight: 600, color: "#60a5fa", marginBottom: 4 }}>Express.js</p>
                    <pre style={{ background: "rgba(0,0,0,0.3)", padding: 14, borderRadius: 8, overflow: "auto", marginBottom: 16, fontSize: "0.78rem", color: "#d1d5db" }}>
{`app.get("/api/redforge/data", async (req, res) => {
  const query = req.query.query || "";
  const products = await Product.find({
    name: { $regex: query, $options: "i" }
  }).limit(5);

  const results = products
    .map(p => p.name + ": stok " + p.stock + ". Harga " + p.price)
    .join("\\n");

  res.json({ results });
});`}
                    </pre>

                    {/* Laravel */}
                    <p style={{ fontWeight: 600, color: "#f472b6", marginBottom: 4 }}>Laravel (PHP)</p>
                    <pre style={{ background: "rgba(0,0,0,0.3)", padding: 14, borderRadius: 8, overflow: "auto", marginBottom: 16, fontSize: "0.78rem", color: "#d1d5db" }}>
{`// routes/api.php
Route::get('/redforge/data', function (Request $request) {
    $query = $request->query('query', '');
    $products = Product::where('name', 'like', "%{$query}%")
        ->take(5)->get();

    $results = $products->map(fn($p) =>
        "{$p->name}: stok {$p->stock}. Harga {$p->price}"
    )->implode("\\n");

    return response()->json(['results' => $results]);
});`}
                    </pre>

                    <div style={{ padding: 12, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, color: "#4ade80", fontSize: "0.82rem" }}>
                      💡 <strong>Tips:</strong> Anda bebas menentukan format data yang dikembalikan. Yang penting, field <code style={{ background: "rgba(255,255,255,0.06)", padding: "1px 4px", borderRadius: 3 }}>results</code> berisi teks yang bisa dibaca oleh AI. Semakin jelas deskripsinya, semakin akurat jawaban chatbot.
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16 }}>
                <Link href="/dashboard" className="btn btn--outline btn--large">Batal</Link>
                <button type="submit" className="btn btn--primary btn--large" disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
