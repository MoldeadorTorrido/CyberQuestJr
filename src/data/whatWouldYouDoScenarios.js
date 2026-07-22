// Content for the "What Would You Do?" puzzle (unit 6).
// Each short scenario is a branching moment: one unsafe choice and one safe
// choice (don't click, tell a trusted adult), each revealing what happens
// next once picked.
export const SCENARIOS = [
  {
    id: 'video-link',
    story:
      'A text message from a number you don\'t know says: "OMG look at this funny video of you 😂" with a link.',
    options: [
      {
        id: 'click',
        label: 'Click the link to see the video',
        correct: false,
        consequence:
          'Clicking links from strangers can lead to trouble, even when they sound fun and harmless.',
      },
      {
        id: 'tell-adult',
        label: "Don't click — show a trusted adult",
        correct: true,
        consequence:
          "Great instinct! A trusted adult can help you figure out if it's safe.",
      },
    ],
  },
  {
    id: 'birthday-reply',
    story:
      'An email says: "Your favorite game account needs you to reply with your birthday to keep playing."',
    options: [
      {
        id: 'reply',
        label: 'Reply with your birthday',
        correct: false,
        consequence:
          'Real games never need personal info sent by email just to keep working.',
      },
      {
        id: 'tell-adult',
        label: "Don't reply — tell a parent about the email",
        correct: true,
        consequence: "That's the safe move! A parent can help check if the email is real.",
      },
    ],
  },
  {
    id: 'virus-popup',
    story: 'A pop-up on a website says: "WARNING! Your device has a virus! Click here now to fix it!"',
    options: [
      {
        id: 'click-fix',
        label: 'Click here now to fix it',
        correct: false,
        consequence:
          'Scary pop-ups like this are usually fake, and clicking them can cause real trouble.',
      },
      {
        id: 'close-tell',
        label: 'Close the pop-up and tell an adult',
        correct: true,
        consequence: 'Perfect! Closing it and telling an adult keeps your device safe.',
      },
    ],
  },
]
