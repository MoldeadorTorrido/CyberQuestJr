// Content for the "Too Good to Be True" puzzle (unit 9, Module 2).
// Extends Module 1's phishing pattern-recognition into new formats:
// in-game pop-ups and prize offers instead of email.
export const OFFER_ITEMS = [
  {
    id: 'o1',
    text: {
      en: 'Pop-up: "Congratulations! You\'ve won 1000 free gems! Enter your account password to claim."',
      es: 'Ventana emergente: "¡Felicidades! ¡Ganaste 1000 gemas gratis! Ingresa la contraseña de tu cuenta para reclamarlas."',
    },
    answer: 'scam',
    reason: {
      en: 'A surprise prize AND a request for your password together — that combo is always a scam.',
      es: 'Un premio sorpresa Y pedirte tu contraseña juntos — esa combinación siempre es una estafa.',
    },
  },
  {
    id: 'o2',
    text: {
      en: "In-game message: \"Great job finishing the level! Here are 10 coins as a reward.\"",
      es: 'Mensaje del juego: "¡Buen trabajo terminando el nivel! Aquí tienes 10 monedas de recompensa."',
    },
    answer: 'safe',
    reason: {
      en: "This is just a normal reward for playing — it doesn't ask you for anything.",
      es: 'Esto es solo una recompensa normal por jugar — no te pide nada.',
    },
  },
  {
    id: 'o3',
    text: {
      en: 'Pop-up: "You are the 1,000,000th visitor! Click now to claim your free prize!"',
      es: 'Ventana emergente: "¡Eres el visitante número 1,000,000! ¡Haz clic ahora para reclamar tu premio gratis!"',
    },
    answer: 'scam',
    reason: {
      en: "You can't actually be a random \"millionth visitor\" — that's a classic made-up prize trick.",
      es: 'En realidad no puedes ser un "visitante número un millón" al azar — es un truco clásico de premio inventado.',
    },
  },
  {
    id: 'o4',
    text: {
      en: 'Message: "New update available — tap to see what\'s new in this update!"',
      es: 'Mensaje: "Nueva actualización disponible — toca para ver qué hay de nuevo en esta actualización."',
    },
    answer: 'safe',
    reason: {
      en: "A normal update notice doesn't rush you or ask for your password — this one's fine.",
      es: 'Un aviso de actualización normal no te apura ni te pide tu contraseña — este está bien.',
    },
  },
  {
    id: 'o5',
    text: {
      en: 'Pop-up: "Your account will be banned in 5 minutes unless you verify by entering your password now!"',
      es: 'Ventana emergente: "¡Tu cuenta será bloqueada en 5 minutos a menos que verifiques ingresando tu contraseña ahora!"',
    },
    answer: 'scam',
    reason: {
      en: 'A countdown plus a password request is designed to panic you into not thinking it through — a big red flag.',
      es: 'Una cuenta regresiva junto con pedir tu contraseña está hecho para asustarte y que no lo pienses bien — una gran señal de alerta.',
    },
  },
  {
    id: 'o6',
    text: {
      en: "Message from the game: \"You unlocked a new level! Keep playing to see what's next.\"",
      es: 'Mensaje del juego: "¡Desbloqueaste un nuevo nivel! Sigue jugando para ver qué sigue."',
    },
    answer: 'safe',
    reason: {
      en: "This is just normal game progress — no prize, no urgency, no request for personal info.",
      es: 'Esto es solo progreso normal del juego — sin premio, sin urgencia, sin pedir información personal.',
    },
  },
]
