// Content for the "Who Can I Tell My Password To?" puzzle (unit 4).
// Every scenario's correct choice is the same rule: never share it, only a
// parent/trusted grown-up. Wrong options are tempting-but-wrong middle
// grounds, not obviously silly, so the lesson has to actually land.
export const SCENARIOS = [
  {
    id: 'friend',
    prompt: {
      en: 'Your friend Jordan says: "Can I get your password? I want to check something on your account for you."',
      es: 'Tu amigo Jordan dice: "¿Me das tu contraseña? Quiero revisar algo en tu cuenta por ti."',
    },
    options: [
      { id: 'share', label: { en: 'Sure, here it is!', es: '¡Claro, aquí está!' }, correct: false },
      {
        id: 'partial',
        label: { en: "I'll just tell them part of it.", es: 'Le diré solo una parte.' },
        correct: false,
      },
      {
        id: 'refuse',
        label: {
          en: 'No thanks — my password is just for me and my parents.',
          es: 'No, gracias — mi contraseña es solo para mí y mis papás.',
        },
        correct: true,
      },
    ],
    reason: {
      en: "Even good friends shouldn't know your password. If Jordan needs help, a parent can help both of you safely.",
      es: 'Ni siquiera los buenos amigos deben saber tu contraseña. Si Jordan necesita ayuda, un adulto puede ayudarlos a los dos de forma segura.',
    },
  },
  {
    id: 'tech-support',
    prompt: {
      en: 'A message pops up: "This is Tech Support. We need your password to fix your account right now!"',
      es: 'Aparece un mensaje: "Somos Soporte Técnico. ¡Necesitamos tu contraseña para arreglar tu cuenta ahora mismo!"',
    },
    options: [
      {
        id: 'share',
        label: { en: 'Send it so they can fix it', es: 'Enviarla para que la arreglen' },
        correct: false,
      },
      {
        id: 'ask-proof',
        label: {
          en: 'Ask them to prove who they are, then share it',
          es: 'Pedirles que demuestren quiénes son y luego compartirla',
        },
        correct: false,
      },
      {
        id: 'refuse',
        label: {
          en: "Don't share it — tell a parent about the message",
          es: 'No compartirla — contarle a un adulto sobre el mensaje',
        },
        correct: true,
      },
    ],
    reason: {
      en: 'Real tech support never needs your password to fix anything. This is a trick — tell a grown-up right away.',
      es: 'El soporte técnico de verdad nunca necesita tu contraseña para arreglar nada. Esto es un truco — cuéntale a un adulto de inmediato.',
    },
  },
  {
    id: 'game-verify',
    prompt: {
      en: 'A game pop-up says: "Enter your password here to verify your account and win a prize!"',
      es: 'Una ventana del juego dice: "¡Ingresa tu contraseña aquí para verificar tu cuenta y ganar un premio!"',
    },
    options: [
      {
        id: 'enter',
        label: { en: 'Enter it to get the prize', es: 'Ingresarla para ganar el premio' },
        correct: false,
      },
      {
        id: 'shrug',
        label: {
          en: "It's just a game, so it's probably fine",
          es: 'Es solo un juego, así que probablemente está bien',
        },
        correct: false,
      },
      {
        id: 'refuse',
        label: {
          en: "Close it and tell a parent — real prizes don't need your password",
          es: 'Cerrarla y contarle a un adulto — los premios de verdad no necesitan tu contraseña',
        },
        correct: true,
      },
    ],
    reason: {
      en: 'A real game will never ask for your password to give you a prize. That kind of pop-up is a trick to steal it.',
      es: 'Un juego de verdad nunca te pedirá tu contraseña para darte un premio. Ese tipo de ventana es un truco para robarla.',
    },
  },
  {
    id: 'friend-account',
    prompt: {
      en: 'A message from what looks like your friend\'s account says: "Hey, it\'s me! I forgot my password — can you send me yours to check something?"',
      es: 'Un mensaje que parece venir de la cuenta de tu amigo dice: "¡Hola, soy yo! Se me olvidó mi contraseña — ¿me puedes enviar la tuya para revisar algo?"',
    },
    options: [
      {
        id: 'share',
        label: {
          en: 'Send it since it looks like my friend',
          es: 'Enviarla porque parece ser mi amigo',
        },
        correct: false,
      },
      {
        id: 'partial',
        label: {
          en: 'Ask a few questions first, then share it',
          es: 'Hacer algunas preguntas primero y luego compartirla',
        },
        correct: false,
      },
      {
        id: 'refuse',
        label: {
          en: "Don't send it — tell a parent, even if it looks like a friend",
          es: 'No enviarla — contarle a un adulto, aunque parezca un amigo',
        },
        correct: true,
      },
    ],
    reason: {
      en: "Sometimes a trickster uses a friend's account without them knowing. Never share your password, even if it looks like a friend is asking.",
      es: 'A veces alguien usa la cuenta de un amigo sin que él lo sepa. Nunca compartas tu contraseña, aunque parezca que un amigo te la está pidiendo.',
    },
  },
]
