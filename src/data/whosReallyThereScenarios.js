// Content for the "Who's Really There?" puzzle (unit 10, Module 2).
// Approved per draft-whos-really-there.md — copy is taken verbatim from that
// draft. Each item is an independent, self-contained pattern check (no
// narrative continuity between them). Every item's correct answer is the
// same single action: stop, don't reply, tell a trusted adult.
export const SCENARIOS = [
  {
    id: 'secrecy-from-parents',
    prompt: {
      en: 'Someone you\'re playing an online game with says: "Let\'s keep this friendship just between us — don\'t tell your parents about me."',
      es: 'Alguien con quien juegas un juego en línea te dice: "Mantengamos esta amistad solo entre nosotros — no le cuentes a tus papás sobre mí."',
    },
    options: [
      {
        id: 'seems-fine',
        label: { en: 'This seems fine — we\'re just friends', es: 'Está bien, solo somos amigos' },
        correct: false,
      },
      {
        id: 'red-flag',
        label: {
          en: 'This is a red flag — stop, don\'t reply, and tell a trusted adult',
          es: 'Esto es una señal de alerta — detente, no respondas, y cuéntale a un adulto de confianza',
        },
        correct: true,
      },
    ],
    reason: {
      en: "Asking you to keep a secret from your parents is a red flag, even if it feels like a special friendship. Tell a trusted adult right away — you won't be in trouble.",
      es: 'Pedirte que guardes un secreto de tus papás es una señal de alerta, aunque se sienta como una amistad especial. Cuéntale a un adulto de confianza de inmediato — no te vas a meter en problemas.',
    },
  },
  {
    id: 'move-to-different-app',
    prompt: {
      en: 'Someone from a game asks you to switch to a different app or website to keep talking.',
      es: 'Alguien de un juego te pide que cambien a otra app o sitio web para seguir hablando.',
    },
    options: [
      {
        id: 'seems-fine',
        label: { en: 'Sure, that seems normal', es: 'Claro, eso parece normal' },
        correct: false,
      },
      {
        id: 'red-flag',
        label: {
          en: 'This is a red flag — stop, don\'t reply, and tell a trusted adult',
          es: 'Esto es una señal de alerta — detente, no respondas, y cuéntale a un adulto de confianza',
        },
        correct: true,
      },
    ],
    reason: {
      en: "Asking to move somewhere else, especially somewhere more private, is a red flag — even if they seem nice. Don't delete the messages; tell a trusted adult and show them.",
      es: 'Pedirte que se cambien a otro lugar, sobre todo uno más privado, es una señal de alerta — aunque parezca buena persona. No borres los mensajes; cuéntale a un adulto de confianza y muéstraselos.',
    },
  },
  {
    id: 'asking-for-photos',
    prompt: {
      en: 'Someone online asks you to send them a photo of yourself.',
      es: 'Alguien en línea te pide que le envíes una foto tuya.',
    },
    options: [
      {
        id: 'seems-fine',
        label: { en: "That seems okay if they're my friend", es: 'Eso parece estar bien si es mi amigo' },
        correct: false,
      },
      {
        id: 'red-flag',
        label: {
          en: 'This is a red flag — stop, don\'t reply, and tell a trusted adult',
          es: 'Esto es una señal de alerta — detente, no respondas, y cuéntale a un adulto de confianza',
        },
        correct: true,
      },
    ],
    reason: {
      en: "Asking for photos is a red flag, no matter how long you've known them or how nice they've been. Tell a trusted adult right away.",
      es: 'Pedir fotos es una señal de alerta, sin importar cuánto tiempo lo conozcas o qué tan amable haya sido. Cuéntale a un adulto de confianza de inmediato.',
    },
  },
  {
    id: 'gifts-for-secrecy',
    prompt: {
      en: 'Someone offers you free in-game currency or a gift if you keep talking to them a secret, or if you share personal details.',
      es: 'Alguien te ofrece monedas del juego gratis o un regalo si sigues hablando con él en secreto, o si compartes información personal.',
    },
    options: [
      {
        id: 'seems-fine',
        label: { en: "That's just a nice gift", es: 'Es solo un regalo bonito' },
        correct: false,
      },
      {
        id: 'red-flag',
        label: {
          en: 'This is a red flag — stop, don\'t reply, and tell a trusted adult',
          es: 'Esto es una señal de alerta — detente, no respondas, y cuéntale a un adulto de confianza',
        },
        correct: true,
      },
    ],
    reason: {
      en: 'A real gift never comes with a condition to keep a secret. This is a red flag — tell a trusted adult, even if you already said yes.',
      es: 'Un regalo de verdad nunca viene con la condición de guardar un secreto. Esto es una señal de alerta — cuéntale a un adulto de confianza, aunque ya hayas dicho que sí.',
    },
  },
  {
    id: 'meet-in-person',
    prompt: {
      en: 'Someone you only know from a game or chat asks to meet you in person.',
      es: 'Alguien que solo conoces de un juego o chat te pide verse en persona.',
    },
    options: [
      {
        id: 'seems-fine',
        label: { en: 'That could be fun', es: 'Podría ser divertido' },
        correct: false,
      },
      {
        id: 'red-flag',
        label: {
          en: 'This is a red flag — stop, don\'t reply, and tell a trusted adult',
          es: 'Esto es una señal de alerta — detente, no respondas, y cuéntale a un adulto de confianza',
        },
        correct: true,
      },
    ],
    reason: {
      en: 'Never agree to meet up with someone you only know online. This is always a red flag — tell a trusted adult right away, no matter what they promised.',
      es: 'Nunca aceptes verte en persona con alguien que solo conoces en línea. Esto siempre es una señal de alerta — cuéntale a un adulto de confianza de inmediato, sin importar lo que haya prometido.',
    },
  },
]
