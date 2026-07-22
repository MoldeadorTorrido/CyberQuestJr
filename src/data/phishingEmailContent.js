// Content for the "Spot the Phishing Email" puzzle (unit 3).
// The sender, brand, and email address are entirely fictional. "PixelPals"
// has a natural Spanish equivalent ("PixelAmigos") rather than staying
// untranslated, per the localization guidance to avoid awkward
// transliteration — the Spanish altered address mirrors the same "dropped
// letter" trick as the English one (pixelamigo vs. PixelAmigos).
export const EMAIL_SEGMENTS = [
  {
    id: 'from',
    text: {
      en: 'From: PixelPals Support <support@pixelpal-alerts.com>',
      es: 'De: Soporte de PixelAmigos <soporte@pixelamigo-alertas.com>',
    },
    section: 'header',
    suspicious: true,
    reason: {
      en: 'The address is spelled "pixelpal" instead of "PixelPals" — that\'s a trick to look real.',
      es: 'La dirección dice "pixelamigo" en vez de "PixelAmigos" — es un truco para parecer real.',
    },
  },
  {
    id: 'subject',
    text: {
      en: 'Subject: You won a FREE prize!!! Claim NOW before it expires!!!',
      es: 'Asunto: ¡GANASTE un premio GRATIS! ¡Reclámalo AHORA antes de que expire!',
    },
    section: 'header',
    suspicious: true,
    reason: {
      en: 'A surprise free prize and a countdown are classic tricks to get you to click without thinking.',
      es: 'Un premio gratis sorpresa y una cuenta regresiva son trucos clásicos para hacerte hacer clic sin pensar.',
    },
  },
  {
    id: 'greeting',
    text: {
      en: 'Hi there, thanks so much for playing PixelPals with us!',
      es: '¡Hola! Gracias por jugar PixelAmigos con nosotros.',
    },
    section: 'body',
    suspicious: false,
    reason: {
      en: 'Just a friendly hello — nothing suspicious here.',
      es: 'Solo un saludo amistoso — nada sospechoso aquí.',
    },
  },
  {
    id: 'password-request',
    text: {
      en: 'To claim your prize, reply to this email with your password so we can verify your account.',
      es: 'Para reclamar tu premio, responde este correo con tu contraseña para verificar tu cuenta.',
    },
    section: 'body',
    suspicious: true,
    reason: {
      en: 'A real company will never ask you to send your password by email.',
      es: 'Una empresa de verdad nunca te pedirá que envíes tu contraseña por correo.',
    },
  },
  {
    id: 'chitchat',
    text: {
      en: "We hope you're having fun exploring all the new levels!",
      es: '¡Esperamos que te estés divirtiendo explorando todos los niveles nuevos!',
    },
    section: 'body',
    suspicious: false,
    reason: {
      en: "Just friendly chit-chat — it's not asking for anything or rushing you.",
      es: 'Solo una charla amistosa — no te pide nada ni te apura.',
    },
  },
  {
    id: 'urgency',
    text: {
      en: 'Hurry! This offer disappears in 10 minutes — act now!',
      es: '¡Apúrate! Esta oferta desaparece en 10 minutos — ¡actúa ahora!',
    },
    section: 'body',
    suspicious: true,
    reason: {
      en: 'Rushing you to act fast, before you have time to think, is a big red flag.',
      es: 'Que te apuren a actuar rápido, antes de que puedas pensar, es una gran señal de alerta.',
    },
  },
]
