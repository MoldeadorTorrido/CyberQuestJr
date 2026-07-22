// Example passwords for the "Weak or Strong?" puzzle.
// All examples are fictional/generic — no real names, brands, or personal data.
// `password` is language-independent puzzle data (the literal example
// string); `reason`/`hint` are bilingual { en, es } display text.
export const WEAK_OR_STRONG_ITEMS = [
  {
    id: 'p1',
    password: '123456',
    answer: 'weak',
    reason: {
      en: "It's just numbers in order — one of the first guesses anyone (or any computer) would try.",
      es: 'Son solo números en orden — es de las primeras cosas que cualquiera (o una computadora) probaría.',
    },
    hint: {
      en: 'Is it just numbers in a row? That kind of pattern is easy to guess.',
      es: '¿Son solo números seguidos? Ese patrón es fácil de adivinar.',
    },
  },
  {
    id: 'p2',
    password: 'password',
    answer: 'weak',
    reason: {
      en: 'The word "password" is the most guessed password there is!',
      es: '¡La palabra "password" es una de las contraseñas más adivinadas que existen!',
    },
    hint: {
      en: 'Is it a common word people might try first?',
      es: '¿Es una palabra común que la gente probaría primero?',
    },
  },
  {
    id: 'p3',
    password: 'buddy2015',
    answer: 'weak',
    reason: {
      en: 'A pet name plus a year is easy to guess if someone knows a little about you.',
      es: 'Un apodo de mascota más un año es fácil de adivinar si alguien sabe un poco sobre ti.',
    },
    hint: {
      en: 'Does it use a pet name or a year? That could be personal info.',
      es: '¿Usa el nombre de una mascota o un año? Eso podría ser información personal.',
    },
  },
  {
    id: 'p4',
    password: 'Tiger$Jumps42!',
    answer: 'strong',
    reason: {
      en: "It's long and mixes capital letters, symbols, and numbers — not a real fact about you.",
      es: 'Es larga y combina mayúsculas, símbolos y números — y no es un dato real sobre ti.',
    },
    hint: {
      en: 'Count the letters, numbers, and symbols — is there a good mix?',
      es: 'Cuenta las letras, números y símbolos — ¿hay una buena mezcla?',
    },
  },
  {
    id: 'p5',
    password: 'Purple7Clouds*Fly',
    answer: 'strong',
    reason: {
      en: "It's long, random, and easy for you to remember but hard for anyone to guess.",
      es: 'Es larga, aleatoria, y fácil de recordar para ti, pero difícil de adivinar para los demás.',
    },
    hint: {
      en: 'Is it long, and does it avoid real facts about you?',
      es: '¿Es larga y evita datos reales sobre ti?',
    },
  },
  {
    id: 'p6',
    password: 'iloveyou',
    answer: 'weak',
    reason: {
      en: 'It uses common words with no numbers or symbols, so it is easy to guess.',
      es: 'Usa palabras comunes sin números ni símbolos, así que es fácil de adivinar.',
    },
    hint: {
      en: 'Is it a common phrase with no numbers or symbols?',
      es: '¿Es una frase común sin números ni símbolos?',
    },
  },
]
