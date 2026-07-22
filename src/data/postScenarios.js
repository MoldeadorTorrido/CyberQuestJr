// Content for the "Think Before You Post" puzzle (unit 8, Module 2).
// Deliberately mixes posts that are fine to share with ones worth rethinking
// — the lesson is "check first," not "never post anything."
export const POST_SCENARIOS = [
  {
    id: 'drawing',
    post: {
      en: 'A drawing you made of your favorite animal, with a caption: "I love drawing animals!"',
      es: 'Un dibujo que hiciste de tu animal favorito, con el mensaje: "¡Me encanta dibujar animales!"',
    },
    options: [
      {
        id: 'share',
        label: { en: 'Share it as-is', es: 'Compartirlo tal cual' },
        correct: true,
        consequence: {
          en: "This one's fine! It's just your art, with nothing personal in the picture.",
          es: '¡Este está bien! Es solo tu dibujo, sin nada personal en la imagen.',
        },
      },
      {
        id: 'rethink',
        label: { en: 'Rethink it first', es: 'Pensarlo primero' },
        correct: false,
        consequence: {
          en: "Good instinct to check, but this one doesn't show anything personal — it's safe to share.",
          es: 'Buen instinto revisar, pero este no muestra nada personal — es seguro compartirlo.',
        },
      },
    ],
  },
  {
    id: 'school-banner',
    post: {
      en: 'A photo from soccer practice, with your school\'s name clearly visible on a banner behind you.',
      es: 'Una foto del entrenamiento de fútbol, con el nombre de tu escuela bien visible en un cartel detrás de ti.',
    },
    options: [
      {
        id: 'share',
        label: { en: 'Share it as-is', es: 'Compartirla tal cual' },
        correct: false,
        consequence: {
          en: 'That banner shows exactly which school you go to — worth asking a parent before sharing this one.',
          es: 'Ese cartel muestra exactamente a qué escuela vas — vale la pena preguntarle a un adulto antes de compartir esta.',
        },
      },
      {
        id: 'rethink',
        label: { en: 'Rethink it first — ask a parent', es: 'Pensarlo primero — preguntarle a un adulto' },
        correct: true,
        consequence: {
          en: "Great call! It's still a fun photo — just worth checking with a parent first since your school is visible.",
          es: '¡Buena decisión! Sigue siendo una foto divertida — solo vale la pena revisarla con un adulto porque se ve tu escuela.',
        },
      },
    ],
  },
  {
    id: 'new-puppy',
    post: {
      en: 'A video of your new pet, with a caption: "Meet my new puppy, Max!"',
      es: 'Un video de tu nueva mascota, con el mensaje: "¡Les presento a mi nuevo cachorro, Max!"',
    },
    options: [
      {
        id: 'share',
        label: { en: 'Share it as-is', es: 'Compartirlo tal cual' },
        correct: true,
        consequence: {
          en: "This one's fine — a pet video with just a name doesn't give away where you live or go to school.",
          es: 'Este está bien — un video de una mascota con solo un nombre no revela dónde vives ni a qué escuela vas.',
        },
      },
      {
        id: 'rethink',
        label: { en: 'Rethink it first', es: 'Pensarlo primero' },
        correct: false,
        consequence: {
          en: "Good instinct to check, but this one's safe — it's just a happy pet video.",
          es: 'Buen instinto revisar, pero este es seguro — es solo un video feliz de una mascota.',
        },
      },
    ],
  },
  {
    id: 'home-alone',
    post: {
      en: 'A caption on a photo: "Just got home from school! I\'m home alone until 5pm today."',
      es: 'Un mensaje en una foto: "¡Acabo de llegar de la escuela! Hoy estoy solo(a) en casa hasta las 5pm."',
    },
    options: [
      {
        id: 'share',
        label: { en: 'Share it as-is', es: 'Compartirlo tal cual' },
        correct: false,
        consequence: {
          en: "This tells anyone watching exactly when you're home alone — that's the kind of detail to leave out.",
          es: 'Esto le dice a cualquiera exactamente cuándo estás solo(a) en casa — ese es el tipo de detalle que hay que evitar.',
        },
      },
      {
        id: 'rethink',
        label: { en: 'Rethink it first — leave that part out', es: 'Pensarlo primero — quitar esa parte' },
        correct: true,
        consequence: {
          en: 'Smart! Sharing that you got home is fine — just skip the part about being alone and for how long.',
          es: '¡Inteligente! Compartir que llegaste a casa está bien — solo evita la parte de que estás solo(a) y por cuánto tiempo.',
        },
      },
    ],
  },
]
