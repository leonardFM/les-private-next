'use client';

import React, { useEffect, useRef, useState } from 'react';

export function FadeIn({ children }) {
  const [show, setShow] = useState(false);
  const el = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(e.target); } },
      { threshold: 0.05 }
    );
    if (el.current) obs.observe(el.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={el}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
}
