// Content for the "What Would You Do?" puzzle (unit 6).
// Each short scenario is a branching moment: one unsafe choice and one safe
// choice (don't click, tell a trusted adult), each revealing what happens
// next once picked.
export const SCENARIOS = [
  {
    id: 'video-link',
    story: {
      en: 'A text message from a number you don\'t know says: "OMG look at this funny video of you 😂" with a link.',
      es: 'Un mensaje de texto de un número que no conoces dice: "Mira este video gracioso tuyo 😂" con un enlace.',
    },
    options: [
      {
        id: 'click',
        label: { en: 'Click the link to see the video', es: 'Hacer clic en el enlace para ver el video' },
        correct: false,
        consequence: {
          en: 'Clicking links from strangers can lead to trouble, even when they sound fun and harmless.',
          es: 'Hacer clic en enlaces de desconocidos puede causar problemas, aunque suenen divertidos e inofensivos.',
        },
      },
      {
        id: 'tell-adult',
        label: {
          en: "Don't click — show a trusted adult",
          es: 'No hacer clic — mostrárselo a un adulto de confianza',
        },
        correct: true,
        consequence: {
          en: "Great instinct! A trusted adult can help you figure out if it's safe.",
          es: '¡Buen instinto! Un adulto de confianza puede ayudarte a saber si es seguro.',
        },
      },
    ],
  },
  {
    id: 'birthday-reply',
    story: {
      en: 'An email says: "Your favorite game account needs you to reply with your birthday to keep playing."',
      es: 'Un correo dice: "Tu cuenta del juego favorito necesita que respondas con tu fecha de nacimiento para seguir jugando."',
    },
    options: [
      {
        id: 'reply',
        label: { en: 'Reply with your birthday', es: 'Responder con tu fecha de nacimiento' },
        correct: false,
        consequence: {
          en: 'Real games never need personal info sent by email just to keep working.',
          es: 'Los juegos de verdad nunca necesitan que envíes información personal por correo solo para seguir funcionando.',
        },
      },
      {
        id: 'tell-adult',
        label: {
          en: "Don't reply — tell a parent about the email",
          es: 'No responder — contarle a un adulto sobre el correo',
        },
        correct: true,
        consequence: {
          en: "That's the safe move! A parent can help check if the email is real.",
          es: '¡Esa es la jugada segura! Un adulto puede ayudarte a revisar si el correo es real.',
        },
      },
    ],
  },
  {
    id: 'virus-popup',
    story: {
      en: 'A pop-up on a website says: "WARNING! Your device has a virus! Click here now to fix it!"',
      es: 'Una ventana emergente en un sitio web dice: "¡ADVERTENCIA! ¡Tu dispositivo tiene un virus! ¡Haz clic aquí ahora para arreglarlo!"',
    },
    options: [
      {
        id: 'click-fix',
        label: { en: 'Click here now to fix it', es: 'Hacer clic aquí ahora para arreglarlo' },
        correct: false,
        consequence: {
          en: 'Scary pop-ups like this are usually fake, and clicking them can cause real trouble.',
          es: 'Este tipo de ventanas emergentes casi siempre son falsas, y hacer clic en ellas puede causar problemas de verdad.',
        },
      },
      {
        id: 'close-tell',
        label: { en: 'Close the pop-up and tell an adult', es: 'Cerrar la ventana y contarle a un adulto' },
        correct: true,
        consequence: {
          en: 'Perfect! Closing it and telling an adult keeps your device safe.',
          es: '¡Perfecto! Cerrarla y contarle a un adulto mantiene tu dispositivo seguro.',
        },
      },
    ],
  },
]
