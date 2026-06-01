'use client';

import React, { useState } from 'react';
import styles from './contact.module.css';

export default function ContactClient() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'General English Mastery',
    format: 'Hybrid Classroom',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const contactInfos = [
    {
      icon: '📍',
      title: 'Our Campus Headquarters',
      val: 'Lexicon Tower, 4th Floor\n450 Academic Avenue, Suite 12\nDowntown District, NY 10001'
    },
    {
      icon: '📞',
      title: 'Direct Admissions Lines',
      val: 'Toll Free: +1 (800) 555-0199\nLocal Support: +1 (212) 555-0182'
    },
    {
      icon: '✉️',
      title: 'General Support Email',
      val: 'admissions@lexicon-academy.com\nstudent-services@lexicon-academy.com'
    },
    {
      icon: '⏰',
      title: 'Consultation Hours',
      val: 'Monday – Friday: 08:00 AM – 09:00 PM\nSaturday: 09:00 AM – 05:00 PM\nSunday: Closed'
    }
  ];

  const faqs = [
    {
      q: 'Can I swap between online and offline classes after starting?',
      a: 'Absolutely! Our Hybrid Classroom setup allows you to switch your attendance weekly. If you are registered in a hybrid class, you can choose to join our physical campus classrooms in person or dial into the live session streams remotely without extra charges.'
    },
    {
      q: 'Do all teachers hold certified ESL credentials?',
      a: 'Yes, 100% of our academic educators hold certified teaching credentials (CELTA, DELTA, or TEFL) with university degrees in Applied Linguistics, Literature, or Education. Our test preparation classes are coached specifically by examiners or ex-examiners.'
    },
    {
      q: 'Is there a free level diagnostic before enrollment?',
      a: 'Yes! We require all prospective students (except beginner levels) to complete our comprehensive 15-minute language diagnostic, which evaluates grammar, written output, and speaking skills. This ensures you are placed in a class that matches your capabilities perfectly.'
    },
    {
      q: 'How does the installment billing program function?',
      a: 'We offer flexible payment schemes where tuition can be split into three monthly installments. Corporate group enrollments can also request customized invoices. Contact our billing office for further details.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Mock submit reset
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: 'General English Mastery',
        format: 'Hybrid Classroom',
        message: ''
      });
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
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {/* Sidebar Details Info */}
            <div className={styles.infoPanel}>
              <h2 style={{ fontSize: '28px', color: 'var(--foreground)', marginBottom: '10px' }}>Contact Details</h2>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '15px', marginBottom: '20px' }}>
                Visit our physical downtown headquarters, call our support agents, or email us. Our academic advisors are always happy to help.
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

            {/* Main Interactive Form Card */}
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successBox}>
                  <h3 className={styles.successTitle}>Inquiry Sent Successfully!</h3>
                  <p className={styles.successText}>
                    Thank you for contacting Lexicon English Academy. An academic counselor will review your requirements and reach out to you within the next 24 working hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="btn btn-primary"
                    style={{ marginTop: '20px', fontSize: '14px', padding: '10px 20px' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>Request Course Consultation</h2>
                  <p className={styles.formSub}>Submit your details to calculate your fees or request a free diagnostic trial session.</p>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe" 
                        className={styles.input} 
                        required 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 0123" 
                        className={styles.input} 
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com" 
                      className={styles.input} 
                      required 
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Preferred Program *</label>
                      <select 
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className={styles.select}
                      >
                        <option>General English Mastery</option>
                        <option>IELTS Academic Prep Boost</option>
                        <option>Business Communication Pro</option>
                        <option>TOEFL iBT Prep Strategy</option>
                        <option>Junior Speech Adventurers</option>
                        <option>Teen Conversation Club</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Class Format *</label>
                      <select 
                        name="format"
                        value={formData.format}
                        onChange={handleInputChange}
                        className={styles.select}
                      >
                        <option>Hybrid Classroom</option>
                        <option>Offline Campus (In-Person)</option>
                        <option>Online Classroom (Live Stream)</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup} style={{ marginBottom: '30px' }}>
                    <label className={styles.label}>Tell us about your learning goals *</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="E.g., I need to get IELTS score 7.5 for university admissions by September..." 
                      className={styles.textarea} 
                      required 
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Submit Consultation Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Common Inquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Can&apos;t find the answer you&apos;re looking for? Check our helpful FAQ summaries below.
            </p>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
                  <button 
                    onClick={() => toggleFaq(index)} 
                    className={styles.faqHeader}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className={`${styles.faqTrigger} ${isOpen ? styles.faqTriggerOpen : ''}`}>+</span>
                  </button>
                  {isOpen && (
                    <div className={`${styles.faqContent} ${styles.faqContentOpen}`}>
                      {faq.a}
                    </div>
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
