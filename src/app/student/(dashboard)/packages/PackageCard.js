'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../student.module.css';

export default function PackageCard({ pkg, userId }) {
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

  const handlePurchase = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      console.log('[Payment] Creating payment for package:', pkg.id);

      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          package_id: pkg.id,
          amount: pkg.price,
        }),
      });

      const data = await res.json();
      console.log('[Payment] API response:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      if (!data.snap_token) {
        throw new Error('Missing snap token from server');
      }

      console.log('[Payment] snap_token received:', data.snap_token);

      if (data.redirect_url) {
        console.log('[Payment] redirect_url available:', data.redirect_url);
      }

      if (typeof window.snap === 'undefined' || !snapReady.current) {
        console.warn('[Payment] window.snap not ready, using redirect fallback');
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
          return;
        }
        throw new Error('Payment system is still loading. Please try again.');
      }

      console.log('[Payment] Calling window.snap.pay()');
      window.snap.pay(data.snap_token, {
        onSuccess: function () {
          console.log('[Payment] Snap onSuccess');
          window.location.href = '/student/my-packages';
        },
        onPending: function () {
          console.log('[Payment] Snap onPending');
          window.location.href = '/student/payments';
        },
        onError: function (result) {
          console.error('[Payment] Snap onError:', result);
          setError('Payment failed. Please try again.');
          setLoading(false);
        },
        onClose: function () {
          console.log('[Payment] Snap onClose');
          setLoading(false);
        },
      });
    } catch (err) {
      console.error('[Payment] Error:', err);
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  }, [pkg, userId]);

  return (
    <div className={styles.card} style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 'var(--text-xl)', fontWeight: 700 }}>{pkg.name}</h3>
      {pkg.description && (
        <p style={{ margin: '0 0 16px', color: 'var(--foreground-muted, #6B7280)', fontSize: 'var(--text-sm)', flex: 1 }}>
          {pkg.description}
        </p>
      )}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground-muted, #6B7280)', marginBottom: 4 }}>
          Total Sessions
        </div>
        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{pkg.total_sessions} sessions</div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--primary-blue, #004AAD)' }}>
          Rp {Number(pkg.price).toLocaleString()}
        </div>
      </div>
      {error && (
        <div style={{ color: '#DC2626', fontSize: 'var(--text-xs)', marginBottom: 12, padding: '8px 12px', background: '#FEF2F2', borderRadius: 'var(--radius-sm)', border: '1px solid #FECACA' }}>
          {error}
        </div>
      )}
      <button
        onClick={handlePurchase}
        disabled={loading}
        className={styles.actionBtn}
        style={{ width: '100%', justifyContent: 'center', padding: '12px 24px' }}
      >
        {loading ? 'Processing...' : 'Purchase'}
      </button>
    </div>
  );
}
