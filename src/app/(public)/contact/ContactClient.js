'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n';
import { getWhatsAppUrl } from '@/lib/constants';
import { createLead } from '@/lib/actions';
import styles from './contact.module.css';

export default function ContactClient({ faqs }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: t('contact.programOptions')[0],
    format: t('contact.formatOptions')[0],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const contactInfos = t('contact.infos');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const waMsg = `Halo, saya *${formData.name}*
Email: ${formData.email}
No. Telepon: ${formData.phone || '-'}
Program: ${formData.program}
Format: ${formData.format}

*Pertanyaan Saya:*
${formData.message}`;

      const leadForm = new FormData();
      leadForm.set('name', formData.name);
      leadForm.set('email', formData.email);
      leadForm.set('phone', formData.phone);
      leadForm.set('program', formData.program);
      leadForm.set('format', formData.format);
      leadForm.set('message', formData.message);
      await createLead(leadForm);

      window.open(getWhatsAppUrl(waMsg), '_blank', 'noopener');
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', program: t('contact.programOptions')[0], format: t('contact.formatOptions')[0], message: '' });
    }
  };

  const toggleFaq = (index) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  return (
    <div>
      <section className="section bg-yellow" style={{ padding: '60px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">{t('contact.tag')}</span>
          <h1 className="section-title" style={{ margin: 0 }}>{t('contact.title')}</h1>
          <p className="section-subtitle" style={{ marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="section bg-blue">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.infoPanel}>
              <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{t('contact.infoTitle')}</h2>
              <p style={{ opacity: 0.85, fontSize: '15px', marginBottom: '20px' }}>
                {t('contact.infoIntro')}
              </p>
              {contactInfos.map((info, idx) => (
                <div key={idx} className={styles.infoCard}>
                  <div className={styles.infoIcon}>{info.icon}</div>
                  <div className={styles.infoDetails}>
                    <h3 className={styles.infoTitle}>{info.title}</h3>
                    <p className={styles.infoVal}>{info.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successBox}>
                  <h3 className={styles.successTitle}>{t('contact.successTitle')}</h3>
                  <p className={styles.successText}>{t('contact.successText')}</p>
                  <p style={{ fontSize: '13px', marginTop: '10px', color: 'var(--foreground-muted)' }}>
                    {t('contact.successWhatsApp')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary"
                    style={{ marginTop: '16px', fontSize: '14px', padding: '10px 20px' }}
                  >
                    {t('contact.successBtn')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>{t('contact.formTitle')}</h2>
                  <p className={styles.formSub}>{t('contact.formSub')}</p>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('contact.labels.name')} *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('contact.placeholder.name')} className={styles.input} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('contact.labels.phone')}</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('contact.placeholder.phone')} className={styles.input} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('contact.labels.email')} *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t('contact.placeholder.email')} className={styles.input} required />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('contact.labels.program')} *</label>
                      <select name="program" value={formData.program} onChange={handleInputChange} className={styles.select}>
                        {t('contact.programOptions').map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('contact.labels.format')} *</label>
                      <select name="format" value={formData.format} onChange={handleInputChange} className={styles.select}>
                        {t('contact.formatOptions').map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup} style={{ marginBottom: '30px' }}>
                    <label className={styles.label}>{t('contact.labels.message')} *</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder={t('contact.placeholder.message')} className={styles.textarea} required />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    {t('contact.submitText')} &#x1F4AC;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.faqSection} bg-yellow`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t('contact.faqTag')}</span>
            <h2 className="section-title">{t('contact.faqTitle')}</h2>
            <p className={styles.sectionSubtitle}>{t('contact.faqSubtitle')}</p>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.id} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
                  <button onClick={() => toggleFaq(index)} className={styles.faqHeader} aria-expanded={isOpen}>
                    <span>{faq.question}</span>
                    <span className={`${styles.faqTrigger} ${isOpen ? styles.faqTriggerOpen : ''}`}>+</span>
                  </button>
                  {isOpen && (
                    <div className={`${styles.faqContent} ${styles.faqContentOpen}`}>{faq.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
