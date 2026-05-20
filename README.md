# StreetSense 🚦

**StreetSense** adalah platform interaktif berbasis komunitas (*crowdsourcing*) yang dirancang untuk meningkatkan keselamatan berkendara dengan memetakan kerusakan jalan secara real-time dan melakukan analisis prediktif terhadap risiko kerusakan infrastruktur jalan.

---

## 📌 Deskripsi Proyek

Banyaknya kecelakaan lalu lintas yang disebabkan oleh infrastruktur jalan yang buruk, seperti lubang atau aspal yang terkelupas, menjadi latar belakang utama pengembangan StreetSense. Aplikasi ini memungkinkan pengguna jalan untuk saling menjaga satu sama lain dengan memberikan informasi terkini mengenai kondisi jalan yang mereka lalui.

Selain sebagai media pelaporan, StreetSense mengintegrasikan teknologi pemrosesan data untuk memprediksi ruas jalan mana yang memiliki kemungkinan tinggi untuk mengalami kerusakan di masa depan, sehingga pihak terkait atau pengguna dapat melakukan tindakan preventif.

## ✨ Fitur Utama

### 🤝 1. Crowdsourcing Berbasis Komunitas
Platform interaktif yang memberdayakan pengguna jalan untuk berkontribusi langsung dalam pengumpulan data kondisi infrastruktur.

### 📍 2. Pelaporan Real-Time & Peta Interaktif
* **Pemetaan Interaktif:** Peta berbasis satelit yang secara otomatis mendeteksi lokasi pengguna menggunakan GPS.
* **Berbagi Titik Lokasi:** Pengguna dapat menandai koordinat jalan rusak secara instan di peta.
* **Sistem Peringatan:** Memberikan notifikasi atau tanda pada peta bagi pengendara lain yang akan melewati jalur tersebut agar lebih waspada.

### 🧠 3. Analisis Prediktif Kerusakan Jalan
Memanfaatkan algoritma pemrosesan data untuk memetakan ruas jalan berisiko tinggi berdasarkan variabel:
* **Data Historis Cuaca:** Menganalisis pengaruh curah hujan dan suhu terhadap ketahanan aspal.
* **Intensitas Lalu Lintas:** Menilai beban jalan berdasarkan volume kendaraan yang melintas.
* **Usia Jalan:** Mempertimbangkan masa pakai aspal untuk memprediksi titik jenuh kekuatan jalan.

### 📊 4. Dashboard Pelaporan & Manajemen
* **Log Laporan Terselesaikan (Solved Reports):** Sistem pelacakan status laporan dengan transisi state persisten (misal: penandaan laporan sebagai "selesai").
* **Optimasi Gambar Berbasis Base64:** Keandalan render gambar lebih tinggi di dashboard.

---

## 🚀 Pembaruan Terbaru (MVP Finalization)
* **Integrasi Supabase:** Penyimpanan data persisten dan real-time untuk laporan komunitas dan *contact form*, dengan implementasi *Next.js Server Actions*.
* **Keamanan & UX Hardening:** Routing middleware yang telah dioptimasi, manajemen *dead links* yang diperbaiki, dan penambahan status *loading/success* pada formulir entri data.
* **Penyempurnaan UI/UX Navigasi:** Navigasi bar dioptimalkan dengan *dropdown* yang efisien, serta antarmuka responsif penuh di semua perangkat.
* **Halaman Tim (Meet Our Team):** Profil yang telah disesuaikan dengan daftar anggota lengkap beserta peran profesional masing-masing.

---

## 🛠️ Teknologi (Tech Stack)

Proyek ini dikembangkan menggunakan teknologi modern untuk memastikan performa dan skalabilitas:

*   **Frontend Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
*   **Library UI:** [React 19](https://reactjs.org/)
*   **Styling:** Vanilla CSS (Modern Custom Properties & Glassmorphism)
*   **Theme Management:** [next-themes](https://www.npmjs.com/package/next-themes)
*   **Peta Interaktif (Maps):** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
*   **Backend & Database:** [Supabase](https://supabase.com/) & Next.js Server Actions / Route Handlers
*   **Validasi Data:** [Zod](https://zod.dev/)

---

## 👥 Anggota Kelompok 26

Proyek ini dikembangkan oleh mahasiswa pemagang MSIB Batch 4 Vinix7 Kelompok 26:

| Nama | Peran / Fokus |
| :--- | :--- |
| **Kevin Ezra Duduong** | Founder / Project Leader |
| **Farhan Arva Amanta** | Marketing Director |
| **Maulana Khoirusyifa** | Full Stack Developer |
| **Klementina Ytu** | UI/UX Designer |

---

## 🚀 Instalasi & Persiapan

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal Anda:

1.  **Clone Repository:**
    ```bash
    git clone https://github.com/MaulanaK/StreetSense.git
    ```
2.  **Masuk ke Direktori:**
    ```bash
    cd StreetSense
    ```
3.  **Install Dependensi:**
    ```bash
    npm install
    ```
4.  **Konfigurasi Environment:**
    Buat file `.env.local` di akar proyek dan tambahkan variabel yang diperlukan (termasuk kunci API Supabase):
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
5.  **Jalankan Mode Pengembangan:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🛡️ Kontribusi
Proyek ini dikembangkan untuk tujuan akademis. Masukan dan saran sangat kami hargai untuk pengembangan fitur keselamatan yang lebih baik. Silakan buat *Pull Request* atau buka *Issue* untuk berkontribusi.

---
© 2026 Kelompok 26 - StreetSense Project.
