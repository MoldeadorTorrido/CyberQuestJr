// Content for the "Lock It Up" puzzle (unit 7, Module 2).
// Mixes two related ideas under one "does this make sense?" framing: what a
// screen lock actually protects, and whether an app's permission request
// matches what the app does.
export const LOCK_ITEMS = [
  {
    id: 'l1',
    text: {
      en: 'A screen lock keeps a stranger out if you lose your tablet.',
      es: 'Un bloqueo de pantalla evita que un desconocido entre si pierdes tu tableta.',
    },
    answer: 'yes',
    reason: {
      en: 'Yes! A screen lock is exactly what keeps someone from opening your device if you lose it.',
      es: '¡Sí! Un bloqueo de pantalla es justo lo que evita que alguien abra tu dispositivo si lo pierdes.',
    },
  },
  {
    id: 'l2',
    text: {
      en: 'Telling a friend your unlock code so your lock can still keep things private.',
      es: 'Decirle tu código de desbloqueo a un amigo para que tu bloqueo siga manteniendo las cosas privadas.',
    },
    answer: 'no',
    reason: {
      en: "Once you share your code, your lock can't keep anything private anymore — not even from a friend.",
      es: 'En cuanto compartes tu código, tu bloqueo ya no puede mantener nada privado — ni siquiera de un amigo.',
    },
  },
  {
    id: 'l3',
    text: {
      en: 'A flashlight app asking to see your contacts.',
      es: 'Una app de linterna que pide ver tus contactos.',
    },
    answer: 'no',
    reason: {
      en: 'A flashlight app only needs to turn on a light — it has no reason to see who your contacts are.',
      es: 'Una app de linterna solo necesita encender una luz — no tiene ninguna razón para ver quiénes son tus contactos.',
    },
  },
  {
    id: 'l4',
    text: {
      en: 'A messaging app asking to see your contacts so you can find friends to chat with.',
      es: 'Una app de mensajes que pide ver tus contactos para ayudarte a encontrar amigos con quién chatear.',
    },
    answer: 'yes',
    reason: {
      en: 'That makes sense — a messaging app needs your contacts to help you find friends to talk to.',
      es: 'Eso tiene sentido — una app de mensajes necesita tus contactos para ayudarte a encontrar amigos con quién hablar.',
    },
  },
  {
    id: 'l5',
    text: {
      en: 'Leaving your tablet unlocked on a table at school.',
      es: 'Dejar tu tableta desbloqueada sobre una mesa en la escuela.',
    },
    answer: 'no',
    reason: {
      en: 'An unlocked device has no protection at all, even with a great code — you have to actually lock it!',
      es: 'Un dispositivo desbloqueado no tiene ninguna protección, aunque tengas un buen código — ¡tienes que bloquearlo de verdad!',
    },
  },
  {
    id: 'l6',
    text: {
      en: 'A video-calling app asking to use your microphone so people can hear you.',
      es: 'Una app de videollamadas que pide usar tu micrófono para que las personas puedan escucharte.',
    },
    answer: 'yes',
    reason: {
      en: "That makes sense — a video-calling app needs your microphone so the people you're talking to can hear you.",
      es: 'Eso tiene sentido — una app de videollamadas necesita tu micrófono para que las personas con las que hablas puedan escucharte.',
    },
  },
]
