const translations = {
  id: {
    nav: {
      brand: "Lexicon English",
      links: ["Beranda", "Tentang Kami", "Program", "Testimoni", "Kontak"],
      paths: ["/", "/about", "/programs", "/testimonials", "/contact"],
      cta: "Konsultasi Gratis",
      langToggle: "EN",
      whatsappMsg: "Halo! Saya ingin konsultasi tentang program les di Lexicon English Academy.",
    },
    hero: {
      tagline: "Konsultasi Gratis via WhatsApp",
      titlePrefix: "Belajar Bahasa Inggris dengan ",
      titleHighlight: "Mudah dan Menyenangkan",
      description:
        "Kelas online dan offline untuk anak, remaja, mahasiswa, dan profesional. Kuasai komunikasi bahasa Inggris, bangun kepercayaan diri akademis, dan tingkatkan prospek karier global Anda bersama pengajar bersertifikasi.",
      btnPrimary: "Konsultasi Gratis via WA",
      btnSecondary: "Info Program via WA",
      whatsappMsg: "Halo! Saya tertarik dengan program les di Lexicon English Academy. Mohon informasinya.",
      visualTitle: "Pembelajaran Interaktif",
      visualSub: "Meningkatkan rasa percaya diri berbahasa setiap hari",
      stat1Value: "4.9 / 5.0",
      stat1Label: "Rating Siswa",
      stat2Value: "15.000+",
      stat2Label: "Siswa Aktif",
    },
    home: {
      features: {
        tag: "Keunggulan Kami",
        title: "Metode Efektif untuk Fasih",
        subtitle:
          "Kami memadukan kurikulum berstandar internasional, pengajar ahli bersertifikasi, dan lingkungan belajar interaktif untuk menjamin peningkatan kemampuan berbahasa Anda.",
        cards: [
          {
            icon: "\u{1F468}\u{200D}\u{1F3EB}",
            title: "Pengajar Native & Lokal Terbaik",
            desc: "Seluruh instruktur kami memiliki sertifikasi pengajaran bahasa Inggris internasional (CELTA/TEFL) dengan pengalaman mengajar rata-rata di atas 5 tahun.",
          },
          {
            icon: "\u23F0",
            title: "Jadwal Kelas Sangat Fleksibel",
            desc: "Pilih jadwal belajar yang paling sesuai dengan aktivitas harian Anda, mulai dari kelas malam hari biasa hingga kelas intensif di akhir pekan.",
          },
          {
            icon: "\u{1F4BB}",
            title: "Metode Hybrid Blended Learning",
            desc: "Hadir langsung di ruang kelas modern kami di pusat kota, atau bergabunglah secara live streaming interaktif dari mana saja.",
          },
        ],
      },
      programs: {
        tag: "Program Populer",
        title: "Pilih Kelas yang Tepat",
        subtitle:
          "Temukan program kursus terbaik yang dirancang khusus untuk memenuhi kebutuhan pengembangan diri, akademik, maupun karier profesional Anda.",
        cards: [
          {
            title: "Bahasa Inggris Anak",
            description:
              "Program interaktif dan menyenangkan untuk membangun kosakata dasar, pelafalan, dan kepercayaan diri berbicara sejak usia dini.",
            category: "Anak & Remaja",
            format: "Offline di Kelas",
            level: "Usia 6 - 11 Tahun (Pemula)",
            duration: "16 Minggu",
            price: "Rp 3.500.000",
            icon: "\u{1F3A8}",
          },
          {
            title: "Bahasa Inggris Remaja",
            description:
              "Kelas diskusi interaktif dengan topik seru dan latihan presentasi untuk mengikis rasa cemas serta meningkatkan kelancaran berbicara remaja.",
            category: "Anak & Remaja",
            format: "Kelas Hybrid",
            level: "Usia 12 - 17 Tahun (Menengah)",
            duration: "12 Minggu",
            price: "Rp 3.900.000",
            icon: "\u{1F4E3}",
          },
          {
            title: "Persiapan TOEFL iBT",
            description:
              "Strategi intensif menghadapi tes TOEFL berbasis komputer. Pembahasan lengkap templates writing, teknik speaking, dan kunci sukses listening.",
            category: "Akademik",
            format: "Kelas Online",
            level: "Menengah - Lanjut",
            duration: "10 Minggu",
            price: "Rp 5.900.000",
            icon: "\u{1F4DD}",
          },
        ],
        btnText: "Lihat Semua Program Kelas",
      },
      stats: [
        { value: "98%", label: "Tingkat Kelulusan" },
        { value: "120+", label: "Pengajar Bersertifikat" },
        { value: "15.000+", label: "Alumni Sukses" },
        { value: "15+", label: "Tahun Pengalaman" },
      ],
      testimonials: {
        tag: "Testimoni Siswa",
        title: "Cerita Sukses Alumni Kami",
        subtitle:
          "Bergabunglah dengan ribuan siswa yang telah berhasil meraih cita-cita dan kemajuan karier bersama Lexicon English Academy.",
        cards: [
          {
            name: "Budi Santoso",
            course: "Persiapan IELTS",
            rating: 5,
            quote:
              "Belajar di Lexicon benar-benar mengubah cara saya mempersiapkan tes. Saya berhasil mendapatkan skor band 8.0! Masukan dari para pengajar sangat mendalam.",
            initials: "BS",
          },
          {
            name: "Fitriani",
            course: "Komunikasi Bisnis Profesional",
            rating: 5,
            quote:
              "Kepercayaan diri saya saat melakukan presentasi di depan klien asing meningkat drastis. Latihan kosa kata bisnis di sini sangat aplikatif.",
            initials: "FT",
          },
          {
            name: "Rian Hidayat",
            course: "Bahasa Inggris Dewasa",
            rating: 5,
            quote:
              "Jadwal kelas hybrid sangat memudahkan saya yang sibuk bekerja. Pembelajaran di kelas aktif, menarik, dan sama sekali tidak membosankan.",
            initials: "RH",
          },
        ],
        btnText: "Lihat Semua Ulasan Siswa",
      },
    },
    cta: {
      default: {
        title: "Siap Berbicara Bahasa Inggris dengan Percaya Diri?",
        description:
          "Bergabunglah dengan program kelas kami sekarang juga. Dapatkan tes penempatan kemampuan (diagnostic test) secara gratis serta sesi kelas uji coba (trial session).",
        primaryText: "Konsultasi Kelas Gratis",
        secondaryText: "Lihat Semua Program",
      },
      about: {
        title: "Siap Memulai Perjalanan Belajar Anda?",
        description:
          "Hubungi konsultan kami hari ini dan temukan program belajar yang paling sesuai dengan kebutuhan Anda.",
      },
    },
    footer: {
      brand: "Lexicon",
      brandHighlight: "English",
      description:
        "Lexicon English Academy menawarkan program kursus bahasa Inggris berkualitas premium secara online dan offline yang dirancang untuk meningkatkan kefasihan, mempersiapkan kesuksesan akademik, dan mempercepat kemajuan karier Anda.",
      socialAria: { fb: "Facebook", ig: "Instagram", tw: "Twitter", ln: "LinkedIn" },
      quickLinksTitle: "Tautan Cepat",
      quickLinks: [
        { name: "Beranda", path: "/" },
        { name: "Tentang Kami", path: "/about" },
        { name: "Program Kursus", path: "/programs" },
        { name: "Testimoni Siswa", path: "/testimonials" },
        { name: "Hubungi Kami", path: "/contact" },
      ],
      programsTitle: "Program Kami",
      programLinks: [
        { name: "Bahasa Inggris Umum", path: "/programs" },
        { name: "Bahasa Inggris Bisnis", path: "/programs" },
        { name: "Persiapan IELTS", path: "/programs" },
        { name: "Persiapan TOEFL iBT", path: "/programs" },
        { name: "Bahasa Inggris Anak", path: "/programs" },
      ],
      newsletterTitle: "Tetap Terupdate",
      newsletterText:
        "Berlangganan newsletter kami untuk mendapatkan tips belajar, informasi pembaruan kelas, serta penawaran diskon eksklusif.",
      newsletterPlaceholder: "Alamat Email Anda",
      newsletterBtn: "Gabung",
      newsletterSuccess:
        "Terima kasih! Anda telah berhasil berlangganan newsletter kami.",
      copyright: "Lexicon English Academy. Hak Cipta Dilindungi Undang-Undang.",
      bottomLinks: [
        { name: "Kebijakan Privasi", path: "#" },
        { name: "Syarat dan Ketentuan", path: "#" },
        { name: "Kebijakan Cookie", path: "#" },
      ],
    },
    about: {
      tag: "Tentang Kami",
      title: "Membantu Anda Menguasai Bahasa Inggris",
      subtitle:
        "Kami membantu mengatasi hambatan bahasa melalui pendidikan bahasa Inggris yang modern, efektif, dan dapat diakses baik secara online maupun tatap muka.",
      storyTitle: "Cerita dan Misi Kami",
      storyParagraphs: [
        "Berdiri sejak tahun 2012, Lexicon English Academy memulai perjalanan dengan satu ruang kelas dan sebuah keyakinan bahwa belajar bahasa tidak seharusnya hanya menghafal aturan tata bahasa. Belajar bahasa harus menjadi pengalaman yang aktif, menyenangkan, dan relevan dengan kehidupan nyata.",
        "Saat ini, Lexicon mengoperasikan beberapa pusat pembelajaran serta platform kelas online modern yang melayani siswa dari berbagai daerah dan latar belakang, mulai dari pelajar hingga profesional.",
        "Misi kami tetap sama: memberikan pendidikan bahasa Inggris yang praktis, berkualitas tinggi, dan membantu setiap siswa berbicara dengan percaya diri, jelas, dan efektif.",
      ],
      visualPaneTitle: "Sejak 2012",
      visualPaneDesc:
        "Lebih dari satu dekade menghadirkan pendidikan bahasa Inggris berkualitas.",
      valuesTitle: "Nilai-Nilai Kami",
      values: [
        {
          icon: "\u{1F3AF}",
          title: "Kurikulum Berorientasi Tujuan",
          desc: "Setiap program pembelajaran dirancang untuk mencapai target kemampuan bahasa yang jelas, sesuai standar CEFR maupun persiapan IELTS dan TOEFL.",
        },
        {
          icon: "\u{1F91D}",
          title: "Lingkungan Belajar Interaktif",
          desc: "Kami menciptakan suasana belajar yang aktif dan komunikatif, baik dalam kelas online maupun tatap muka, sehingga siswa terbiasa menggunakan bahasa Inggris dalam kehidupan nyata.",
        },
        {
          icon: "\u{1F4C8}",
          title: "Pemantauan Kemajuan Berkala",
          desc: "Evaluasi rutin dan laporan perkembangan membantu memantau peningkatan kemampuan berbicara, tata bahasa, pelafalan, serta kosakata setiap siswa.",
        },
      ],
      campusTag: "Fasilitas Belajar",
      campusTitle: "Tempat Belajar yang Nyaman",
      campusSubtitle:
        "Nikmati fasilitas pembelajaran modern baik saat belajar langsung di kelas maupun secara online dari rumah.",
      campuses: [
        {
          icon: "\u{1F3E2}",
          name: "Kampus Pusat Kota",
          desc: "Cabang utama kami dengan 12 ruang kelas multimedia, area belajar nyaman, laboratorium bahasa, dan akses transportasi yang mudah.",
        },
        {
          icon: "\u{1F3EB}",
          name: "Kampus Utara",
          desc: "Lingkungan belajar yang luas dan ramah keluarga, dilengkapi zona khusus anak dan teknologi pembelajaran interaktif.",
        },
        {
          icon: "\u{1F4BB}",
          name: "Kampus Virtual",
          desc: "Platform pembelajaran online modern yang mendukung kelas langsung, ruang diskusi interaktif, dan materi digital lengkap.",
        },
      ],
      teachersTag: "Tim Pengajar",
      teachersTitle: "Kenali Para Pengajar Kami",
      teachersSubtitle:
        "Belajar bersama instruktur berpengalaman yang berkomitmen membantu Anda mencapai kemampuan bahasa Inggris terbaik.",
      teachers: [
        {
          initials: "AB",
          name: "Arthur Pendelton",
          role: "Pelatih IELTS & Tutor Native",
          bio: "Arthur memiliki gelar Magister Linguistik Terapan dari Oxford dan lebih dari 8 tahun pengalaman membimbing siswa mencapai skor IELTS 8.0 ke atas.",
        },
        {
          initials: "MJ",
          name: "Maria Jenkins",
          role: "Konsultan Bahasa Inggris Bisnis",
          bio: "Spesialis Bahasa Inggris untuk dunia profesional. Berpengalaman melatih tim manajemen di sektor teknologi, keuangan, dan manufaktur.",
        },
        {
          initials: "DK",
          name: "David Kim",
          role: "Spesialis TOEFL iBT",
          bio: "Mantan penguji TOEFL yang berfokus pada strategi speaking dan writing untuk membantu siswa meningkatkan skor secara efektif.",
        },
        {
          initials: "SH",
          name: "Sophia Hernandez",
          role: "Instruktur Bahasa Inggris Anak",
          bio: "Bersertifikat TEFL dengan spesialisasi pembelajaran anak. Ahli dalam menciptakan kelas online yang menyenangkan dan interaktif.",
        },
      ],
    },
    contact: {
      tag: "Hubungi Kami",
      title: "Hubungi Akademi Kami",
      subtitle:
        "Siap meningkatkan kemampuan bahasa Inggris Anda? Kirimkan pesan kepada kami atau minta panggilan balik dari konsultan akademik.",
      infoTitle: "Detail Kontak",
      infoIntro:
        "Kunjungi kantor pusat kami, hubungi agen dukungan, atau kirim email. Konsultan akademik kami selalu siap membantu.",
      infos: [
        {
          icon: "\u{1F4CD}",
          title: "Kantor Pusat",
          val: "Lexicon Tower, Lantai 4\nJl. Pendidikan No. 10\nJakarta Pusat 10110",
        },
        {
          icon: "\u{1F4DE}",
          title: "Nomor Telepon",
          val: "WhatsApp: 0812-3456-7890\nTel: (021) 1234-5678",
        },
        {
          icon: "\u2709\uFE0F",
          title: "Email Dukungan",
          val: "info@lexicon-academy.com\nadmin@lexicon-academy.com",
        },
        {
          icon: "\u23F0",
          title: "Jam Konsultasi",
          val: "Senin - Jumat: 08:00 - 21:00\nSabtu: 09:00 - 17:00\nMinggu: Tutup",
        },
      ],
      formTitle: "Konsultasi Kursus",
      formSub:
        "Isi detail Anda untuk menghitung biaya atau minta sesi uji coba gratis.",
      labels: {
        name: "Nama Lengkap",
        phone: "Nomor Telepon",
        email: "Alamat Email",
        program: "Program Pilihan",
        format: "Format Kelas",
        message: "Ceritakan tujuan belajar Anda",
      },
      programOptions: [
        "General English Mastery",
        "IELTS Academic Prep Boost",
        "Business Communication Pro",
        "TOEFL iBT Prep Strategy",
        "Junior Speech Adventurers",
        "Teen Conversation Club",
      ],
      formatOptions: [
        "Hybrid Classroom",
        "Offline Campus (In-Person)",
        "Online Classroom (Live Stream)",
      ],
      placeholder: {
        name: "Budi Santoso",
        phone: "+62 812 3456 7890",
        email: "budi@contoh.com",
        message:
          "Cth: Saya perlu skor IELTS 7.5 untuk pendaftaran universitas pada bulan September...",
      },
      submitText: "Kirim ke WhatsApp",
      successTitle: "Pertanyaan Terkirim!",
      successText:
         "Terima kasih! Data Anda telah terkirim. Kami akan menghubungi Anda segera.",
      successWhatsApp: "Percakapan WhatsApp telah terbuka — silakan kirim pesan Anda.",
      successBtn: "Kirim Pesan Lain",
      faqTag: "Pertanyaan Umum",
      faqTitle: "Pertanyaan yang Sering Diajukan",
      faqSubtitle:
        "Tidak menemukan jawaban yang Anda cari? Lihat FAQ kami di bawah.",
      faqs: [
        {
          q: "Bisakah saya berpindah antara kelas online dan offline setelah memulai?",
          a: "Tentu! Pengaturan Hybrid Classroom kami memungkinkan Anda mengganti kehadiran setiap minggu. Jika terdaftar di kelas hybrid, Anda bisa memilih hadir langsung di kampus atau bergabung secara remote tanpa biaya tambahan.",
        },
        {
          q: "Apakah semua pengajar memiliki sertifikasi ESL?",
          a: "Ya, 100% pengajar akademik kami memiliki sertifikasi mengajar (CELTA, DELTA, atau TEFL) dengan gelar universitas di bidang Linguistik Terapan, Sastra, atau Pendidikan.",
        },
        {
          q: "Apakah ada tes penempatan gratis sebelum pendaftaran?",
          a: "Ya! Kami mewajibkan semua calon siswa (kecuali level pemula) untuk mengikuti diagnostik bahasa komprehensif selama 15 menit, yang mengevaluasi tata bahasa, tulisan, dan kemampuan berbicara.",
        },
        {
          q: "Bagaimana sistem pembayaran cicilan?",
          a: "Kami menawarkan skema pembayaran fleksibel di mana biaya kuliah dapat dibagi menjadi tiga cicilan bulanan. Pendaftaran grup korporat juga dapat meminta faktur khusus.",
        },
      ],
    },
    programsPage: {
      tag: "Program Akademik",
      title: "Kursus dan Program",
      subtitle:
        "Temukan kursus yang sesuai dengan target kecepatan belajar, latar belakang, dan batasan jadwal Anda.",
      filters: ["Semua", "General", "Academic", "Professional", "Young Learners"],
      programs: [
        {
          title: "General English Mastery",
          description:
            "Kembangkan kefasihan, sempurnakan tata bahasa, dan perluas kosakata untuk interaksi sehari-hari. Ideal untuk membangun kemampuan komunikasi fundamental.",
          category: "General",
          format: "Online & Offline",
          level: "Semua Level (A1 - C2)",
          duration: "12 Minggu",
          price: "Rp 4.500.000",
          icon: "\u{1F4AC}",
        },
        {
          title: "IELTS Academic Prep Boost",
          description:
            "Kursus intensif yang menargetkan modul speaking, listening, reading, dan writing. Dilengkapi dengan mock test lengkap dan umpan balik esai personal.",
          category: "Academic",
          format: "Hybrid Classroom",
          level: "Menengah - Mahir",
          duration: "8 Minggu",
          price: "Rp 6.500.000",
          icon: "\u{1F393}",
        },
        {
          title: "Business Communication Pro",
          description:
            "Kuasi pola negosiasi, presentasi profesional, email, dan etiket berbicara korporat untuk berkembang di lingkungan bisnis global.",
          category: "Professional",
          format: "Sesi Online",
          level: "Upper Intermediate+",
          duration: "10 Minggu",
          price: "Rp 5.500.000",
          icon: "\u{1F4BC}",
        },
        {
          title: "TOEFL iBT Prep Strategy",
          description:
            "Pelatihan strategi tes terfokus yang menargetkan format berbasis komputer. Latihan template esai, waktu berbicara, dan catatan listening.",
          category: "Academic",
          format: "Kelas Online",
          level: "Menengah - Mahir",
          duration: "10 Minggu",
          price: "Rp 6.000.000",
          icon: "\u{1F4DD}",
        },
        {
          title: "Junior Speech Adventurers",
          description:
            "Pembelajaran bahasa Inggris interaktif dan gamifikasi untuk anak-anak. Berfokus pada kepercayaan diri berbicara, permainan ejaan, dan literasi dasar.",
          category: "Young Learners",
          format: "Offline Campus",
          level: "Usia 6 - 11 (Pemula)",
          duration: "16 Minggu",
          price: "Rp 3.800.000",
          icon: "\u{1F3A8}",
        },
        {
          title: "Teen Conversation Club",
          description:
            "Topik debat berenergi tinggi, permainan kosakata, dan presentasi kelompok yang dirancang untuk menghilangkan kecemasan berbicara di depan umum remaja.",
          category: "Young Learners",
          format: "Hybrid Class",
          level: "Usia 12 - 17 (Menengah)",
          duration: "12 Minggu",
          price: "Rp 4.200.000",
          icon: "\u{1F4E3}",
        },
      ],
      noResultsTitle: "Tidak ada program ditemukan",
      noResultsDesc:
        "Silakan periksa kembali nanti atau hubungi kami untuk jadwal khusus.",
    },
    testimonialsPage: {
      tag: "Kesuksesan Siswa",
      title: "Testimoni Siswa",
      subtitle:
        "Dengar cerita dari lulusan kami di seluruh dunia yang berhasil mencapai skor target dan transisi karier.",
      stats: [
        { value: "8.2 Rata-rata", label: "Skor IELTS Siswa" },
        { value: "94%", label: "Tingkat Kelulusan (Percobaan Pertama)" },
        { value: "4.9/5", label: "Kepuasan Siswa Rata-rata" },
      ],
      filters: [
        "Semua",
        "IELTS Prep",
        "Business English",
        "General English",
        "Kids & Teens",
      ],
      testimonials: [
        {
          name: "Sarah Connor",
          course: "IELTS Prep",
          rating: 5,
          quote:
            "Lexicon benar-benar mengubah metode persiapan saya. Saya mendapat skor 8.0! Tutors memberikan saran menulis yang luar biasa dan membimbing saya mengatur waktu.",
          initials: "SC",
        },
        {
          name: "Kenji Sato",
          course: "Business English",
          rating: 5,
          quote:
            "Kepercayaan diri saya saat presentasi ke klien global meningkat sepuluh kali lipat. Daftar kosakata bisnis dan negosiasi simulasi sangat praktis.",
          initials: "KS",
        },
        {
          name: "Elena Rostova",
          course: "General English",
          rating: 5,
          quote:
            "Struktur hybrid classroom cocok dengan jadwal saya yang padat. Pelajaran menarik, interaktif, dan tidak pernah membosankan.",
          initials: "ER",
        },
        {
          name: "Ahmed Al-Mansoori",
          course: "IELTS Prep",
          rating: 5,
          quote:
            "Saya butuh 7.5 untuk program master di Inggris. Para guru mengidentifikasi kelemahan listening dan writing saya dan membantu mencapai 7.5 hanya dalam enam minggu.",
          initials: "AA",
        },
        {
          name: "Linda Schmidt",
          course: "Business English",
          rating: 4,
          quote:
            "Materi sangat baik untuk etiket email dan negosiasi. Kami berlatih email bisnis dan kosakata yang sangat kontekstual dengan kebutuhan korporat.",
          initials: "LS",
        },
        {
          name: "Toby Miller",
          course: "Kids & Teens",
          rating: 5,
          quote:
            "Anak kami suka permainan offline dan tantangan berbicara. Dulu dia pemalu, sekarang dia ngobrol dalam bahasa Inggris tanpa ragu!",
          initials: "TM",
        },
      ],
    },
  },

  en: {
    nav: {
      brand: "Lexicon English",
      links: ["Home", "About Us", "Programs", "Testimonials", "Contact"],
      paths: ["/", "/about", "/programs", "/testimonials", "/contact"],
      cta: "Free Consultation",
      langToggle: "ID",
      whatsappMsg: "Hello! I'd like to consult about Lexicon English Academy programs.",
    },
    hero: {
      tagline: "Free Consultation via WhatsApp",
      titlePrefix: "Learn English ",
      titleHighlight: "Easily and Enjoyably",
      description:
        "Online and offline classes for children, teens, university students, and professionals. Master English communication, build academic confidence, and enhance your global career prospects with certified instructors.",
      btnPrimary: "Free WA Consultation",
      btnSecondary: "Info via WhatsApp",
      whatsappMsg: "Hello! I'm interested in Lexicon English Academy programs. Please provide information.",
      visualTitle: "Interactive Learning",
      visualSub: "Building English speaking confidence every day",
      stat1Value: "4.9 / 5.0",
      stat1Label: "Student Rating",
      stat2Value: "15,000+",
      stat2Label: "Active Students",
    },
    home: {
      features: {
        tag: "Our Advantages",
        title: "Effective Methods for Fluency",
        subtitle:
          "We combine internationally standardized curricula, certified expert teachers, and an interactive learning environment to guarantee improvement in your language skills.",
        cards: [
          {
            icon: "\u{1F468}\u{200D}\u{1F3EB}",
            title: "Best Native & Local Teachers",
            desc: "All our instructors hold international English teaching certifications (CELTA/TEFL) with an average teaching experience of over 5 years.",
          },
          {
            icon: "\u23F0",
            title: "Very Flexible Class Schedules",
            desc: "Choose the study schedule that best fits your daily activities, from regular evening classes to intensive weekend sessions.",
          },
          {
            icon: "\u{1F4BB}",
            title: "Hybrid Blended Learning Method",
            desc: "Attend our modern classrooms in the city center in person, or join via interactive live streaming from anywhere.",
          },
        ],
      },
      programs: {
        tag: "Popular Programs",
        title: "Choose the Right Class",
        subtitle:
          "Find the best course programs specifically designed to meet your self-development, academic, and professional career needs.",
        cards: [
          {
            title: "English for Children",
            description:
              "An interactive and fun program to build basic vocabulary, pronunciation, and speaking confidence from an early age.",
            category: "Kids & Teens",
            format: "Offline in Class",
            level: "Ages 6 - 11 (Beginner)",
            duration: "16 Weeks",
            price: "$299",
            icon: "\u{1F3A8}",
          },
          {
            title: "English for Teens",
            description:
              "Interactive discussion classes with exciting topics and presentation practice to reduce anxiety and improve teen speaking fluency.",
            category: "Kids & Teens",
            format: "Hybrid Class",
            level: "Ages 12 - 17 (Intermediate)",
            duration: "12 Weeks",
            price: "$349",
            icon: "\u{1F4E3}",
          },
          {
            title: "TOEFL iBT Preparation",
            description:
              "Intensive strategies for the computer-based TOEFL test. Complete writing templates, speaking techniques, and listening success keys.",
            category: "Academic",
            format: "Online Class",
            level: "Intermediate - Advanced",
            duration: "10 Weeks",
            price: "$499",
            icon: "\u{1F4DD}",
          },
        ],
        btnText: "View All Class Programs",
      },
      stats: [
        { value: "98%", label: "Pass Rate" },
        { value: "120+", label: "Certified Teachers" },
        { value: "15,000+", label: "Successful Alumni" },
        { value: "15+", label: "Years of Experience" },
      ],
      testimonials: {
        tag: "Student Testimonials",
        title: "Our Alumni Success Stories",
        subtitle:
          "Join thousands of students who have successfully achieved their goals and career advancement with Lexicon English Academy.",
        cards: [
          {
            name: "Budi Santoso",
            course: "IELTS Preparation",
            rating: 5,
            quote:
              "Studying at Lexicon truly changed how I prepare for tests. I managed to get a band score of 8.0! The feedback from teachers was very insightful.",
            initials: "BS",
          },
          {
            name: "Fitriani",
            course: "Professional Business Communication",
            rating: 5,
            quote:
              "My confidence when presenting to foreign clients has increased dramatically. The business vocabulary practice here is very applicable.",
            initials: "FT",
          },
          {
            name: "Rian Hidayat",
            course: "English for Adults",
            rating: 5,
            quote:
              "The hybrid class schedule makes it very easy for me who is busy working. The classes are active, interesting, and not boring at all.",
            initials: "RH",
          },
        ],
        btnText: "View All Student Reviews",
      },
    },
    cta: {
      default: {
        title: "Ready to Speak English Confidently?",
        description:
          "Join our class programs now. Get a free placement diagnostic test and a trial class session.",
        primaryText: "Free Class Consultation",
        secondaryText: "View All Programs",
      },
      about: {
        title: "Ready to Start Your Learning Journey?",
        description:
          "Contact our consultants today and find the learning program that best suits your needs.",
      },
    },
    footer: {
      brand: "Lexicon",
      brandHighlight: "English",
      description:
        "Lexicon English Academy offers premium quality English course programs online and offline designed to improve fluency, prepare for academic success, and accelerate your career advancement.",
      socialAria: { fb: "Facebook", ig: "Instagram", tw: "Twitter", ln: "LinkedIn" },
      quickLinksTitle: "Quick Links",
      quickLinks: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Course Programs", path: "/programs" },
        { name: "Student Testimonials", path: "/testimonials" },
        { name: "Contact Us", path: "/contact" },
      ],
      programsTitle: "Our Programs",
      programLinks: [
        { name: "General English", path: "/programs" },
        { name: "Business English", path: "/programs" },
        { name: "IELTS Preparation", path: "/programs" },
        { name: "TOEFL iBT Preparation", path: "/programs" },
        { name: "English for Children", path: "/programs" },
      ],
      newsletterTitle: "Stay Updated",
      newsletterText:
        "Subscribe to our newsletter for learning tips, class update information, and exclusive discount offers.",
      newsletterPlaceholder: "Your Email Address",
      newsletterBtn: "Subscribe",
      newsletterSuccess:
        "Thank you! You have successfully subscribed to our newsletter.",
      copyright: "Lexicon English Academy. All Rights Reserved.",
      bottomLinks: [
        { name: "Privacy Policy", path: "#" },
        { name: "Terms and Conditions", path: "#" },
        { name: "Cookie Policy", path: "#" },
      ],
    },
    about: {
      tag: "About Us",
      title: "Helping You Master English",
      subtitle:
        "We help overcome language barriers through modern, effective English education accessible both online and in person.",
      storyTitle: "Our Story and Mission",
      storyParagraphs: [
        "Founded in 2012, Lexicon English Academy began its journey with one classroom and a belief that language learning should not just be about memorizing grammar rules. Learning a language should be an active, enjoyable, and relevant experience to real life.",
        "Today, Lexicon operates several learning centers and a modern online class platform serving students from various regions and backgrounds, from students to professionals.",
        "Our mission remains the same: providing practical, high-quality English education and helping every student speak confidently, clearly, and effectively.",
      ],
      visualPaneTitle: "Since 2012",
      visualPaneDesc:
        "Over a decade of delivering quality English education.",
      valuesTitle: "Our Values",
      values: [
        {
          icon: "\u{1F3AF}",
          title: "Goal-Oriented Curriculum",
          desc: "Each learning program is designed to achieve clear language target competencies, according to CEFR standards and IELTS/TOEFL preparation.",
        },
        {
          icon: "\u{1F91D}",
          title: "Interactive Learning Environment",
          desc: "We create an active and communicative learning atmosphere, both in online and face-to-face classes, so students get used to using English in real life.",
        },
        {
          icon: "\u{1F4C8}",
          title: "Regular Progress Monitoring",
          desc: "Routine evaluations and progress reports help monitor improvements in speaking, grammar, pronunciation, and vocabulary of each student.",
        },
      ],
      campusTag: "Learning Facilities",
      campusTitle: "Comfortable Learning Spaces",
      campusSubtitle:
        "Enjoy modern learning facilities whether studying directly in class or online from home.",
      campuses: [
        {
          icon: "\u{1F3E2}",
          name: "Downtown Campus",
          desc: "Our main branch with 12 multimedia classrooms, comfortable study areas, a language laboratory, and easy transportation access.",
        },
        {
          icon: "\u{1F3EB}",
          name: "North Campus",
          desc: "A spacious and family-friendly learning environment, equipped with a dedicated children's zone and interactive learning technology.",
        },
        {
          icon: "\u{1F4BB}",
          name: "Virtual Campus",
          desc: "A modern online learning platform supporting live classes, interactive discussion rooms, and complete digital materials.",
        },
      ],
      teachersTag: "Teaching Team",
      teachersTitle: "Meet Our Teachers",
      teachersSubtitle:
        "Learn with experienced instructors committed to helping you achieve your best English skills.",
      teachers: [
        {
          initials: "AB",
          name: "Arthur Pendelton",
          role: "IELTS Coach & Native Tutor",
          bio: "Arthur holds a Master's degree in Applied Linguistics from Oxford and has over 8 years of experience guiding students to achieve IELTS scores of 8.0 and above.",
        },
        {
          initials: "MJ",
          name: "Maria Jenkins",
          role: "Business English Consultant",
          bio: "Specialist in English for the professional world. Experienced in training management teams in the technology, finance, and manufacturing sectors.",
        },
        {
          initials: "DK",
          name: "David Kim",
          role: "TOEFL iBT Specialist",
          bio: "Former TOEFL examiner focusing on speaking and writing strategies to help students effectively improve their scores.",
        },
        {
          initials: "SH",
          name: "Sophia Hernandez",
          role: "Children's English Instructor",
          bio: "TEFL certified with a specialization in children's learning. Expert in creating fun and interactive online classes.",
        },
      ],
    },
    contact: {
      tag: "Get In Touch",
      title: "Contact Our Academy",
      subtitle:
        "Ready to enhance your English language capabilities? Drop us a line below or request a counselor callback.",
      infoTitle: "Contact Details",
      infoIntro:
        "Visit our physical downtown headquarters, call our support agents, or email us. Our academic advisors are always happy to help.",
      infos: [
        {
          icon: "\u{1F4CD}",
          title: "Our Campus Headquarters",
          val: "Lexicon Tower, 4th Floor\nJl. Pendidikan No. 10\nCentral Jakarta 10110",
        },
        {
          icon: "\u{1F4DE}",
          title: "Direct Admissions Lines",
          val: "WhatsApp: 0812-3456-7890\nTel: (021) 1234-5678",
        },
        {
          icon: "\u2709\uFE0F",
          title: "General Support Email",
          val: "admissions@lexicon-academy.com\nstudent-services@lexicon-academy.com",
        },
        {
          icon: "\u23F0",
          title: "Consultation Hours",
          val: "Monday - Friday: 08:00 AM - 09:00 PM\nSaturday: 09:00 AM - 05:00 PM\nSunday: Closed",
        },
      ],
      formTitle: "Request Course Consultation",
      formSub:
        "Submit your details to calculate your fees or request a free diagnostic trial session.",
      labels: {
        name: "Full Name",
        phone: "Phone Number",
        email: "Email Address",
        program: "Preferred Program",
        format: "Class Format",
        message: "Tell us about your learning goals",
      },
      programOptions: [
        "General English Mastery",
        "IELTS Academic Prep Boost",
        "Business Communication Pro",
        "TOEFL iBT Prep Strategy",
        "Junior Speech Adventurers",
        "Teen Conversation Club",
      ],
      formatOptions: [
        "Hybrid Classroom",
        "Offline Campus (In-Person)",
        "Online Classroom (Live Stream)",
      ],
      placeholder: {
        name: "John Doe",
        phone: "+1 (555) 0123",
        email: "john@example.com",
        message:
          "E.g., I need to get IELTS score 7.5 for university admissions by September...",
      },
      submitText: "Send via WhatsApp",
      successTitle: "Inquiry Sent Successfully!",
      successText:
         "Thank you! Your data has been sent. We will contact you shortly.",
      successWhatsApp: "A WhatsApp conversation has opened — please send your message.",
      successBtn: "Send Another Message",
      faqTag: "Common Inquiries",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle:
        "Can't find the answer you're looking for? Check our helpful FAQ summaries below.",
      faqs: [
        {
          q: "Can I swap between online and offline classes after starting?",
          a: "Absolutely! Our Hybrid Classroom setup allows you to switch your attendance weekly. If you are registered in a hybrid class, you can choose to join our physical campus classrooms in person or dial into the live session streams remotely without extra charges.",
        },
        {
          q: "Do all teachers hold certified ESL credentials?",
          a: "Yes, 100% of our academic educators hold certified teaching credentials (CELTA, DELTA, or TEFL) with university degrees in Applied Linguistics, Literature, or Education.",
        },
        {
          q: "Is there a free level diagnostic before enrollment?",
          a: "Yes! We require all prospective students (except beginner levels) to complete our comprehensive 15-minute language diagnostic, which evaluates grammar, written output, and speaking skills.",
        },
        {
          q: "How does the installment billing program function?",
          a: "We offer flexible payment schemes where tuition can be split into three monthly installments. Corporate group enrollments can also request customized invoices.",
        },
      ],
    },
    programsPage: {
      tag: "Academic Pathways",
      title: "Courses and Programs",
      subtitle:
        "Find the course that matches your target learning speed, background level, and scheduling constraints.",
      filters: ["All", "General", "Academic", "Professional", "Young Learners"],
      programs: [
        {
          title: "General English Mastery",
          description:
            "Develop fluency, perfect grammar, and expand vocabulary for everyday interactions. Ideal for building fundamental communicative skills.",
          category: "General",
          format: "Online & Offline",
          level: "All Levels (A1 - C2)",
          duration: "12 Weeks",
          price: "$299",
          icon: "\u{1F4AC}",
        },
        {
          title: "IELTS Academic Prep Boost",
          description:
            "Intensive course targeting speaking, listening, reading, and writing modules. Complete with full mock tests and personalized essay feedback.",
          category: "Academic",
          format: "Hybrid Classroom",
          level: "Intermediate - Advanced",
          duration: "8 Weeks",
          price: "$450",
          icon: "\u{1F393}",
        },
        {
          title: "Business Communication Pro",
          description:
            "Master negotiation patterns, professional presentations, emails, and corporate speaking etiquette to thrive in global business settings.",
          category: "Professional",
          format: "Online Sessions",
          level: "Upper Intermediate+",
          duration: "10 Weeks",
          price: "$399",
          icon: "\u{1F4BC}",
        },
        {
          title: "TOEFL iBT Prep Strategy",
          description:
            "Focused test strategy coaching targeting the computer-based format. Practice essay templates, speaking timings, and listening notes.",
          category: "Academic",
          format: "Online Classes",
          level: "Intermediate - Advanced",
          duration: "10 Weeks",
          price: "$420",
          icon: "\u{1F4DD}",
        },
        {
          title: "Junior Speech Adventurers",
          description:
            "Interactive and gamified English learning for children. Focuses on speaking confidence, spelling games, and baseline literacy.",
          category: "Young Learners",
          format: "Offline Campus",
          level: "Ages 6 - 11 (Beginner)",
          duration: "16 Weeks",
          price: "$250",
          icon: "\u{1F3A8}",
        },
        {
          title: "Teen Conversation Club",
          description:
            "High-energy debate topics, vocabulary games, and group presentations designed to make teenager public speaking anxiety vanish.",
          category: "Young Learners",
          format: "Hybrid Class",
          level: "Ages 12 - 17 (Intermediate)",
          duration: "12 Weeks",
          price: "$280",
          icon: "\u{1F4E3}",
        },
      ],
      noResultsTitle: "No programs found",
      noResultsDesc:
        "Please check back later or contact us for custom schedules.",
    },
    testimonialsPage: {
      tag: "Student Success",
      title: "Student Testimonials",
      subtitle:
        "Hear from our graduates worldwide who achieved their target band scores and career transitions.",
      stats: [
        { value: "8.2 Avg.", label: "IELTS Student Score" },
        { value: "94%", label: "Pass Rate (First Attempt)" },
        { value: "4.9/5", label: "Average Student Satisfaction" },
      ],
      filters: ["All", "IELTS Prep", "Business English", "General English", "Kids & Teens"],
      testimonials: [
        {
          name: "Sarah Connor",
          course: "IELTS Prep",
          rating: 5,
          quote:
            "Lexicon completely changed my prep method. I scored an 8.0 overall band score! The tutors gave incredible writing suggestions and guided me on managing time.",
          initials: "SC",
        },
        {
          name: "Kenji Sato",
          course: "Business English",
          rating: 5,
          quote:
            "My confidence presenting to global clients has grown tenfold. The business vocabulary lists and simulated negotiations were highly practical.",
          initials: "KS",
        },
        {
          name: "Elena Rostova",
          course: "General English",
          rating: 5,
          quote:
            "The hybrid classroom structure matches my hectic itinerary. Lessons are engaging, interactive, and never boring. My speaking speed improved massively.",
          initials: "ER",
        },
        {
          name: "Ahmed Al-Mansoori",
          course: "IELTS Prep",
          rating: 5,
          quote:
            "I needed a 7.5 to get into my masters program in the UK. The teachers pinpointed my listening and writing gaps and helped me reach a 7.5 within just six weeks.",
          initials: "AA",
        },
        {
          name: "Linda Schmidt",
          course: "Business English",
          rating: 4,
          quote:
            "Excellent material for email etiquette and negotiations. We practiced business emails and vocabulary that were highly contextualized to corporate needs.",
          initials: "LS",
        },
        {
          name: "Toby Miller",
          course: "Kids & Teens",
          rating: 5,
          quote:
            "Our son loves the offline games and speaking challenges. He used to be shy, but now he chats in English without hesitation! Best decision we made.",
          initials: "TM",
        },
      ],
    },
  },
};

export default translations;
