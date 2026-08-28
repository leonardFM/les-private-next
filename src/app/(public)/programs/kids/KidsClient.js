'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n';
import { getWhatsAppUrl, KIDS_WHATSAPP_MESSAGE } from '@/lib/constants';
import CTASection from '@/components/CTASection';
import styles from './kids.module.css';

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
}

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.accordionItem} ${openIndex === index ? styles.accordionOpen : ''}`}
        >
          <button
            className={styles.accordionBtn}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span>{item.q}</span>
            <span className={styles.accordionIcon}>
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          <div className={styles.accordionContent}>
            <p className={styles.accordionAnswer}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function KidsClient() {
  const { t } = useTranslation();
  const kids = t('kidsPage');

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.heroTag}>{kids.hero.tag}</span>
              <h1 className={styles.heroTitle}>
                {kids.hero.title}
                <span className={styles.heroHighlight}>{kids.hero.titleHighlight}</span>
              </h1>
              <p className={styles.heroSubtitle}>{kids.hero.subtitle}</p>
              <div className={styles.heroActions}>
                <a
                  href={getWhatsAppUrl(KIDS_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  {kids.hero.btnPrimary}
                </a>
                <a
                  href={getWhatsAppUrl(KIDS_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ color: '#fff', borderColor: '#fff' }}
                >
                  {kids.hero.btnSecondary}
                </a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroIconCircle}>
                <span className={styles.heroEmoji}>🧒</span>
              </div>
              <div className={styles.heroStats}>
                {kids.hero.stats.map((stat, i) => (
                  <div key={i} className={styles.heroStatItem}>
                    <span className={styles.heroStatVal}>{stat.value}</span>
                    <span className={styles.heroStatLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Program */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{kids.advantages.tag}</span>
            <h2 className="section-title">{kids.advantages.title}</h2>
            <p className="section-subtitle">{kids.advantages.subtitle}</p>
          </div>
          <div className={styles.grid3}>
            {kids.advantages.cards.map((card, i) => (
              <div key={i} className={styles.advantageCard}>
                <div className={styles.advantageIcon}>{card.icon}</div>
                <h3 className={styles.advantageTitle}>{card.title}</h3>
                <p className={styles.advantageDesc}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metode Belajar */}
      <section className="section" style={{ backgroundColor: 'var(--primary-soft)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{kids.methods.tag}</span>
            <h2 className="section-title">{kids.methods.title}</h2>
            <p className="section-subtitle">{kids.methods.subtitle}</p>
          </div>
          <div className={styles.methodsGrid}>
            {kids.methods.steps.map((step, i) => (
              <div key={i} className={styles.methodCard}>
                <div className={styles.methodStep}>{step.step}</div>
                <div className={styles.methodIcon}>{step.icon}</div>
                <h3 className={styles.methodTitle}>{step.title}</h3>
                <p className={styles.methodDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materi yang Dipelajari */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{kids.materials.tag}</span>
            <h2 className="section-title">{kids.materials.title}</h2>
            <p className="section-subtitle">{kids.materials.subtitle}</p>
          </div>
          <div className={styles.grid3}>
            {kids.materials.items.map((item, i) => (
              <div key={i} className={styles.materialCard}>
                <div className={styles.materialIcon}>{item.icon}</div>
                <h3 className={styles.materialTitle}>{item.title}</h3>
                <p className={styles.materialDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rentang Usia */}
      <section className="section" style={{ backgroundColor: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{kids.ages.tag}</span>
            <h2 className="section-title">{kids.ages.title}</h2>
            <p className="section-subtitle">{kids.ages.subtitle}</p>
          </div>
          <div className={styles.ageGrid}>
            {kids.ages.groups.map((group, i) => (
              <div key={i} className={styles.ageCard} style={{ '--card-accent': group.color }}>
                <div className={styles.ageHeader} style={{ backgroundColor: group.color }}>
                  <span className={styles.ageBadge}>{group.age}</span>
                </div>
                <div className={styles.ageBody}>
                  <h3 className={styles.ageTitle}>{group.title}</h3>
                  <p className={styles.ageDesc}>{group.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mengapa Memilih Kami */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{kids.whyUs.tag}</span>
            <h2 className="section-title">{kids.whyUs.title}</h2>
            <p className="section-subtitle">{kids.whyUs.subtitle}</p>
          </div>
          <div className={styles.grid3}>
            {kids.whyUs.reasons.map((reason, i) => (
              <div key={i} className={styles.reasonCard}>
                <div className={styles.reasonIcon}>{reason.icon}</div>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonDesc}>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni Orang Tua */}
      <section className="section" style={{ backgroundColor: 'var(--primary-soft)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{kids.testimonials.tag}</span>
            <h2 className="section-title">{kids.testimonials.title}</h2>
            <p className="section-subtitle">{kids.testimonials.subtitle}</p>
          </div>
          <div className={styles.testimonialGrid}>
            {kids.testimonials.cards.map((test, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <div className={styles.testimonialAvatar}>{test.initials}</div>
                  <div>
                    <h4 className={styles.testimonialName}>{test.name}</h4>
                    <span className={styles.testimonialChild}>{test.childAge}</span>
                  </div>
                </div>
                <StarRating rating={test.rating} />
                <p className={styles.testimonialQuote}>&ldquo;{test.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className={styles.faqContainer}>
            <div className="section-header">
              <span className="section-tag">{kids.faqs.tag}</span>
              <h2 className="section-title">{kids.faqs.title}</h2>
              <p className="section-subtitle">{kids.faqs.subtitle}</p>
            </div>
            <Accordion items={kids.faqs.items} />
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <div className="container">
        <CTASection
          title={kids.cta.title}
          description={kids.cta.description}
          primaryActionText={kids.cta.btnText}
          primaryMessage={KIDS_WHATSAPP_MESSAGE}
          secondaryActionText={kids.hero.btnSecondary}
          secondaryActionUrl="/programs"
        />
      </div>
    </div>
  );
}
