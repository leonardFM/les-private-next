import crypto from 'crypto';
import MidtransClient from 'midtrans-client';

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const serverKey = process.env.MIDTRANS_SERVER_KEY;
const clientKey = process.env.MIDTRANS_CLIENT_KEY;

let snapInstance;

function getSnap() {
  if (!snapInstance) {
    if (!serverKey || !clientKey) {
      throw new Error('MIDTRANS_SERVER_KEY and MIDTRANS_CLIENT_KEY must be set');
    }
    snapInstance = new MidtransClient.Snap({
      isProduction,
      serverKey,
      clientKey,
    });
  }
  return snapInstance;
}

export function getClientKey() {
  return clientKey;
}

export function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `LES-${timestamp}-${random}`;
}

export async function createTransaction(orderId, amount, customer) {
  const snap = getSnap();
  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    customer_details: {
      first_name: customer.name || 'Student',
      email: customer.email || '',
      phone: customer.phone || '',
    },
  };
  const transaction = await snap.createTransaction(parameter);
  return {
    snapToken: transaction.token,
    redirectUrl: transaction.redirect_url,
  };
}

export function verifySignature(orderId, statusCode, grossAmount, signatureKey) {
  const hash = crypto
    .createHash('sha512')
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest('hex');
  return hash === signatureKey;
}

const STATUS_MAP = {
  capture: 'paid',
  settlement: 'paid',
  pending: 'pending',
  deny: 'failed',
  cancel: 'failed',
  expire: 'expired',
  refund: 'refunded',
  partial_refund: 'refunded',
  authorize: 'pending',
};

export function mapTransactionStatus(transactionStatus) {
  return STATUS_MAP[transactionStatus] || 'pending';
}

export function isPaymentSuccess(transactionStatus) {
  return ['capture', 'settlement'].includes(transactionStatus);
}
