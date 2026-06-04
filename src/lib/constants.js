export const WHATSAPP_NUMBER = '+62895613163308'

export function getWhatsAppUrl(message = '') {
  const text = encodeURIComponent(message || 'Halo! Saya tertarik dengan program les private di El\'s Corner. Mohon informasinya.')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export const KIDS_WHATSAPP_MESSAGE = `Halo, saya ingin mengetahui informasi program English for Kids.

Nama Orang Tua:
Nama Anak:
Usia Anak:
Lokasi:`
