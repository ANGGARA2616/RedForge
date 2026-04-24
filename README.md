# RedForge - AI Chatbot SaaS

## Pengujian Aspek Kualitas (Matriks New Product, New Market)
Sistem SaaS RedForge dievaluasi berdasarkan strategi diversifikasi (*New Product, New Market*) untuk memastikan platform yang sama sekali baru ini dapat beradaptasi di pasar yang juga baru, dengan performa yang stabil dan aman bagi klien.

| Aspek Kualitas (ISO 25010) | Parameter Pengujian | Metode Pengujian | Status / Hasil |
| -------------------------- | ------------------- | ---------------- | -------------- |
| **Portability** | Widget dapat diintegrasikan lintas *platform* (Next.js, WordPress, HTML) tanpa error. | Uji injeksi script tag `<script>` CORS lintas domain (contoh: SmartKos). | ✅ Lulus Uji |
| **Usability** | *Client* (pemilik web) dapat melatih AI hanya dengan sekali klik tanpa *coding* sama sekali. | Simulasi URL Scraping otomatis via tombol "Latih AI dari URL" di *Dashboard*. | ✅ Lulus Uji |
| **Reliability** | AI merespons *chat* dengan stabil dan hanya menggunakan data milik klien. | Pengujian tingkat halusinasi RAG menggunakan OpenAI GPT-5.4-mini (Temperature 0.2). | ✅ Lulus Uji |
| **Security** | Isolasi data aman antar *Tenant* (Chatbot A tidak bisa membaca atau bocor ke data Chatbot B). | Injeksi *Chatbot ID* unik ganda pada *Similarity Search* di `pgvector` Supabase. | ✅ Lulus Uji |
| **Scalability** | Sistem mampu menangani beban ekstraksi *chunking* teks dalam jumlah besar secara real-time. | Scraping massal halaman HTML kompleks menggunakan `cheerio` secara asinkron. | ✅ Lulus Uji |

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
