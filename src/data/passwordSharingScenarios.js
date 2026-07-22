// Content for the "Who Can I Tell My Password To?" puzzle (unit 4).
// Every scenario's correct choice is the same rule: never share it, only a
// parent/trusted grown-up. Wrong options are tempting-but-wrong middle
// grounds, not obviously silly, so the lesson has to actually land.
export const SCENARIOS = [
  {
    id: 'friend',
    prompt:
      'Your friend Jordan says: "Can I get your password? I want to check something on your account for you."',
    options: [
      { id: 'share', label: 'Sure, here it is!', correct: false },
      { id: 'partial', label: "I'll just tell them part of it.", correct: false },
      {
        id: 'refuse',
        label: 'No thanks — my password is just for me and my parents.',
        correct: true,
      },
    ],
    reason:
      "Even good friends shouldn't know your password. If Jordan needs help, a parent can help both of you safely.",
  },
  {
    id: 'tech-support',
    prompt:
      'A message pops up: "This is Tech Support. We need your password to fix your account right now!"',
    options: [
      { id: 'share', label: 'Send it so they can fix it', correct: false },
      {
        id: 'ask-proof',
        label: 'Ask them to prove who they are, then share it',
        correct: false,
      },
      {
        id: 'refuse',
        label: "Don't share it — tell a parent about the message",
        correct: true,
      },
    ],
    reason:
      'Real tech support never needs your password to fix anything. This is a trick — tell a grown-up right away.',
  },
  {
    id: 'game-verify',
    prompt:
      'A game pop-up says: "Enter your password here to verify your account and win a prize!"',
    options: [
      { id: 'enter', label: 'Enter it to get the prize', correct: false },
      { id: 'shrug', label: "It's just a game, so it's probably fine", correct: false },
      {
        id: 'refuse',
        label: "Close it and tell a parent — real prizes don't need your password",
        correct: true,
      },
    ],
    reason:
      'A real game will never ask for your password to give you a prize. That kind of pop-up is a trick to steal it.',
  },
  {
    id: 'friend-account',
    prompt:
      'A message from what looks like your friend\'s account says: "Hey, it\'s me! I forgot my password — can you send me yours to check something?"',
    options: [
      { id: 'share', label: 'Send it since it looks like my friend', correct: false },
      { id: 'partial', label: 'Ask a few questions first, then share it', correct: false },
      {
        id: 'refuse',
        label: "Don't send it — tell a parent, even if it looks like a friend",
        correct: true,
      },
    ],
    reason:
      "Sometimes a trickster uses a friend's account without them knowing. Never share your password, even if it looks like a friend is asking.",
  },
]
