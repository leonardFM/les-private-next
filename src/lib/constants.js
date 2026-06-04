export const WHATSAPP_NUMBER = '+62895613163308'

export function getWhatsAppUrl(message = '') {
  const text = encodeURIComponent(message || 'Halo! Saya tertarik dengan program les private di Lexicon English Academy. Mohon informasinya.')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}
