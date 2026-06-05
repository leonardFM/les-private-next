const translations = {
  id: {
    nav: {
      brand: "El's Corner",
      links: ["Beranda", "Tentang Kami", "Program", "English for Kids", "Testimoni", "Kontak"],
      paths: ["/", "/about", "/programs", "/kids-private", "/testimonials", "/contact"],
      cta: "Konsultasi Gratis",
      langToggle: "EN",
      whatsappMsg: "Halo! Saya ingin konsultasi tentang program les di El's Corner.",
    },
    hero: {
      tagline: "Konsultasi Gratis via WhatsApp",
      titlePrefix: "Belajar Bahasa Inggris dengan ",
      titleHighlight: "Mudah dan Menyenangkan",
      description:
        "Kelas online dan offline untuk anak, remaja, mahasiswa, dan profesional. Kuasai komunikasi bahasa Inggris, bangun kepercayaan diri akademis, dan tingkatkan prospek karier global Anda bersama pengajar bersertifikasi.",
      btnPrimary: "Konsultasi Gratis via WA",
      btnSecondary: "Info Program via WA",
      whatsappMsg: "Halo! Saya tertarik dengan program les di El's Corner. Mohon informasinya.",
      visualTitle: "Pembelajaran Interaktif",
      visualSub: "Meningkatkan rasa percaya diri berbahasa setiap hari",
      stat1Value: "4.9 / 5.0",
      stat1Label: "Rating Siswa",
      stat2Value: "15.000+",
      stat2Label: "Siswa Aktif",
    },
    home: {
      banner: {
        tag: "Program Spesial",
        title: "English for Kids",
        subtitle: "Les bahasa Inggris khusus anak usia 4–12 tahun dengan metode fun learning. Bangun kepercayaan diri berbahasa Inggris sejak dini!",
        cta: "Lihat Program English for Kids",
        path: "/kids-private",
        bgEmoji: "\u{1F476}",
      },
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
          "Bergabunglah dengan ribuan siswa yang telah berhasil meraih cita-cita dan kemajuan karier bersama El's Corner.",
        cards: [
          {
            name: "Budi Santoso",
            course: "Persiapan IELTS",
            rating: 5,
            quote:
              "Belajar di El's Corner benar-benar mengubah cara saya mempersiapkan tes. Saya berhasil mendapatkan skor band 8.0! Masukan dari para pengajar sangat mendalam.",
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
      brand: "El's Corner",
      brandHighlight: "English",
      description:
        "El's Corner menawarkan program kursus bahasa Inggris berkualitas premium secara online dan offline yang dirancang untuk meningkatkan kefasihan, mempersiapkan kesuksesan akademik, dan mempercepat kemajuan karier Anda.",
      socialAria: { fb: "Facebook", ig: "Instagram", tw: "Twitter", ln: "LinkedIn" },
      quickLinksTitle: "Tautan Cepat",
      quickLinks: [
        { name: "Beranda", path: "/" },
        { name: "Tentang Kami", path: "/about" },
        { name: "Program Kursus", path: "/programs" },
        { name: "English for Kids", path: "/kids-private" },
        { name: "Testimoni Siswa", path: "/testimonials" },
        { name: "Hubungi Kami", path: "/contact" },
      ],
      programsTitle: "Program Kami",
      programLinks: [
        { name: "Bahasa Inggris Umum", path: "/programs" },
        { name: "Bahasa Inggris Bisnis", path: "/programs" },
        { name: "Persiapan IELTS", path: "/programs" },
        { name: "Persiapan TOEFL iBT", path: "/programs" },
        { name: "English for Kids", path: "/kids-private" },
      ],
      newsletterTitle: "Tetap Terupdate",
      newsletterText:
        "Berlangganan newsletter kami untuk mendapatkan tips belajar, informasi pembaruan kelas, serta penawaran diskon eksklusif.",
      newsletterPlaceholder: "Alamat Email Anda",
      newsletterBtn: "Gabung",
      newsletterSuccess:
        "Terima kasih! Anda telah berhasil berlangganan newsletter kami.",
      copyright: "El's Corner. Hak Cipta Dilindungi Undang-Undang.",
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
        "Berdiri sejak tahun 2012, El's Corner memulai perjalanan dengan satu ruang kelas dan sebuah keyakinan bahwa belajar bahasa tidak seharusnya hanya menghafal aturan tata bahasa. Belajar bahasa harus menjadi pengalaman yang aktif, menyenangkan, dan relevan dengan kehidupan nyata.",
        "Saat ini, El's Corner mengoperasikan beberapa pusat pembelajaran serta platform kelas online modern yang melayani siswa dari berbagai daerah dan latar belakang, mulai dari pelajar hingga profesional.",
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
          val: "El's Corner Tower, Lantai 4\nJl. Pendidikan No. 10\nJakarta Pusat 10110",
        },
        {
          icon: "\u{1F4DE}",
          title: "Nomor Telepon",
          val: "WhatsApp: 0812-3456-7890\nTel: (021) 1234-5678",
        },
        {
          icon: "\u2709\uFE0F",
          title: "Email Dukungan",
          val: "info@els-corner.com\nadmin@els-corner.com",
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
      filters: ["Semua", "General", "Academic", "Professional", "Young Learners", "Kids"],
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
        {
          title: "English for Kids",
          description:
            "Program bahasa Inggris khusus anak usia 4\u201312 tahun dengan metode fun learning, gamifikasi, dan pengajar berpengalaman.",
          category: "Kids",
          format: "Online & Offline",
          level: "Usia 4 - 12 Tahun",
          duration: "16 Minggu",
          price: "Rp 3.500.000",
          icon: "\u{1F476}",
        },
      ],
      noResultsTitle: "Tidak ada program ditemukan",
      noResultsDesc:
        "Silakan periksa kembali nanti atau hubungi kami untuk jadwal khusus.",
    },
    kidsPage: {
      hero: {
        tag: "English for Kids",
        title: "Les Bahasa Inggris \u2013",
        titleHighlight: "Fun & Interactive",
        subtitle: "Program les bahasa Inggris khusus anak usia 4\u201312 tahun dengan metode belajar yang menyenangkan, interaktif, dan penuh permainan.",
        btnPrimary: "Konsultasi via WA",
        btnSecondary: "Info Program",
        stats: [
          { value: "4\u201312", label: "Tahun" },
          { value: "Fun", label: "Learning" },
          { value: "Native", label: "Teachers" },
          { value: "Online", label: "& Offline" },
        ],
      },
      advantages: {
        tag: "Keunggulan Program",
        title: "Mengapa English for Kids?",
        subtitle: "Program dirancang khusus untuk perkembangan bahasa anak usia dini dengan pendekatan yang menyenangkan.",
        cards: [
          {
            icon: "\u{1F3B6}",
            title: "Belajar Sambil Bernyanyi",
            desc: "Metode pembelajaran dengan lagu, irama, dan gerakan yang membantu anak mengingat kosakata dengan lebih mudah.",
          },
          {
            icon: "\u{1F3AE}",
            title: "Gamifikasi Interaktif",
            desc: "Permainan edukatif dan kuis interaktif yang membuat anak antusias belajar tanpa merasa tertekan.",
          },
          {
            icon: "\u{1F468}\u200D\u{1F3EB}",
            title: "Pengajar Berpengalaman",
            desc: "Instruktur bersertifikat TEFL yang ahli dalam mengajar bahasa Inggris untuk anak-anak.",
          },
          {
            icon: "\u{1F4F1}",
            title: "Akses Aplikasi Belajar",
            desc: "Aplikasi mobile untuk latihan mandiri di rumah dengan materi yang sinkron dengan kurikulum kelas.",
          },
          {
            icon: "\u{1F4DA}",
            title: "Kurikulum Internasional",
            desc: "Mengacu pada standar CEFR dan Cambridge Young Learners English (YLE) test.",
          },
          {
            icon: "\u{1F91D}",
            title: "Kelas Kelompok Kecil",
            desc: "Maksimal 4\u20136 siswa per kelas sehingga perhatian guru lebih fokus pada setiap anak.",
          },
        ],
      },
      methods: {
        tag: "Metode Belajar",
        title: "Pendekatan Belajar Terbukti Efektif",
        subtitle: "Kami menggunakan metode pembelajaran yang telah teruji untuk anak-anak.",
        steps: [
          {
            icon: "\u{1F3A4}",
            step: "01",
            title: "Listen & Repeat",
            desc: "Anak mendengarkan pelafalan native speaker dan mengulanginya, membangun kebiasaan pengucapan yang benar sejak awal.",
          },
          {
            icon: "\u{1F3B2}",
            step: "02",
            title: "Play & Learn",
            desc: "Belajar melalui permainan papan, kartu kosakata, dan aktivitas fisik yang merangsang daya ingat.",
          },
          {
            icon: "\u{1F3AD}",
            step: "03",
            title: "Role Play",
            desc: "Bermain peran dalam situasi sehari-hari seperti berbelanja, di taman, atau di restoran.",
          },
          {
            icon: "\u{1F4C1}",
            step: "04",
            title: "Project-Based",
            desc: "Proyek kreatif mingguan seperti membuat poster, cerita bergambar, atau pertunjukan pendek.",
          },
        ],
      },
      materials: {
        tag: "Materi Pembelajaran",
        title: "Yang Akan Dipelajari Anak Anda",
        subtitle: "Kurikulum komprehensif yang mencakup seluruh aspek dasar bahasa Inggris.",
        items: [
          {
            icon: "\u{1F1E6}\u{1F1FF}",
            title: "Alphabet & Phonics",
            desc: "Pengenalan huruf, bunyi, dan cara membaca dasar (phonics).",
          },
          {
            icon: "\u{1F4CB}",
            title: "Vocabulary Building",
            desc: "Kosakata sehari-hari: angka, warna, hewan, makanan, anggota keluarga, dan benda di sekitar.",
          },
          {
            icon: "\u{1F5E3}\uFE0F",
            title: "Simple Conversation",
            desc: "Percakapan sederhana seperti sapaan, perkenalan diri, dan ungkapan sehari-hari.",
          },
          {
            icon: "\u{1F4D6}",
            title: "Storytelling",
            desc: "Membaca dan menceritakan kembali cerita pendek bergambar untuk melatih pemahaman.",
          },
          {
            icon: "\u{270D}\uFE0F",
            title: "Basic Writing",
            desc: "Menulis huruf, kata, dan kalimat pendek dengan panduan yang menyenangkan.",
          },
          {
            icon: "\u{1F399}\uFE0F",
            title: "Listening & Speaking",
            desc: "Latihan mendengarkan dan berbicara untuk membangun kepercayaan diri.",
          },
        ],
      },
      ages: {
        tag: "Rentang Usia",
        title: "Program Berdasarkan Kelompok Usia",
        subtitle: "Kurikulum disesuaikan dengan tahap perkembangan kognitif dan motorik anak.",
        groups: [
          {
            age: "4\u20136 Tahun",
            title: "Little Stars",
            desc: "Fokus pada pengenalan bahasa melalui lagu, gerakan, dan permainan sensori. Membangun kosakata dasar dan kebiasaan mendengarkan bahasa Inggris.",
            color: "var(--accent-color)",
          },
          {
            age: "7\u20139 Tahun",
            title: "Bright Learners",
            desc: "Pembelajaran lebih terstruktur dengan membaca dasar, menulis kata sederhana, dan percakapan pendek. Mulai mengenal tata bahasa dasar.",
            color: "var(--secondary-color)",
          },
          {
            age: "10\u201312 Tahun",
            title: "Young Achievers",
            desc: "Mengembangkan kefasihan berbicara, pemahaman bacaan, dan kemampuan menulis paragraf pendek. Persiapan untuk level remaja.",
            color: "var(--primary-light)",
          },
        ],
      },
      whyUs: {
        tag: "Mengapa Memilih Kami",
        title: "Mengapa Orang Tua Mempercayai Kami",
        subtitle: "Kami berkomitmen memberikan pengalaman belajar bahasa Inggris terbaik untuk anak Anda.",
        reasons: [
          {
            icon: "\u{1F3C6}",
            title: "15+ Tahun Pengalaman",
            desc: "Telah dipercaya ribuan orang tua sejak 2012 dalam mendidik bahasa Inggris anak.",
          },
          {
            icon: "\u{1F393}",
            title: "Sertifikasi Internasional",
            desc: "Kurikulum selaras dengan standar Cambridge Young Learners English (YLE).",
          },
          {
            icon: "\u{1F4F1}",
            title: "Laporan Perkembangan",
            desc: "Orang tua mendapatkan laporan perkembangan anak secara berkala setiap bulan.",
          },
          {
            icon: "\u{1F3E0}",
            title: "Belajar dari Rumah",
            desc: "Tersedia kelas online yang memudahkan anak belajar dari kenyamanan rumah.",
          },
          {
            icon: "\u{1F4B0}",
            title: "Harga Terjangkau",
            desc: "Biaya kursus yang kompetitif dengan berbagai pilihan paket dan cicilan.",
          },
          {
            icon: "\u{1F4DE}",
            title: "Konsultasi Gratis",
            desc: "Konsultasi via WhatsApp untuk membantu memilih program yang tepat untuk anak Anda.",
          },
        ],
      },
      testimonials: {
        tag: "Testimoni Orang Tua",
        title: "Apa Kata Orang Tua Siswa",
        subtitle: "Dengarkan cerita dari orang tua yang telah mempercayakan pendidikan bahasa Inggris anak mereka kepada kami.",
        cards: [
          {
            name: "Anita Wijaya",
            childAge: "Anak usia 6 tahun",
            rating: 5,
            quote: "Anak saya jadi sangat percaya diri bicara bahasa Inggris. Metode belajarnya menyenangkan, setiap hari selalu semangat ikut kelas!",
            initials: "AW",
          },
          {
            name: "Rudi Hartono",
            childAge: "Anak usia 9 tahun",
            rating: 5,
            quote: "Awalnya anak kami pemalu, tapi setelah 2 bulan di English for Kids, dia mulai berani ngobok pakai bahasa Inggris. Terima kasih El's Corner!",
            initials: "RH",
          },
          {
            name: "Sari Dewi",
            childAge: "Anak usia 11 tahun",
            rating: 5,
            quote: "Kurikulumnya sangat terstruktur. Saya lihat perkembangan kosakata dan tata bahasa anak saya meningkat pesat setiap bulannya.",
            initials: "SD",
          },
        ],
      },
      faqs: {
        tag: "FAQ",
        title: "Pertanyaan Umum English for Kids",
        subtitle: "Temukan jawaban untuk pertanyaan yang sering diajukan tentang program English for Kids.",
        items: [
          {
            q: "Apakah anak saya perlu memiliki dasar bahasa Inggris?",
            a: "Tidak perlu. Program English for Kids dirancang untuk semua level, termasuk anak yang baru pertama kali belajar bahasa Inggris. Pengajar kami akan menyesuaikan metode dengan kemampuan masing-masing anak.",
          },
          {
            q: "Berapa lama durasi setiap sesi kelas?",
            a: "Setiap sesi berlangsung selama 45\u201360 menit, disesuaikan dengan rentang usia dan kapasitas konsentrasi anak.",
          },
          {
            q: "Apakah tersedia kelas online?",
            a: "Ya, kami menyediakan kelas online interaktif via Zoom dengan materi dan permainan digital yang tetap seru dan engaging untuk anak.",
          },
          {
            q: "Bagaimana sistem pembayaramnya?",
            a: "Biaya program dapat dibayarkan secara penuh di awal atau dicicil bulanan. Kami juga menyediakan paket trial selama 4 sesi.",
          },
          {
            q: "Apakah anak saya akan mendapatkan sertifikat?",
            a: "Ya, setiap siswa akan mendapatkan sertifikat kelulusan di akhir program sebagai bentuk apresiasi dan motivasi.",
          },
        ],
      },
      cta: {
        title: "Daftarkan Anak Anda Sekarang!",
        description: "Konsultasi gratis via WhatsApp untuk mengetahui program English for Kids yang paling sesuai untuk buah hati Anda. Gratis sesi trial!",
        btnText: "Konsultasi Gratis via WA",
      },
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
            "El's Corner benar-benar mengubah metode persiapan saya. Saya mendapat skor 8.0! Tutors memberikan saran menulis yang luar biasa dan membimbing saya mengatur waktu.",
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
    kids: {
      hero: {
        tag: "Les Privat 1-on-1 • Usia 4-8 Tahun",
        title: "Tempat Belajar yang ",
        titleHighlight: "Anak-Anak Suka",
        desc: "Les privat interaktif yang membuat anak jatuh cinta dengan belajar. Metode menyenangkan, tutor sabar, hasil nyata.",
        btnWA: "Chat Via WhatsApp",
        btnTrial: "Coba Trial Gratis",
        msgWA: "Halo! Saya tertarik dengan program les privat untuk anak usia 4-8 tahun. Mohon informasinya.",
        msgTrial: "Halo! Saya ingin coba Trial Class gratis untuk anak saya.",
        metric1: "Orang Tua Percaya",
        metric1Val: "15.000+",
        metric2: "Rating",
        metric2Val: "4.9",
        metric2Icon: "⭐",
        metric3: "Tutor Sertifikasi",
        metric3Val: "Terpercaya",
      },
      programs: {
        tag: "Program Belajar",
        title: "Dunia Belajar Si Kecil",
        sub: "Setiap program dirancang khusus untuk membuat anak jatuh cinta dengan belajar.",
        cards: [
          { title: "Membaca & Menulis", icon: "📖", desc: "Belajar membaca dan menulis lewat cerita seru dan permainan kata yang membuat anak jatuh cinta pada buku." },
          { title: "Matematika Dasar", icon: "🔢", desc: "Mengenal angka dan berhitung jadi petualangan mengasyikkan dengan metode montessori interaktif." },
          { title: "Kreativitas & Seni", icon: "🎨", desc: "Mengembangkan imajinasi lewat menggambar, mewarnai, dan crafting yang merangsang kreativitas." },
          { title: "Fokus & Percaya Diri", icon: "🦋", desc: "Bangun fokus dan kemandirian anak lewat aktivitas yang meningkatkan rasa percaya diri." },
        ],
        btnWA: "Konsultasi via WA",
      },
      journey: {
        tag: "Cara Belajar",
        title: "3 Langkah Sederhana",
        sub: "Mulai perjalanan belajar si kecil dengan mudah.",
        steps: [
          { num: "01", title: "Konsultasi Kebutuhan", desc: "Kami ngobrol santai untuk mengenal si kecil, gaya belajarnya, dan apa yang membuatnya semangat." },
          { num: "02", title: "Pilih Tutor Terbaik", desc: "Kami pasangkan tutor yang paling cocok dengan kepribadian dan minat belajar anak Anda." },
          { num: "03", title: "Mulai Petualangan", desc: "Anak belajar dalam suasana nyaman, penuh tawa, dan selalu dinantikan setiap sesinya." },
        ],
      },
      gallery: {
        tag: "Aktivitas Anak",
        title: "Serunya Belajar Bareng Kami",
        sub: "Dokumentasi keseruan anak-anak belajar di setiap sesi.",
      },
      testimonials: {
        tag: "Testimonial",
        title: "Kata Mereka yang Telah Percaya",
        sub: "Pengalaman nyata dari orang tua murid kami.",
        cards: [
          { name: "Ibu Sarah", child: "Alea, 6 tahun", quote: "Alea jadi percaya diri banget! Metode belajarnya seru, dia selalu semangat nunggu jadwal les." },
          { name: "Ayah Dimas", child: "Raka, 5 tahun", quote: "Raka yang dulu susah fokus, sekarang bisa duduk tenang dan menikmati belajar. Luar biasa!" },
          { name: "Ibu Maya", child: "Kiki, 4 tahun", quote: "Kiki yang hiperaktif jadi bisa fokus 30 menit. Tutornya sabar dan kreatif banget!" },
        ],
      },
      faq: {
        tag: "FAQ",
        title: "Pertanyaan Umum",
        sub: "Temukan jawaban untuk pertanyaan yang sering ditanyakan.",
        items: [
          { q: "Berapa usia minimal untuk mengikuti program?", a: "Program kami dirancang untuk anak usia 4-8 tahun." },
          { q: "Bagaimana sistem pembelajarannya?", a: "Kami menggunakan metode 1-on-1 dengan tutor berpengalaman yang disesuaikan dengan gaya belajar anak." },
          { q: "Apakah ada trial class?", a: "Ya! Kami menyediakan trial class gratis untuk memastikan anak Anda cocok dengan metode kami." },
        ],
      },
      cta: {
        tag: "Mulai Sekarang",
        title: "Berikan yang Terbaik untuk Si Kecil",
        desc: "Daftar sekarang & dapatkan sesi trial gratis. Temukan bagaimana metode kami bisa membuat anak Anda jatuh cinta dengan belajar.",
        btn: "Chat Via WhatsApp",
      },
    },
  },

  en: {
    nav: {
      brand: "El's Corner",
      links: ["Home", "About Us", "Programs", "English for Kids", "Testimonials", "Contact"],
      paths: ["/", "/about", "/programs", "/kids-private", "/testimonials", "/contact"],
      cta: "Free Consultation",
      langToggle: "ID",
      whatsappMsg: "Hello! I'd like to consult about El's Corner programs.",
    },
    hero: {
      tagline: "Free Consultation via WhatsApp",
      titlePrefix: "Learn English ",
      titleHighlight: "Easily and Enjoyably",
      description:
        "Online and offline classes for children, teens, university students, and professionals. Master English communication, build academic confidence, and enhance your global career prospects with certified instructors.",
      btnPrimary: "Free WA Consultation",
      btnSecondary: "Info via WhatsApp",
      whatsappMsg: "Hello! I'm interested in El's Corner programs. Please provide information.",
      visualTitle: "Interactive Learning",
      visualSub: "Building English speaking confidence every day",
      stat1Value: "4.9 / 5.0",
      stat1Label: "Student Rating",
      stat2Value: "15,000+",
      stat2Label: "Active Students",
    },
    home: {
      banner: {
        tag: "Special Program",
        title: "English for Kids",
        subtitle: "English lessons specifically for children aged 4–12 with fun learning methods. Build English speaking confidence from an early age!",
        cta: "View English for Kids Program",
        path: "/kids-private",
        bgEmoji: "\u{1F476}",
      },
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
          "Join thousands of students who have successfully achieved their goals and career advancement with El's Corner.",
        cards: [
          {
            name: "Budi Santoso",
            course: "IELTS Preparation",
            rating: 5,
            quote:
              "Studying at El's Corner truly changed how I prepare for tests. I managed to get a band score of 8.0! The feedback from teachers was very insightful.",
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
      brand: "El's Corner",
      brandHighlight: "English",
      description:
        "El's Corner offers premium quality English course programs online and offline designed to improve fluency, prepare for academic success, and accelerate your career advancement.",
      socialAria: { fb: "Facebook", ig: "Instagram", tw: "Twitter", ln: "LinkedIn" },
      quickLinksTitle: "Quick Links",
      quickLinks: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Course Programs", path: "/programs" },
        { name: "English for Kids", path: "/kids-private" },
        { name: "Student Testimonials", path: "/testimonials" },
        { name: "Contact Us", path: "/contact" },
      ],
      programsTitle: "Our Programs",
      programLinks: [
        { name: "General English", path: "/programs" },
        { name: "Business English", path: "/programs" },
        { name: "IELTS Preparation", path: "/programs" },
        { name: "TOEFL iBT Preparation", path: "/programs" },
        { name: "English for Kids", path: "/kids-private" },
      ],
      newsletterTitle: "Stay Updated",
      newsletterText:
        "Subscribe to our newsletter for learning tips, class update information, and exclusive discount offers.",
      newsletterPlaceholder: "Your Email Address",
      newsletterBtn: "Subscribe",
      newsletterSuccess:
        "Thank you! You have successfully subscribed to our newsletter.",
      copyright: "El's Corner. All Rights Reserved.",
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
        "Founded in 2012, El's Corner began its journey with one classroom and a belief that language learning should not just be about memorizing grammar rules. Learning a language should be an active, enjoyable, and relevant experience to real life.",
        "Today, El's Corner operates several learning centers and a modern online class platform serving students from various regions and backgrounds, from students to professionals.",
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
          val: "El's Corner Tower, 4th Floor\nJl. Pendidikan No. 10\nCentral Jakarta 10110",
        },
        {
          icon: "\u{1F4DE}",
          title: "Direct Admissions Lines",
          val: "WhatsApp: 0812-3456-7890\nTel: (021) 1234-5678",
        },
        {
          icon: "\u2709\uFE0F",
          title: "General Support Email",
          val: "admissions@els-corner.com\nstudent-services@els-corner.com",
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
      filters: ["All", "General", "Academic", "Professional", "Young Learners", "Kids"],
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
        {
          title: "English for Kids",
          description:
            "English program specifically for children aged 4\u201312 with fun learning methods, gamification, and experienced teachers.",
          category: "Kids",
          format: "Online & Offline",
          level: "Ages 4 - 12",
          duration: "16 Weeks",
          price: "$250",
          icon: "\u{1F476}",
        },
      ],
      noResultsTitle: "No programs found",
      noResultsDesc:
        "Please check back later or contact us for custom schedules.",
    },
    kidsPage: {
      hero: {
        tag: "English for Kids",
        title: "English Lessons \u2013 ",
        titleHighlight: "Fun & Interactive",
        subtitle: "English program specifically for children aged 4\u201312 with fun, interactive, and play-filled learning methods.",
        btnPrimary: "WA Consultation",
        btnSecondary: "Info Program",
        stats: [
          { value: "4\u201312", label: "Years Old" },
          { value: "Fun", label: "Learning" },
          { value: "Native", label: "Teachers" },
          { value: "Online", label: "& Offline" },
        ],
      },
      advantages: {
        tag: "Program Advantages",
        title: "Why English for Kids?",
        subtitle: "Program specifically designed for children's early language development with a fun approach.",
        cards: [
          {
            icon: "\u{1F3B6}",
            title: "Learn with Songs",
            desc: "Learning methods using songs, rhythms, and movements that help children remember vocabulary more easily.",
          },
          {
            icon: "\u{1F3AE}",
            title: "Interactive Gamification",
            desc: "Educational games and interactive quizzes that make children excited to learn without feeling pressured.",
          },
          {
            icon: "\u{1F468}\u200D\u{1F3EB}",
            title: "Experienced Teachers",
            desc: "TEFL-certified instructors who specialize in teaching English to children.",
          },
          {
            icon: "\u{1F4F1}",
            title: "Learning App Access",
            desc: "Mobile app for independent practice at home with materials synchronized with the class curriculum.",
          },
          {
            icon: "\u{1F4DA}",
            title: "International Curriculum",
            desc: "Aligned with CEFR and Cambridge Young Learners English (YLE) test standards.",
          },
          {
            icon: "\u{1F91D}",
            title: "Small Group Classes",
            desc: "Maximum 4\u20136 students per class so teachers can focus more attention on each child.",
          },
        ],
      },
      methods: {
        tag: "Learning Methods",
        title: "Proven Effective Approach",
        subtitle: "We use teaching methods that have been proven effective for children.",
        steps: [
          {
            icon: "\u{1F3A4}",
            step: "01",
            title: "Listen & Repeat",
            desc: "Children listen to native speaker pronunciation and repeat it, building correct pronunciation habits from the start.",
          },
          {
            icon: "\u{1F3B2}",
            step: "02",
            title: "Play & Learn",
            desc: "Learning through board games, vocabulary cards, and physical activities that stimulate memory.",
          },
          {
            icon: "\u{1F3AD}",
            step: "03",
            title: "Role Play",
            desc: "Role-playing in everyday situations like shopping, at the park, or at a restaurant.",
          },
          {
            icon: "\u{1F4C1}",
            step: "04",
            title: "Project-Based",
            desc: "Weekly creative projects such as making posters, picture stories, or short performances.",
          },
        ],
      },
      materials: {
        tag: "Learning Materials",
        title: "What Your Child Will Learn",
        subtitle: "A comprehensive curriculum covering all basic aspects of English.",
        items: [
          {
            icon: "\u{1F1E6}\u{1F1FF}",
            title: "Alphabet & Phonics",
            desc: "Introduction to letters, sounds, and basic reading (phonics).",
          },
          {
            icon: "\u{1F4CB}",
            title: "Vocabulary Building",
            desc: "Everyday vocabulary: numbers, colors, animals, food, family members, and objects around us.",
          },
          {
            icon: "\u{1F5E3}\uFE0F",
            title: "Simple Conversation",
            desc: "Simple conversations such as greetings, self-introductions, and everyday expressions.",
          },
          {
            icon: "\u{1F4D6}",
            title: "Storytelling",
            desc: "Reading and retelling short picture stories to build comprehension.",
          },
          {
            icon: "\u{270D}\uFE0F",
            title: "Basic Writing",
            desc: "Writing letters, words, and short sentences with fun guidance.",
          },
          {
            icon: "\u{1F399}\uFE0F",
            title: "Listening & Speaking",
            desc: "Listening and speaking practice to build confidence.",
          },
        ],
      },
      ages: {
        tag: "Age Groups",
        title: "Programs by Age Group",
        subtitle: "Curriculum tailored to each child's cognitive and motor development stage.",
        groups: [
          {
            age: "4\u20136 Years",
            title: "Little Stars",
            desc: "Focus on language introduction through songs, movement, and sensory play. Build basic vocabulary and English listening habits.",
            color: "var(--accent-color)",
          },
          {
            age: "7\u20139 Years",
            title: "Bright Learners",
            desc: "More structured learning with basic reading, simple word writing, and short conversations. Begin learning basic grammar.",
            color: "var(--secondary-color)",
          },
          {
            age: "10\u201312 Years",
            title: "Young Achievers",
            desc: "Develop speaking fluency, reading comprehension, and short paragraph writing skills. Preparation for teen level.",
            color: "var(--primary-light)",
          },
        ],
      },
      whyUs: {
        tag: "Why Choose Us",
        title: "Why Parents Trust Us",
        subtitle: "We are committed to providing the best English learning experience for your child.",
        reasons: [
          {
            icon: "\u{1F3C6}",
            title: "15+ Years Experience",
            desc: "Trusted by thousands of parents since 2012 in teaching children English.",
          },
          {
            icon: "\u{1F393}",
            title: "International Certification",
            desc: "Curriculum aligned with Cambridge Young Learners English (YLE) standards.",
          },
          {
            icon: "\u{1F4F1}",
            title: "Progress Reports",
            desc: "Parents receive regular monthly progress reports on their child's development.",
          },
          {
            icon: "\u{1F3E0}",
            title: "Learn from Home",
            desc: "Online classes available for children to learn from the comfort of home.",
          },
          {
            icon: "\u{1F4B0}",
            title: "Affordable Price",
            desc: "Competitive course fees with various package and installment options.",
          },
          {
            icon: "\u{1F4DE}",
            title: "Free Consultation",
            desc: "WhatsApp consultation to help choose the right program for your child.",
          },
        ],
      },
      testimonials: {
        tag: "Parent Testimonials",
        title: "What Parents Say",
        subtitle: "Hear from parents who have entrusted their children's English education to us.",
        cards: [
          {
            name: "Anita Wijaya",
            childAge: "Child aged 6",
            rating: 5,
            quote: "My child is now very confident speaking English. The learning method is fun, she's always excited to attend class!",
            initials: "AW",
          },
          {
            name: "Rudi Hartono",
            childAge: "Child aged 9",
            rating: 5,
            quote: "Our son used to be shy, but after 2 months in English for Kids, he started daring to speak English. Thank you El's Corner!",
            initials: "RH",
          },
          {
            name: "Sari Dewi",
            childAge: "Child aged 11",
            rating: 5,
            quote: "The curriculum is very structured. I can see my child's vocabulary and grammar improving significantly every month.",
            initials: "SD",
          },
        ],
      },
      faqs: {
        tag: "FAQ",
        title: "English for Kids FAQ",
        subtitle: "Find answers to frequently asked questions about the English for Kids program.",
        items: [
          {
            q: "Does my child need prior English knowledge?",
            a: "No. The English for Kids program is designed for all levels, including children who are learning English for the first time. Our teachers will adapt the method to each child's ability.",
          },
          {
            q: "How long is each class session?",
            a: "Each session lasts 45\u201360 minutes, adjusted according to the age range and attention capacity of the child.",
          },
          {
            q: "Are online classes available?",
            a: "Yes, we provide interactive online classes via Zoom with digital materials and games that remain fun and engaging for children.",
          },
          {
            q: "How does payment work?",
            a: "Program fees can be paid in full upfront or in monthly installments. We also offer a trial package of 4 sessions.",
          },
          {
            q: "Will my child receive a certificate?",
            a: "Yes, each student will receive a graduation certificate at the end of the program as a form of appreciation and motivation.",
          },
        ],
      },
      cta: {
        title: "Register Your Child Now!",
        description: "Free consultation via WhatsApp to find out the most suitable English for Kids program for your child. Free trial session!",
        btnText: "Free WA Consultation",
      },
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
            "El's Corner completely changed my prep method. I scored an 8.0 overall band score! The tutors gave incredible writing suggestions and guided me on managing time.",
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
    kids: {
      hero: {
        tag: "Private 1-on-1 Class • Ages 4-8",
        title: "A Learning Place ",
        titleHighlight: "Kids Love",
        desc: "Interactive private lessons that make children fall in love with learning. Fun methods, patient tutors, real results.",
        btnWA: "Chat via WhatsApp",
        btnTrial: "Try Free Trial",
        msgWA: "Hello! I'm interested in the private tutoring program for children aged 4-8. Please provide information.",
        msgTrial: "Hello! I'd like to try a free Trial Class for my child.",
        metric1: "Parents Trust",
        metric1Val: "15,000+",
        metric2: "Rating",
        metric2Val: "4.9",
        metric2Icon: "⭐",
        metric3: "Certified Tutors",
        metric3Val: "Trusted",
      },
      programs: {
        tag: "Learning Programs",
        title: "Your Child's Learning World",
        sub: "Each program is specially designed to make children fall in love with learning.",
        cards: [
          { title: "Reading & Writing", icon: "📖", desc: "Learn to read and write through exciting stories and word games that make children fall in love with books." },
          { title: "Basic Math", icon: "🔢", desc: "Numbers and counting become an exciting adventure with interactive montessori methods." },
          { title: "Creativity & Art", icon: "🎨", desc: "Develop imagination through drawing, coloring, and crafting that stimulates creativity." },
          { title: "Focus & Confidence", icon: "🦋", desc: "Build focus and independence through activities that boost self-confidence." },
        ],
        btnWA: "Consult via WA",
      },
      journey: {
        tag: "How It Works",
        title: "3 Simple Steps",
        sub: "Start your child's learning journey with ease.",
        steps: [
          { num: "01", title: "Consult Needs", desc: "We have a casual chat to get to know your child, their learning style, and what excites them." },
          { num: "02", title: "Pick Best Tutor", desc: "We match the most suitable tutor based on your child's personality and learning interests." },
          { num: "03", title: "Start Adventure", desc: "Your child learns in a comfortable, fun-filled environment that they look forward to every session." },
        ],
      },
      gallery: {
        tag: "Kids Activities",
        title: "The Fun of Learning With Us",
        sub: "Documentation of children's excitement learning in every session.",
      },
      testimonials: {
        tag: "Testimonials",
        title: "What Parents Say",
        sub: "Real experiences from parents who have entrusted us.",
        cards: [
          { name: "Mrs. Sarah", child: "Alea, 6 years", quote: "Alea became so confident! The learning method is fun, she's always excited for her lesson schedule." },
          { name: "Mr. Dimas", child: "Raka, 5 years", quote: "Raka, who used to struggle with focus, can now sit calmly and enjoy learning. Amazing!" },
          { name: "Mrs. Maya", child: "Kiki, 4 years", quote: "Kiki who was hyperactive can now focus for 30 minutes. The tutor is so patient and creative!" },
        ],
      },
      faq: {
        tag: "FAQ",
        title: "Frequently Asked Questions",
        sub: "Find answers to commonly asked questions.",
        items: [
          { q: "What is the minimum age to join?", a: "Our program is designed for children aged 4-8 years." },
          { q: "How does the learning system work?", a: "We use a 1-on-1 method with experienced tutors tailored to your child's learning style." },
          { q: "Is there a trial class?", a: "Yes! We provide a free trial class to ensure your child is a good fit for our method." },
        ],
      },
      cta: {
        tag: "Start Now",
        title: "Give the Best for Your Little One",
        desc: "Register now and get a free trial session. Discover how our method can make your child fall in love with learning.",
        btn: "Chat via WhatsApp",
      },
    },
  },
};

export default translations;
