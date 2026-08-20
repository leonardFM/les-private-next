'use client';

import React from 'react';
import Hero from '@/components/Hero';
import VideoTestimonial from '@/components/VideoTestimonial';
import FeaturesSection from '@/components/FeaturesSection';
import ProgramsSection from '@/components/ProgramsSection';
import AboutSection from '@/components/AboutSection';
import TeachersSection from '@/components/TeachersSection';
import CTASection from '@/components/CTASection';
import { useTranslation } from '@/i18n';

export default function HomeClient() {
  const { t } = useTranslation();

  return (
    <div>
      <Hero />
      <VideoTestimonial />
      <ProgramsSection />
      <AboutSection />

      <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <CTASection
          title={t('cta.default.title')}
          description={t('cta.default.description')}
          primaryActionText={t('cta.default.primaryText')}
          secondaryActionText={t('cta.default.secondaryText')}
        />
      </div>
    </div>
  );
}
