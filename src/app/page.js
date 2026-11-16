"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroAnimations from "./components/HeroAnimations";

// Keep copy grouped by page section so future sections can reuse this pattern.
const translations = {
  en: {
    navigation: {
      label: "Site introduction",
      note: "A LITTLE INTRODUCTION",
      contact: "SAY HELLO ↗",
      languageLabel: "Choose language",
    },
    hero: {
      eyebrow: "INFORMATICS STUDENT",
      titleLead: "Hi, I’m",
      titleName: "Andini.",
      description:
        "I’m an Informatics student who enjoys figuring out what users need and how to turn those needs into digital products that are easy to use. Through university projects, I’ve explored software development, quality assurance, and UI/UX design.",
      button: "EXPLORE MY STORY",
      portraitLabel: "Portrait of Andini",
      laptop: "A LITTLE WORK IN PROGRESS",
      note: "ideas in progress|keep exploring ↗",
      photoIndex: "FIG. 01 — A WORK IN PROGRESS",
      sideNote: "PERSONAL WEBSITE / 2026",
    },
    about: {
      eyebrow: "A LITTLE ABOUT ME",
      title: "My story so far.",
      instruction: "Scroll to move through the chapters",
      slides: [
        {
          id: "informatics",
          number: "01",
          label: "THE BEGINNING",
          title: "An Informatics student",
          description: "I study Informatics and enjoy learning how technology can respond to real needs. Through university projects, I have explored software development, quality assurance, and UI/UX design.",
          images: [{ src: "/images/andini2.jpg", alt: "Andini, an Informatics student" }],
        },
        {
          id: "expo",
          number: "02",
          label: "CAMPUS PROJECTS",
          title: "Learning by creating",
          description: "Throughout college, I have taken part in expos and worked on different projects. Each experience gives me room to explore ideas, try new things, and learn through the process of making.",
          images: [
            { src: "/images/expo.jpeg", alt: "Andini taking part in a campus expo" },
            { src: "/images/expo1.jpeg", alt: "A project expo activity" },
          ],
        },
        {
          id: "student-staff",
          number: "03",
          label: "STUDENT STAFF & MC",
          title: "Finding my voice",
          description: "As a Student Staff member, I have been involved in campus activities and also taken the role of MC. These moments have helped me grow more confident and communicate with different people.",
          images: [
            { src: "/images/MC1.jpg", alt: "Andini hosting an event as an MC" },
            { src: "/images/MC2.jpg", alt: "Andini presenting at an event" },
            { src: "/images/SS2(1).jpeg", alt: "A Student Staff activity" },
            { src: "/images/SS3.jpeg", alt: "Andini with her Student Staff friends" },
          ],
        },
        {
          id: "kkn",
          number: "04",
          label: "COMMUNITY LEARNING",
          title: "Sharing AI with children",
          description: "During KKN in Gentan village, I introduced elementary school students to responsible ways of using AI. We learned how to write clear prompts and put that knowledge into practice together.",
          images: [
            { src: "/images/KKN.jpeg", alt: "Andini teaching elementary school students in Gentan" },
            { src: "/images/KKN1.jpeg", alt: "Students learning about AI" },
            { src: "/images/KKN2.jpeg", alt: "A hands-on AI prompting practice session" },
            { src: "/images/KKN3.jpeg", alt: "Andini and the students during KKN" },
          ],
        },
      ],
    },
    hobbies: {
      eyebrow: "A LITTLE OFF THE CLOCK",
      title: "Outside of class",
      description: "A few small things that help me recharge, stay curious, and bring fresh energy into everything I do.",
      items: [
        { id: "movies", label: "Movie nights", object: "movies", popupLabel: "FAVORITE GENRES", genres: ["Thriller", "Romance", "Action"] },
        {
          id: "music",
          label: "Listening to music",
          object: "music",
          popupLabel: "MUSIC PROFILES",
          profiles: [
            { name: "Spotify", url: "" }, // Add your Spotify profile URL here.
            { name: "Apple Music", url: "" }, // Add your Apple Music profile URL here.
          ],
        },
        {
          id: "gym",
          label: "Going to the gym",
          object: "gym",
          popupLabel: "GYM FAVORITES",
          equipment: ["barbell", "smith-machine", "dumbbells"],
          equipmentLabels: ["Barbell", "Smith machine", "Dumbbells"],
        },
      ],
    },
    portfolio: {
      eyebrow: "SELECTED WORK / 01—02",
      title: "Projects I’ve explored.",
      introduction: "Three selected projects across health education, food management, and career mentorship.",
      projectLabel: "PROJECT",
      imagePlaceholder: "PROJECT SCREENSHOT PLACEHOLDER",
      highlightsLabel: "HIGHLIGHTS",
      technologiesLabel: "TOOLS & TECHNOLOGIES",
      yearLabel: "YEAR",
      roleLabel: "ROLE",
      viewProject: "VIEW PROJECT",
      projects: [
        {
          id: "bloom",
          title: "Bloom: Adolescent Reproductive Health Education",
          type: "UI/UX DESIGN & RESEARCH",
          year: "2026",
          role: "UI/UX Designer",
          description: "An educational platform that makes reliable reproductive health information easier for adolescents to access and understand.",
          highlights: [
            "Explored why teens rely on social media and unverified sources for health information.",
            "Designed the information architecture, user flows, wireframes, and interactive prototypes.",
            "Translated research insights into accessible, user-centered learning experiences.",
          ],
          technologies: ["Figma"],
          images: [
            { src: "/images/Bloom1.png", label: "Home page", alt: "Bloom home page design" },
            { src: "/images/Bloom2.png", label: "Topics", alt: "Bloom health topics page design" },
            { src: "/images/Bloom3.png", label: "Ask anonymusly", alt: "Bloom health assistant page design" },
          ],
          url: "", // Add the Bloom demo URL here when it is available.
        },
        {
          id: "homeplate",
          title: "HomePlate: Smart Food Inventory Management",
          type: "PRODUCT MANAGEMENT",
          year: "2025",
          role: "Project Manager & Researcher",
          description: "A smart food inventory and meal-planning platform that helps students and households make better use of available ingredients.",
          highlights: [
            "Addressed forgotten ingredients, food expiry, and difficulty deciding what to cook.",
            "Planned user needs, key features, and user flows while coordinating the team.",
            "Promoted responsible consumption and production in line with UN SDG 12.",
          ],
          technologies: ["Figma", "Next.js", "TypeScript", "Gemini AI API"],
          images: [
            { src: "/images/homeplate.jpg", label: "Desktop", alt: "HomePlate desktop landing page design" },
            { src: "/images/homeplate1.png", label: "Mobile", alt: "HomePlate mobile landing page design" },
          ],
          url: "", // Add the HomePlate demo URL here when it is available.
        },
        {
          id: "ojyms",
          title: "OJYMS: One Journey Many Success",
          type: "BACKEND DEVELOPMENT",
          year: "2024",
          role: "Backend Developer",
          description: "A platform connecting students and fresh graduates with career opportunities, alumni mentorship, and professional networks.",
          highlights: [
            "Explored student and alumni needs for career guidance, experience sharing, and networking.",
            "Contributed to UI/UX, database design, and core backend features with the project team.",
            "Learned how design and technology can work together to meet user needs.",
          ],
          technologies: ["Laravel", "MySQL", "AI-assisted Development"],
          images: [
            { src: "/images/OJYMS.png", label: "Career portal", alt: "OJYMS career and alumni mentorship platform homepage" },
          ],
          url: "", // Add the OJYMS demo URL here when it is available.
        },
      ],
    },
    footer: {
      eyebrow: "LET'S CONNECT",
      title: "Have a project in mind?",
      description: "Feel free to reach out for internship opportunities, collaborations, or a friendly conversation.",
      pending: "LINK COMING SOON",
      contacts: [
        { id: "instagram", label: "Instagram", value: "Add your Instagram link", href: "" }, // Add your Instagram URL here.
        { id: "email", label: "Email", value: "andin.rmdhni0810@gmail.com", href: "mailto:andin.rmdhni0810@gmail.com" },
        { id: "cv", label: "Resume / CV", value: "Add your CV file or link", href: "" }, // Add a CV file under public/ and set its path here.
        { id: "figma", label: "Figma portfolio", value: "Add your Figma portfolio link", href: "" }, // Add your Figma URL here.
      ],
    },
  },
  id: {
    navigation: {
      label: "Perkenalan situs",
      note: "PERKENALAN SINGKAT",
      contact: "SAPA AKU ↗",
      languageLabel: "Pilih bahasa",
    },
    hero: {
      eyebrow: "MAHASISWA INFORMATIKA",
      titleLead: "Halo, aku",
      titleName: "Andini.",
      description:
        "Aku mahasiswa Informatika yang suka mencari tahu apa yang dibutuhkan pengguna dan bagaimana kebutuhan itu bisa diwujudkan jadi produk digital yang mudah dipakai. Lewat proyek kuliah, aku mengeksplorasi pengembangan perangkat lunak, quality assurance, dan desain UI/UX.",
      button: "KENALI CERITAKU",
      portraitLabel: "Foto Andini",
      laptop: "SEDANG DALAM PROSES",
      note: "ide yang sedang tumbuh|terus bereksplorasi ↗",
      photoIndex: "FIG. 01 — MASIH DALAM PROSES",
      sideNote: "SITUS PRIBADI / 2026",
    },
    about: {
      eyebrow: "SEDIKIT TENTANGKU",
      title: "Ceritaku sejauh ini.",
      instruction: "Scroll untuk melihat ceritaku",
      slides: [
        {
          id: "informatics",
          number: "01",
          label: "AWAL CERITA",
          title: "Mahasiswa Informatika",
          description: "Aku kuliah di bidang Informatika dan senang belajar bagaimana teknologi bisa menjawab kebutuhan nyata. Lewat proyek kuliah, aku mengeksplorasi pengembangan perangkat lunak, quality assurance, dan desain UI/UX.",
          images: [{ src: "/images/andini2.jpg", alt: "Andini, mahasiswa Informatika" }],
        },
        {
          id: "expo",
          number: "02",
          label: "PROYEK KAMPUS",
          title: "Belajar lewat berkarya",
          description: "Selama kuliah, aku selalu ikut expo dan mengerjakan berbagai proyek. Setiap pengalaman memberiku ruang untuk mengeksplorasi ide, mencoba hal baru, dan belajar langsung dari proses berkarya.",
          images: [
            { src: "/images/expo.jpeg", alt: "Andini mengikuti expo kampus" },
            { src: "/images/expo1.jpeg", alt: "Kegiatan expo proyek" },
          ],
        },
        {
          id: "student-staff",
          number: "03",
          label: "STUDENT STAFF & MC",
          title: "Belajar percaya diri",
          description: "Sebagai Student Staff, aku ikut terlibat dalam kegiatan kampus dan juga beberapa kali menjadi MC. Pengalaman ini membantuku lebih percaya diri dan berkomunikasi dengan banyak orang.",
          images: [
            { src: "/images/MC1.jpg", alt: "Andini menjadi MC di sebuah acara" },
            { src: "/images/MC2.jpg", alt: "Andini membawakan acara" },
            { src: "/images/SS2.jpeg", alt: "Kegiatan Student Staff" },
            { src: "/images/SS3.jpeg", alt: "Andini bersama teman-teman Student Staff" },
          ],
        },
        {
          id: "kkn",
          number: "04",
          label: "BELAJAR BERSAMA WARGA",
          title: "Berbagi tentang AI",
          description: "Saat KKN di Desa Gentan, aku mengenalkan cara menggunakan AI dengan baik kepada anak-anak SD. Kami belajar menyusun prompt yang benar, lalu mempraktikkannya bersama.",
          images: [
            { src: "/images/KKN.jpeg", alt: "Andini mengajar anak SD di Desa Gentan" },
            { src: "/images/KKN1.jpeg", alt: "Anak-anak belajar tentang AI" },
            { src: "/images/KKN2.jpeg", alt: "Sesi praktik menyusun prompt AI" },
            { src: "/images/KKN3.jpeg", alt: "Andini bersama anak-anak saat KKN" },
          ],
        },
      ],
    },
    hobbies: {
      eyebrow: "DI LUAR WAKTU KULIAH",
      title: "Di luar kuliah",
      description: "Beberapa hal sederhana yang membantuku mengisi energi, tetap penasaran, dan membawa semangat baru ke berbagai aktivitas.",
      items: [
        { id: "movies", label: "Nonton film", object: "movies", popupLabel: "GENRE FILM FAVORIT", genres: ["Thriller", "Romance", "Action"] },
        {
          id: "music",
          label: "Denger musik",
          object: "music",
          popupLabel: "PROFIL MUSIK",
          profiles: [
            { name: "Spotify", url: "" }, // Tambahkan URL profil Spotify di sini.
            { name: "Apple Music", url: "" }, // Tambahkan URL profil Apple Music di sini.
          ],
        },
        {
          id: "gym",
          label: "Gym",
          object: "gym",
          popupLabel: "ALAT GYM FAVORIT",
          equipment: ["barbell", "smith-machine", "dumbbells"],
          equipmentLabels: ["Barbel", "Smith machine", "Dumbbell"],
        },
      ],
    },
    portfolio: {
      eyebrow: "KARYA PILIHAN / 01—02",
      title: "Proyek yang pernah kueksplorasi.",
      introduction: "Tiga proyek pilihan di bidang edukasi kesehatan, pengelolaan bahan makanan, dan mentoring karier.",
      projectLabel: "PROYEK",
      imagePlaceholder: "PLACEHOLDER SCREENSHOT PROYEK",
      highlightsLabel: "SOROTAN",
      technologiesLabel: "TOOLS & TEKNOLOGI",
      yearLabel: "TAHUN",
      roleLabel: "PERAN",
      viewProject: "LIHAT PROYEK",
      projects: [
        {
          id: "bloom",
          title: "Bloom: Edukasi Kesehatan Reproduksi Remaja",
          type: "DESAIN UI/UX & RISET",
          year: "2026",
          role: "UI/UX Designer",
          description: "Platform edukasi yang membantu remaja mengakses dan memahami informasi kesehatan reproduksi yang tepercaya.",
          highlights: [
            "Mencari tahu mengapa remaja masih mengandalkan media sosial dan sumber yang belum terverifikasi.",
            "Merancang arsitektur informasi, user flow, wireframe, dan prototipe interaktif.",
            "Mengubah temuan riset menjadi pengalaman edukasi yang mudah diakses dan berpusat pada pengguna.",
          ],
          technologies: ["Figma"],
          images: [
            { src: "/images/Bloom1.png", label: "Beranda", alt: "Desain halaman beranda Bloom" },
            { src: "/images/Bloom2.png", label: "Topik", alt: "Desain halaman topik kesehatan Bloom" },
            { src: "/images/Bloom3.png", label: "Asisten kesehatan", alt: "Desain asisten kesehatan Bloom" },
          ],
          url: "", // Tambahkan URL demo Bloom di sini jika sudah tersedia.
        },
        {
          id: "homeplate",
          title: "HomePlate: Manajemen Stok Makanan Pintar",
          type: "MANAJEMEN PRODUK",
          year: "2025",
          role: "Project Manager & Riset Proyek",
          description: "Platform pengelolaan stok bahan dan perencanaan menu agar mahasiswa dan rumah tangga bisa memanfaatkan bahan yang tersedia.",
          highlights: [
            "Mengangkat masalah bahan makanan yang terlupa, kedaluwarsa, dan kebingungan menentukan menu.",
            "Merencanakan kebutuhan pengguna, fitur utama, dan alur pengguna sambil mengoordinasikan tim.",
            "Mendorong konsumsi dan produksi yang bertanggung jawab, selaras dengan SDG 12.",
          ],
          technologies: ["Figma", "Next.js", "TypeScript", "Gemini AI API"],
          images: [
            { src: "/images/homeplate.jpg", label: "Desktop", alt: "Desain halaman HomePlate versi desktop" },
            { src: "/images/homeplate1.png", label: "Mobile", alt: "Desain halaman HomePlate versi ponsel" },
          ],
          url: "", // Tambahkan URL demo HomePlate di sini jika sudah tersedia.
        },
        {
          id: "ojyms",
          title: "OJYMS: One Journey Many Success",
          type: "PENGEMBANGAN BACKEND",
          year: "2024",
          role: "Backend Developer",
          description: "Platform yang menghubungkan mahasiswa dan lulusan baru dengan peluang karier, mentoring alumni, dan jaringan profesional.",
          highlights: [
            "Mengeksplorasi kebutuhan mahasiswa dan alumni terkait arahan karier, berbagi pengalaman, dan networking.",
            "Berkontribusi pada UI/UX, desain database, dan fitur backend utama bersama tim proyek.",
            "Mempelajari bagaimana desain dan teknologi dapat bekerja sama untuk menjawab kebutuhan pengguna.",
          ],
          technologies: ["Laravel", "MySQL", "AI-assisted Development"],
          images: [
            { src: "/images/OJYMS.png", label: "Portal karier", alt: "Halaman utama platform karier dan mentoring alumni OJYMS" },
          ],
          url: "", // Tambahkan URL demo OJYMS di sini jika sudah tersedia.
        },
      ],
    },
    footer: {
      eyebrow: "MARI TERHUBUNG",
      title: "Punya ide untuk dikerjakan bersama?",
      description: "Hubungi aku untuk kesempatan magang, kolaborasi, atau sekadar bertukar cerita.",
      pending: "TAUTAN SEGERA DITAMBAHKAN",
      contacts: [
        { id: "instagram", label: "Instagram", value: "Tambahkan tautan Instagram", href: "" }, // Tambahkan URL Instagram di sini.
        { id: "email", label: "Email", value: "andin.rmdhni0810@gmail.com", href: "mailto:andin.rmdhni0810@gmail.com" },
        { id: "cv", label: "CV", value: "Tambahkan file atau tautan CV", href: "" }, // Tambahkan file CV ke public/ lalu isi path-nya di sini.
        { id: "figma", label: "Portofolio Figma", value: "Tambahkan tautan portofolio Figma", href: "" }, // Tambahkan URL Figma di sini.
      ],
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [activeHobby, setActiveHobby] = useState(null);
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <HeroAnimations>
      <main className="page-shell">
        {/* Header: site name, contact link, and language selector. */}
        <header className="topbar" aria-label={copy.navigation.label}>
          <a className="wordmark" href="#home">ANDINI<span>—</span></a>
          <span className="topbar-note">{copy.navigation.note}</span>
          <a className="topbar-link" href="mailto:hello@example.com">
            {copy.navigation.contact}
          </a>
          <div className="language-switch" aria-label={copy.navigation.languageLabel}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="language-globe">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
            </svg>
            <button
              type="button"
              className="language-option"
              aria-label="English"
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              ENG
            </button>
            <button
              type="button"
              className="language-option"
              aria-label="Bahasa Indonesia"
              aria-pressed={language === "id"}
              onClick={() => setLanguage("id")}
            >
              IND
            </button>
          </div>
        </header>

        {/* Home section: short introduction shown when visitors first arrive. */}
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> {copy.hero.eyebrow}</p>
            <h1 id="hero-title">
              {copy.hero.titleLead}<br /><span>{copy.hero.titleName}</span>
            </h1>
            <p className="intro">{copy.hero.description}</p>
            <a className="text-link" href="#about">
              {copy.hero.button} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="portrait-card">
            <div className="studio-photo portrait-placeholder">
              <Image
                className="portrait-image"
                src="/images/andin.jpeg"
                alt={copy.hero.portraitLabel}
                fill
                sizes="(max-width: 760px) 100vw, 40vw"
                priority
              />
            </div>
            <div className="studio-laptop" aria-hidden="true">
              <span className="laptop-screen">{copy.hero.laptop}</span>
              <span className="laptop-base" />
            </div>
            <p className="studio-note">
              {copy.hero.note.split("|").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <span className="photo-index">{copy.hero.photoIndex}</span>
          </div>
          <span className="side-note">{copy.hero.sideNote}</span>
        </section>

        {/* About section: a longer introduction visitors reach by scrolling. */}
        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="story-heading">
            <p className="eyebrow">{copy.about.eyebrow}</p>
            <h2 id="about-title">{copy.about.title}</h2>
            <p className="story-instruction">{copy.about.instruction}<span aria-hidden="true"> →</span></p>
          </div>
          <div className="story-viewport">
            <div className="story-track">
              {copy.about.slides.map((slide) => (
                <article className="story-slide" key={slide.id} aria-label={`${slide.number}. ${slide.title}`}>
                  <div className="story-card">
                    <div className="story-copy">
                      <p className="story-label"><span>{slide.number}</span>{slide.label}</p>
                      <h3>{slide.title}</h3>
                      <p className="story-description">{slide.description}</p>
                    </div>
                    <div className={`story-gallery story-gallery-${slide.id}`}>
                      {slide.images.map((image, imageIndex) => (
                        <figure className="story-photo" key={image.src}>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 760px) 76vw, 42vw"
                            priority={slide.id === "informatics"}
                          />
                          {slide.images.length > 1 && <figcaption>{String(imageIndex + 1).padStart(2, "0")}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="story-progress" aria-hidden="true">
            {copy.about.slides.map((slide) => <span key={slide.id}>{slide.number}</span>)}
          </div>
        </section>

        {/* Hobbies section: visual placeholders for favorite things outside class. */}
        <section className="hobbies-section" id="hobbies" aria-labelledby="hobbies-title">
          <p className="eyebrow">{copy.hobbies.eyebrow}</p>
          <h2 id="hobbies-title">{copy.hobbies.title}</h2>
          <p className="hobbies-intro">{copy.hobbies.description}</p>
          <div className="hobby-grid">
            {copy.hobbies.items.map((hobby, index) => (
              <article className={`hobby-item hobby-item-${index + 1}`} key={hobby.id} data-open={activeHobby === hobby.id}>
                <button
                  className={`hobby-trigger hobby-trigger-${hobby.object}`}
                  type="button"
                  aria-label={hobby.label}
                  aria-expanded={activeHobby === hobby.id}
                  aria-controls={`hobby-popover-${hobby.id}`}
                  onClick={() => setActiveHobby(activeHobby === hobby.id ? null : hobby.id)}
                >
                  {hobby.object === "movies" && <span className="netflix-mark" aria-hidden="true">N</span>}
                  {hobby.object === "music" && (
                    <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M22 13v31.5a8 8 0 1 1-4-6.9V18l31-7v27.5a8 8 0 1 1-4-6.9V7z" /></svg>
                  )}
                  {hobby.object === "gym" && (
                    <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 25v14M15 18v28M49 18v28M56 25v14M15 32h34" /></svg>
                  )}
                </button>
                <h3>{hobby.label}</h3>
                <div className="hobby-popover" id={`hobby-popover-${hobby.id}`}>
                  {hobby.genres && (
                    <div className="hobby-popover-content">
                      <span className="popover-kicker">NETFLIX · {hobby.popupLabel}</span>
                      <div className="genre-list">
                        {hobby.genres.map((genre) => <span className="genre-tag" key={genre}>{genre}</span>)}
                      </div>
                    </div>
                  )}
                  {hobby.profiles && (
                    <div className="hobby-popover-content">
                      <span className="popover-kicker">{hobby.popupLabel}</span>
                      <div className="music-profile-list">
                        {hobby.profiles.map((profile) => {
                          const profileContent = (
                            <>
                              <span className={`music-service-icon music-service-${profile.name === "Spotify" ? "spotify" : "apple"}`} aria-hidden="true">
                                {profile.name === "Spotify" ? (
                                  <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" /><path d="M8 12c5-1.5 11-.8 16 2M9 16c4.2-1.2 9.4-.6 13.2 1.6M10 20c3.2-.8 6.8-.4 9.7 1.2" /></svg>
                                ) : (
                                  <svg viewBox="0 0 32 32"><path d="M19 6v17.2a4 4 0 1 1-2-3.5V10l11-2.5v13.7a4 4 0 1 1-2-3.5V5.5L19 7z" /></svg>
                                )}
                              </span>
                              <span>{profile.name}</span>
                              <span className="music-link-arrow" aria-hidden="true">↗</span>
                            </>
                          );

                          return profile.url ? (
                            <a className="music-profile-link" href={profile.url} key={profile.name} target="_blank" rel="noreferrer">
                              {profileContent}
                            </a>
                          ) : (
                            <span className="music-profile-link music-profile-pending" key={profile.name} title={language === "en" ? "Add your profile URL in the hobbies data" : "Tambahkan URL profil di data hobi"}>
                              {profileContent}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {hobby.equipment && (
                    <div className="hobby-popover-content">
                      <span className="popover-kicker">{hobby.popupLabel}</span>
                      <div className="gym-equipment-list">
                        {hobby.equipment.map((equipment, equipmentIndex) => (
                          <div className="gym-equipment" key={equipment}>
                            <svg className={`gym-equipment-icon gym-equipment-${equipment}`} viewBox="0 0 64 64" aria-hidden="true">
                              {equipment === "barbell" && <path d="M9 24v16M16 18v28M48 18v28M55 24v16M16 32h32" />}
                              {equipment === "smith-machine" && <path d="M12 8v48M52 8v48M12 14h40M12 50h40M18 28h28M18 24v8M46 24v8M23 18v28M41 18v28" />}
                              {equipment === "dumbbells" && <path d="M8 26v12M14 20v24M20 26v12M20 32h24M44 26v12M50 20v24M56 26v12" />}
                            </svg>
                            <span>{hobby.equipmentLabels[equipmentIndex]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        {/* Portfolio section: full-width project highlights with image slots. */}
        <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
          <div className="portfolio-inner">
            <p className="eyebrow">{copy.portfolio.eyebrow}</p>
            <h2 id="portfolio-title">{copy.portfolio.title}</h2>
            <p className="portfolio-intro">{copy.portfolio.introduction}</p>

            <div className="project-list">
              {copy.portfolio.projects.map((project, index) => (
                <article className={`project-showcase project-showcase-${project.id}`} key={project.id}>
                  <div className="project-copy">
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                    {(project.year || project.role) && (
                      <div className="project-facts">
                        {project.year && <p><strong>{copy.portfolio.yearLabel}</strong>{project.year}</p>}
                        {project.role && <p><strong>{copy.portfolio.roleLabel}</strong>{project.role}</p>}
                      </div>
                    )}
                    <p className="project-description">{project.description}</p>

                    {project.highlights.length > 0 && (
                      <div className="project-highlights">
                        <p className="project-subheading">{copy.portfolio.highlightsLabel}</p>
                        <ul>
                          {project.highlights.map((highlight, highlightIndex) => (
                            <li key={highlight}>
                              <span>{String(highlightIndex + 1).padStart(2, "0")}</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="project-technologies">
                      <p className="project-subheading">{copy.portfolio.technologiesLabel}</p>
                      <div className="technology-list">
                        {project.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                    </div>

                    {project.url && (
                      <a className="portfolio-link" href={project.url} target="_blank" rel="noreferrer">
                        {copy.portfolio.viewProject} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>

                  <figure className="project-media">
                    <div className={`project-gallery project-gallery-${project.id}`}>
                      {project.images.map((image, imageIndex) => (
                        <figure className={`project-gallery-item project-gallery-item-${project.id}-${imageIndex + 1}`} key={image.src}>
                          <figcaption>{image.label}</figcaption>
                          <div className="project-gallery-image">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes={
                                project.id === "bloom" && imageIndex > 0
                                  ? "(max-width: 760px) 42vw, (max-width: 1000px) 42vw, 23vw"
                                  : project.id === "homeplate" && imageIndex === 1
                                    ? "(max-width: 760px) 40vw, (max-width: 1000px) 24vw, 16vw"
                                    : "(max-width: 760px) 92vw, (max-width: 1000px) 86vw, 48vw"
                              }
                            />
                            <span className="project-image-index">{String(imageIndex + 1).padStart(2, "0")}</span>
                          </div>
                        </figure>
                      ))}
                    </div>
                  </figure>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* Contact footer: social links, email, CV, and design portfolio. */}
        <footer className="page-footer contact-footer" id="contact">
          <div className="contact-footer-intro">
            <p className="eyebrow">{copy.footer.eyebrow}</p>
            <h2>{copy.footer.title}</h2>
            <p className="contact-footer-description">{copy.footer.description}</p>
          </div>
          <div className="contact-link-grid">
            {copy.footer.contacts.map((contact) => {
              const content = (
                <>
                  <span className="contact-link-label">{contact.label}</span>
                  <span className="contact-link-value">{contact.value}</span>
                  {contact.href && <span className="contact-link-arrow" aria-hidden="true">↗</span>}
                  {!contact.href && <span className="contact-link-pending">{copy.footer.pending}</span>}
                </>
              );

              return contact.href ? (
                <a
                  className="contact-link"
                  href={contact.href}
                  target={contact.id === "email" ? undefined : "_blank"}
                  rel={contact.id === "email" ? undefined : "noreferrer"}
                  key={contact.id}
                >
                  {content}
                </a>
              ) : (
                <div className="contact-link contact-link-disabled" aria-disabled="true" key={contact.id}>
                  {content}
                </div>
              );
            })}
          </div>
        </footer>
      </main>
    </HeroAnimations>
  );
}
