'use client';

import React from 'react';
import { useTranslation } from '@/i18n';
import HeroSection from '@/components/kids/HeroSection';
import ProgramSection from '@/components/kids/ProgramSection';
import LearningJourneySection from '@/components/kids/LearningJourneySection';
import GallerySection from '@/components/kids/GallerySection';
import TestimonialSection from '@/components/kids/TestimonialSection';
import FAQSection from '@/components/kids/FAQSection';
import KidsCTASection from '@/components/kids/CTASection';
import StickyWA from '@/components/kids/StickyWA';

const img = (name) => `/image/${name}`;

const I = {
  hero: img('c8hJwAeuW4Sud51pDGf5a6KYvOKhGUaeTzXb3S5c0Uz7ErhAR0kBU3d2JTzMssxRPO3FyMCizV-KVn5TbZTkkRVyQeW9-Crh3T5XgZZnlRJiHQweqQEvWb-BQc9u4WIe7gVNOJEPaZORFl3VZHoNOOPGTY-YjlyntvUm9QkgFqQxBh8xIT1jngEYD8sT1q5S.jpg'),
  fun: img('H9MmxzgAQl0PXnNo3Z3iWEV--Y3ztW2ZDfHKC2OlWo2Yeg31o5g2HDUsARe3MmZZRjNdvu2C_c6CARYpnyH1v5BcPx6udCfAFwf0MGHJw4kwISgQjZeNehIhRzFzAabeQnQhcjiLL2XQamMMPIUgbuK-gPW3FglPQmU4ZcT09C0YxdynQXsDJ-roAXt-mMnu.jpg'),
  prog1: img('4Imqqxo8-XjSHWkjT3ZmsEtkxpqAGD09eH_V4cfqAI-Y6tizc0AXr96UAqb7XZI3zNu6i4GfG65hPXwQg0FAz_hV-uCDGP69qtMfLD8446gNPgwrYKSqIBo1HVgx-r0RG_nsLIfxm0y-I8KWZ2rFZDrfk4M1Gn0oyPSkaejb_s6zGs9F9Ab8TTTztidwxj45.jpg'),
  prog2: img('Gn6X4kZAsnD-MY8wXbwbyb5waYldgmfLm_0rmpvgKPSYq5GKJ0SGHwIxC4QUoc6EYGvFF7PvoOWo_LeHCqn4xZaAIuKsJ36Hyh_NMLAaIz34j5Cx8UR8egzawkrY1nLdVWG6q0LtfVARGfiRwSYKSDwm9EXkKxU9iIhBmRFsYq4zLEsILEm6Ik9jLUlUku6-.jpg'),
  prog3: img('ztlO3aHmGX0xiIdIlpSaaDi-TFz_o6DJ6uxE1xqg8ltFFpoBi593Mr7RTXYTBDsE6urCP-z0I67JoSBfC3DAlXmcyfpASk50mIAQHx4NIAcKWym2KEgEeKDAbi_texaHJNkcWX1UnJGdiJGR9hxz1IfhTqz9AJRk_bPXJ0opwAA8qPvZdJCyyZT_n7H7PFJ8.jpg'),
  prog4: img('R7T211okNUWCN_XhrFmSpQiOi_aPVjjRP4rb3gipofzQKEfwu4yZtLK3fYSh7i808S6sih77jjN0ZQ4hxY1KYXDLZ6bqLv0k6En8OhrOaG1Yuxzhm5wSVeiKRSHnYU_CkR7I-0jyogY8L7hma7--1BLe4Pk716fq7Y8KqLQmPPJzFHigeHCUFT9jhgDMAETw.jpg'),
  step1: img('Am7UAYQkYk8s-WGtoR4hsL0CEstAUKBbzRDI-ph-ucTMUS8Dx5eHKbB1inOwDDZiXek-SGCCGbqLiUg1vC0EjjAS9nFktkxMBrRB1Gr8t8UZyHmDl2ikyrrmuECU8uEnxJCJXxQf1Atryj4vbTMafAuZb2H1XlAxoqaTh9YF8APPa9vvAdTZ3ihJyB0Bi1OJ.jpg'),
  step2: img('I6QCbgar8DFZ2xYXSL-b9lC7TCzzn_f4-cDvc_5M1vnh53EHN8-3HLvWS98hXuXJJYVc77XWr50SPOND6kB1cq6-YR4eeqtVfWzh1NZd3Bo-ejQuGdFfl0o14LZCvYQqZ29E_VvXFGwIXUwzwD8fxOWk-kT0Ogq9VWlX5G71ITqwX34REdqFrv_F2JGmN87B.jpg'),
  step3: img('gf1eDWxs0jLzlSD6t6_p5FzAhp-GyhMn-GieAR6StOJNxywc-BArkdMGPGuawjEfZyhoj7U82HFk1PDZgL1nz8HokH2HC6wmtT-dLosLC1tpHK2Um-JWcvzLQVOIKfNHifzhFh43f7RwSHhj1tbBTCb-FcclX8mIb1esuVLxQi--xe-JTxOICw_EfTHfJbL5.jpg'),
  gal1: img('l0CYD_8jrVqXnIJskbjEW0cJ1h9tSM2tQ-nX0DCjY--qlPDcFiuERMTW5K1NWhjyreW0kdWFkDM-QfqYk6pQ4DBHp861LfoBTOE-F3BYXBaRWXaUbg0M3skoEWBnXSAKUI18he37P3Z896PMAqHnqQMA4F552sMNOHhSn-0DI5Q1a8iwcFXS291mYPqBa1S1.jpg'),
  gal2: img('PXyqSUzqJN_4i92ipOrlWH8rG2WJ-wS3q8fZEQZE1FN7k4VJrVwu-ox9YiSC3FAKMtzYFD71X1kzyMjwSO1xvR3kF2m1EKdXsQHtStsfQo3n379_vLHifiLeIY-67iDhdrv4KYVh7NVoGolxbzuRr7Eu1fHIlfw6QpGa7b_wEW-9kEXKUdSm6TvmMPRHg3nm.jpg'),
  gal3: img('4Imqqxo8-XjSHWkjT3ZmsEtkxpqAGD09eH_V4cfqAI-Y6tizc0AXr96UAqb7XZI3zNu6i4GfG65hPXwQg0FAz_hV-uCDGP69qtMfLD8446gNPgwrYKSqIBo1HVgx-r0RG_nsLIfxm0y-I8KWZ2rFZDrfk4M1Gn0oyPSkaejb_s6zGs9F9Ab8TTTztidwxj45.jpg'),
};

export default function KidsPrivateClient() {
  const { t } = useTranslation();
  const kids = t('kids');

  return (
    <div>
      <HeroSection
        tag={kids.hero.tag}
        title={kids.hero.title}
        titleHighlight={kids.hero.titleHighlight}
        desc={kids.hero.desc}
        btnWA={kids.hero.btnWA}
        btnTrial={kids.hero.btnTrial}
        msgWA={kids.hero.msgWA}
        msgTrial={kids.hero.msgTrial}
        metric1={kids.hero.metric1}
        metric1Val={kids.hero.metric1Val}
        metric2={kids.hero.metric2}
        metric2Val={kids.hero.metric2Val}
        metric2Icon={kids.hero.metric2Icon}
        metric3={kids.hero.metric3}
        metric3Val={kids.hero.metric3Val}
        heroBg={I.hero}
        funImg={I.fun}
      />

      <ProgramSection
        tag={kids.programs.tag}
        title={kids.programs.title}
        sub={kids.programs.sub}
        cards={kids.programs.cards}
        btnWA={kids.programs.btnWA}
        images={[I.prog1, I.prog2, I.prog3, I.prog4]}
      />

      <LearningJourneySection
        tag={kids.journey.tag}
        title={kids.journey.title}
        sub={kids.journey.sub}
        steps={kids.journey.steps}
        images={[I.step1, I.step2, I.step3]}
      />

      <GallerySection
        tag={kids.gallery.tag}
        title={kids.gallery.title}
        sub={kids.gallery.sub}
        images={[I.gal1, I.gal2, I.gal3, I.prog3, I.prog1, I.prog2]}
      />

      <TestimonialSection
        tag={kids.testimonials.tag}
        title={kids.testimonials.title}
        sub={kids.testimonials.sub}
        cards={kids.testimonials.cards}
      />

      <FAQSection
        tag={kids.faq.tag}
        title={kids.faq.title}
        sub={kids.faq.sub}
        items={kids.faq.items}
      />

      <KidsCTASection
        tag={kids.cta.tag}
        title={kids.cta.title}
        desc={kids.cta.desc}
        btn={kids.cta.btn}
        msgWA={kids.hero.msgWA}
        bgImg={I.hero}
        funImg={I.fun}
      />

      <StickyWA msg={kids.hero.msgWA} label={kids.cta.btn} />
    </div>
  );
}
