'use client';

import React, { useEffect, useState, useRef } from 'react';
import { getWhatsAppUrl } from '@/lib/constants';
import styles from './kids-private.module.css';

const img = (name) => `/image/${name}`;

const I = {
  hero: img('c8hJwAeuW4Sud51pDGf5a6KYvOKhGUaeTzXb3S5c0Uz7ErhAR0kBU3d2JTzMssxRPO3FyMCizV-KVn5TbZTkkRVyQeW9-Crh3T5XgZZnlRJiHQweqQEvWb-BQc9u4WIe7gVNOJEPaZORFl3VZHoNOOPGTY-YjlyntvUm9QkgFqQxBh8xIT1jngEYD8sT1q5S.jpg'),
  fun: img('H9MmxzgAQl0PXnNo3Z3iWEV--Y3ztW2ZDfHKC2OlWo2Yeg31o5g2HDUsARe3MmZZRjNdvu2C_c6CARYpnyH1v5BcPx6udCfAFwf0MGHJw4kwISgQjZeNehIhRzFzAabeQnQhcjiLL2XQamMMPIUgbuK-gPW3FglPQmU4ZcT09C0YxdynQXsDJ-roAXt-mMnu.jpg'),
  prog1: img('4Imqqxo8-XjSHWkjT3ZmsEtkxpqAGD09eH_V4cfqAI-Y6tizc0AXr96UAqb7XZI3zNu6i4GfG65hPXwQg0FAz_hV-uCDGP69qtMfLD8446gNPgwrYKSqIBo1HVgx-r0RG_nsLIfxm0y-I8KWZ2rFZDrfk4M1Gn0oyPSkaejb_s6zGs9F9Ab8TTTztidwxj45.jpg'),
  prog2: img('Gn6X4kZAsnD-MY8wXbwbyb5waYldgmfLm_0rmpvgKPSYq5GKJ0SGHwIxC4QUoc6EYGvFF7PvoOWo_LeHCqn4xZaAIuKsJ36Hyh_NMLAaIz34j5Cx8UR8egzawkrY1nLdVWG6q0LtfVARGfiRwSYKSDwm9EXkKxU9iIhBmRFsYq4zLEsILEm6Ik9jLUlUku6-.jpg'),
  prog3: img('qWUbd9o1LHhe0ObDlc1DM6hhpiOs4K_fh_g-jyKChoy9v_i1a7Uir-Z1pqfwI3jZNReRflmMVexCVz0V_WJmOJ0gnSXeAwC2m7B0iQehI7pWDIs-oaGHjCp8zyM-9o1ZdknJYLzEyIlI5RYlDfkVntPPx5c6OybgBtDkeN5ws4ETqL_2LpFus9swE9oannSY.jpg'),
  prog4: img('ztlO3aHmGX0xiIdIlpSaaDi-TFz_o6DJ6uxE1xqg8ltFFpoBi593Mr7RTXYTBDsE6urCP-z0I67JoSBfC3DAlXmcyfpASk50mIAQHx4NIAcKWym2KEgEeKDAbi_texaHJNkcWX1UnJGdiJGR9hxz1IfhTqz9AJRk_bPXJ0opwAA8qPvZdJCyyZT_n7H7PFJ8.jpg'),
  step1: img('Am7UAYQkYk8s-WGtoR4hsL0CEstAUKBbzRDI-ph-ucTMUS8Dx5eHKbB1inOwDDZiXek-SGCCGbqLiUg1vC0EjjAS9nFktkxMBrRB1Gr8t8UZyHmDl2ikyrrmuECU8uEnxJCJXxQf1Atryj4vbTMafAuZb2H1XlAxoqaTh9YF8APPa9vvAdTZ3ihJyB0Bi1OJ.jpg'),
  step2: img('I6QCbgar8DFZ2xYXSL-b9lC7TCzzn_f4-cDvc_5M1vnh53EHN8-3HLvWS98hXuXJJYVc77XWr50SPOND6kB1cq6-YR4eeqtVfWzh1NZd3Bo-ejQuGdFfl0o14LZCvYQqZ29E_VvXFGwIXUwzwD8fxOWk-kT0Ogq9VWlX5G71ITqwX34REdqFrv_F2JGmN87B.jpg'),
  step3: img('gf1eDWxs0jLzlSD6t6_p5FzAhp-GyhMn-GieAR6StOJNxywc-BArkdMGPGuawjEfZyhoj7U82HFk1PDZgL1nz8HokH2HC6wmtT-dLosLC1tpHK2Um-JWcvzLQVOIKfNHifzhFh43f7RwSHhj1tbBTCb-FcclX8mIb1esuVLxQi--xe-JTxOICw_EfTHfJbL5.jpg'),
  gal1: img('l0CYD_8jrVqXnIJskbjEW0cJ1h9tSM2tQ-nX0DCjY--qlPDcFiuERMTW5K1NWhjyreW0kdWFkDM-QfqYk6pQ4DBHp861LfoBTOE-F3BYXBaRWXaUbg0M3skoEWBnXSAKUI18he37P3Z896PMAqHnqQMA4F552sMNOHhSn-0DI5Q1a8iwcFXS291mYPqBa1S1.jpg'),
  gal2: img('PXyqSUzqJN_4i92ipOrlWH8rG2WJ-wS3q8fZEQZE1FN7k4VJrVwu-ox9YiSC3FAKMtzYFD71X1kzyMjwSO1xvR3kF2m1EKdXsQHtStsfQo3n379_vLHifiLeIY-67iDhdrv4KYVh7NVoGolxbzuRr7Eu1fHIlfw6QpGa7b_wEW-9kEXKUdSm6TvmMPRHg3nm.jpg'),
  gal3: img('R7T211okNUWCN_XhrFmSpQiOi_aPVjjRP4rb3gipofzQKEfwu4yZtLK3fYSh7i808S6sih77jjN0ZQ4hxY1KYXDLZ6bqLv0k6En8OhrOaG1Yuxzhm5wSVeiKRSHnYU_CkR7I-0jyogY8L7hma7--1BLe4Pk716fq7Y8KqLQmPPJzFHigeHCUFT9jhgDMAETw.jpg'),
};

const PROGRAMS = [
  { title: 'Membaca & Menulis', icon: '📖', img: I.prog1, color: '#A8D8EA', desc: 'Belajar membaca dan menulis lewat cerita seru dan permainan kata yang membuat anak jatuh cinta pada buku.' },
  { title: 'Matematika Dasar', icon: '🔢', img: I.prog2, color: '#B5EAD7', desc: 'Mengenal angka dan berhitung jadi petualangan mengasyikkan dengan metode montessori interaktif.' },
  { title: 'Kreativitas & Seni', icon: '🎨', img: I.prog3, color: '#E8A098', desc: 'Mengembangkan imajinasi lewat menggambar, mewarnai, dan crafting yang merangsang kreativitas.' },
  { title: 'Fokus & Percaya Diri', icon: '🦋', img: I.prog4, color: '#C2B8D4', desc: 'Bangun fokus dan kemandirian anak lewat aktivitas yang meningkatkan rasa percaya diri.' },
];

const STEPS = [
  { num: '01', title: 'Konsultasi Kebutuhan', desc: 'Kami ngobrol santai untuk mengenal si kecil, gaya belajarnya, dan apa yang membuatnya semangat.', img: I.step1 },
  { num: '02', title: 'Pilih Tutor Terbaik', desc: 'Kami pasangkan tutor yang paling cocok dengan kepribadian dan minat belajar anak Anda.', img: I.step2 },
  { num: '03', title: 'Mulai Petualangan', desc: 'Anak belajar dalam suasana nyaman, penuh tawa, dan selalu dinantikan setiap sesinya.', img: I.step3 },
];

const TESTIMONIALS = [
  { name: 'Ibu Sarah', child: 'Alea, 6 tahun', quote: 'Alea jadi percaya diri banget! Metode belajarnya seru, dia selalu semangat nunggu jadwal les.', color: '#E8A098', featured: true },
  { name: 'Ayah Dimas', child: 'Raka, 5 tahun', quote: 'Raka yang dulu susah fokus, sekarang bisa duduk tenang dan menikmati belajar. Luar biasa!', color: '#A8CFB8' },
  { name: 'Ibu Maya', child: 'Kiki, 4 tahun', quote: 'Kiki yang hiperaktif jadi bisa fokus 30 menit. Tutornya sabar dan kreatif banget!', color: '#C2B8D4' },
];

function Fade({ children }) {
  const [show, setShow] = useState(false);
  const el = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(e.target); } }, { threshold: 0.05 });
    if (el.current) obs.observe(el.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={el} className={`${styles.fade} ${show ? styles.fadeIn : ''}`}>{children}</div>;
}

export default function KidsPrivateClient() {
  const msg = 'Halo! Saya tertarik dengan program les privat untuk anak usia 4-8 tahun. Mohon informasinya.';
  const trialMsg = 'Halo! Saya ingin coba Trial Class gratis untuk anak saya.';

  return (
    <div className={styles.page}>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroDeco1} />
        <div className={styles.heroDeco2} />
        <img src={I.hero} alt="" className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>Les Privat 1-on-1 • Usia 4-8 Tahun</div>
          <h1 className={styles.heroTitle}>
            Tempat Belajar yang{' '}
            <span className={styles.heroGrad}>Anak-Anak Suka</span>
          </h1>
          <p className={styles.heroP}>
            Les privat interaktif yang membuat anak jatuh cinta dengan belajar. 
            Metode menyenangkan, tutor sabar, hasil nyata.
          </p>
          <div className={styles.heroActions}>
            <a href={getWhatsAppUrl(msg)} target="_blank" rel="noopener noreferrer" className={styles.btnWa}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat Via WhatsApp
            </a>
            <a href={getWhatsAppUrl(trialMsg)} target="_blank" rel="noopener noreferrer" className={styles.heroBtnOutline}>
              Coba Trial Gratis
            </a>
          </div>
          <div className={styles.heroMetrics}>
            <span><strong>15.000+</strong> Orang Tua Percaya</span>
            <span><strong>4.9</strong> ⭐ Rating</span>
            <span><strong>Terpercaya</strong> Tutor Sertifikasi</span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <img src={I.fun} alt="" className={styles.heroVisualImg} />
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeIcon}>🎉</span>
            <div>
              <strong>Trial Class</strong>
              <span className={styles.heroBadgeSub}>Gratis!</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAM ===== */}
      <Fade>
        <section className={styles.progSec}>
          <div className={styles.progDeco} />
          <div className="container">
            <div className={styles.progHead}>
              <span className={styles.tag}>Program Belajar</span>
              <h2 className={styles.title}>Dunia Belajar Si Kecil</h2>
              <p className={styles.sub}>Setiap program dirancang khusus untuk membuat anak jatuh cinta dengan belajar.</p>
            </div>
            <div className={styles.progGrid}>
              {PROGRAMS.map((p, i) => (
                <div key={i} className={`${styles.progCard} ${i === 0 ? styles.progFeatured : ''}`}>
                  <div className={styles.progImgWrap}>
                    <img src={p.img} alt={p.title} className={styles.progImg} />
                    <div className={styles.progImgOverlay} style={{ background: p.color }} />
                  </div>
                  <div className={styles.progBody}>
                    <span className={styles.progIcon}>{p.icon}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <a href={getWhatsAppUrl(`Halo! Saya tertarik dengan program ${p.title} untuk anak saya.`)} target="_blank" rel="noopener noreferrer" className={styles.progBtn}>
                      Konsultasi via WA
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Fade>

      {/* ===== CARA BELAJAR ===== */}
      <Fade>
        <section className={styles.stepSec}>
          <div className="container">
            <div className="container-narrow">
              <div className={styles.stepHead}>
                <span className={styles.tag}>Cara Belajar</span>
                <h2 className={styles.title}>3 Langkah Sederhana</h2>
                <p className={styles.sub}>Mulai perjalanan belajar si kecil dengan mudah.</p>
              </div>
              <div className={styles.stepFlow}>
                {STEPS.map((s, i) => (
                  <div key={i} className={styles.stepItem}>
                    <div className={styles.stepImgCol}>
                      <div className={styles.stepImgWrap}>
                        <img src={s.img} alt={s.title} />
                        <div className={styles.stepNum}>{s.num}</div>
                      </div>
                      {i < STEPS.length - 1 && <div className={styles.stepLine} />}
                    </div>
                    <div className={styles.stepContent}>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Fade>

      {/* ===== AKTIVITAS ===== */}
      <Fade>
        <section className={styles.actSec}>
          <div className="container">
            <div className={styles.actHead}>
              <span className={styles.tag}>Aktivitas Anak</span>
              <h2 className={styles.title}>Serunya Belajar Bareng Kami</h2>
              <p className={styles.sub}>Dokumentasi keseruan anak-anak belajar di setiap sesi.</p>
            </div>
            <div className={styles.actGrid}>
              <div className={styles.actItem}><img src={I.gal1} alt="" /></div>
              <div className={styles.actItem}><img src={I.gal2} alt="" /></div>
              <div className={styles.actItem}><img src={I.gal3} alt="" /></div>
              <div className={styles.actItem}><img src={I.prog3} alt="" /></div>
              <div className={styles.actItem}><img src={I.prog1} alt="" /></div>
              <div className={styles.actItem}><img src={I.prog2} alt="" /></div>
            </div>
          </div>
        </section>
      </Fade>

      {/* ===== TESTIMONIAL ===== */}
      <Fade>
        <section className={styles.testSec}>
          <div className={styles.testDeco} />
          <div className="container">
            <div className={styles.testHead}>
              <span className={styles.tag}>Testimonial</span>
              <h2 className={styles.title}>Kata Mereka yang Telah Percaya</h2>
              <p className={styles.sub}>Pengalaman nyata dari orang tua murid kami.</p>
            </div>
            <div className={styles.testGrid}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`${styles.testCard} ${t.featured ? styles.testFeatured : ''}`}>
                  <div className={styles.testCardAccent} style={{ background: t.color }} />
                  <div className={styles.testStars}>⭐⭐⭐⭐⭐</div>
                  <p className={styles.testQuote}>&ldquo;{t.quote}&rdquo;</p>
                  <div className={styles.testAuthor}>
                    <strong>{t.name}</strong>
                    <span>{t.child}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Fade>

      {/* ===== CTA ===== */}
      <Fade>
        <section className={styles.ctaSec}>
          <img src={I.hero} alt="" className={styles.ctaBg} />
          <div className={styles.ctaOverlay} />
          <div className="container">
            <div className={styles.ctaInner}>
              <div className={styles.ctaCard}>
                <span className={styles.ctaTag}>Mulai Sekarang</span>
                <h2 className={styles.ctaTitle}>Berikan yang Terbaik untuk Si Kecil</h2>
                <p className={styles.ctaP}>
                  Daftar sekarang & dapatkan sesi trial gratis. Temukan bagaimana metode kami 
                  bisa membuat anak Anda jatuh cinta dengan belajar.
                </p>
                <a href={getWhatsAppUrl(msg)} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat Via WhatsApp
                </a>
              </div>
              <div className={styles.ctaVisual}>
                <img src={I.fun} alt="" className={styles.ctaImg} />
              </div>
            </div>
          </div>
        </section>
      </Fade>

      <StickyWA msg={msg} />
    </div>
  );
}

function StickyWA({ msg }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`${styles.sticky} ${show ? styles.stickyShow : ''}`}>
      <a href={getWhatsAppUrl(msg)} target="_blank" rel="noopener noreferrer" className={styles.stickyBtn}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Chat Via WhatsApp
      </a>
    </div>
  );
}
