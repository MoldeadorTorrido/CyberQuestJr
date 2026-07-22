// Example passwords for the "Weak or Strong?" puzzle.
// All examples are fictional/generic — no real names, brands, or personal data.
export const WEAK_OR_STRONG_ITEMS = [
  {
    id: 'p1',
    password: '123456',
    answer: 'weak',
    reason: "It's just numbers in order — one of the first guesses anyone (or any computer) would try.",
    hint: 'Is it just numbers in a row? That kind of pattern is easy to guess.',
  },
  {
    id: 'p2',
    password: 'password',
    answer: 'weak',
    reason: 'The word "password" is the most guessed password there is!',
    hint: 'Is it a common word people might try first?',
  },
  {
    id: 'p3',
    password: 'buddy2015',
    answer: 'weak',
    reason: 'A pet name plus a year is easy to guess if someone knows a little about you.',
    hint: 'Does it use a pet name or a year? That could be personal info.',
  },
  {
    id: 'p4',
    password: 'Tiger$Jumps42!',
    answer: 'strong',
    reason: "It's long and mixes capital letters, symbols, and numbers — not a real fact about you.",
    hint: 'Count the letters, numbers, and symbols — is there a good mix?',
  },
  {
    id: 'p5',
    password: 'Purple7Clouds*Fly',
    answer: 'strong',
    reason: "It's long, random, and easy for you to remember but hard for anyone to guess.",
    hint: 'Is it long, and does it avoid real facts about you?',
  },
  {
    id: 'p6',
    password: 'iloveyou',
    answer: 'weak',
    reason: 'It uses common words with no numbers or symbols, so it is easy to guess.',
    hint: 'Is it a common phrase with no numbers or symbols?',
  },
]
