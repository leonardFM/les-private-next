'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../../admin.module.css';

export default function PaymentButton({ studentId, student, amount, packageName, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const snapReady = useRef(false);
  const snapInit = useRef(false);

  useEffect(() => {
    if (snapInit.current) return;
    snapInit.current = true;

    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true';
    const snapUrl = isProduction
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    if (!clientKey) {
      console.warn('[Midtrans] NEXT_PUBLIC_MIDTRANS_CLIENT_KEY is not set');
      return;
    }

    if (document.querySelector(`script[src="${snapUrl}"]`)) {
      snapReady.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = snapUrl;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;
    script.onload = () => {
      console.log('[Midtrans] Snap script loaded');
      snapReady.current = true;
    };
    script.onerror = () => {
      console.error('[Midtrans] Failed to load Snap script');
    };
    document.body.appendChild(script);
  }, []);

  async function handlePay() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, amount, package_name: packageName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create payment');
        return;
      }

      if (!data.snap_token) {
        setError('Missing snap token from server');
        return;
      }

      if (typeof window.snap === 'undefined' || !snapReady.current) {
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
          return;
        }
        setError('Payment system is still loading. Please try again.');
        return;
      }

      window.snap.pay(data.snap_token, {
        onSuccess: () => { if (onSuccess) onSuccess(); },
        onPending: () => {},
        onError: () => { setError('Payment failed'); },
        onClose: () => {},
      });
    } catch (err) {
      setError('Failed to process payment');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handlePay}
        disabled={loading}
        className={styles.addBtn}
      >
        {loading ? 'Processing...' : `Pay Rp ${Number(amount).toLocaleString()}`}
      </button>
      {error && (
        <p style={{ color: 'var(--danger-color)', fontSize: 13, marginTop: 8, padding: '8px 12px', background: '#FEF2F2', borderRadius: 6, border: '1px solid #FECACA' }}>
          {error}
        </p>
      )}
    </div>
  );
}
