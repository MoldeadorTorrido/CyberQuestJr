// Content for the "Spot the Phishing Email" puzzle (unit 3).
// The sender, brand, and email address are entirely fictional.
export const EMAIL_SEGMENTS = [
  {
    id: 'from',
    text: 'From: PixelPals Support <support@pixelpal-alerts.com>',
    section: 'header',
    suspicious: true,
    reason:
      'The address is spelled "pixelpal" instead of "PixelPals" — that\'s a trick to look real.',
  },
  {
    id: 'subject',
    text: 'Subject: You won a FREE prize!!! Claim NOW before it expires!!!',
    section: 'header',
    suspicious: true,
    reason:
      'A surprise free prize and a countdown are classic tricks to get you to click without thinking.',
  },
  {
    id: 'greeting',
    text: 'Hi there, thanks so much for playing PixelPals with us!',
    section: 'body',
    suspicious: false,
    reason: 'Just a friendly hello — nothing suspicious here.',
  },
  {
    id: 'password-request',
    text: 'To claim your prize, reply to this email with your password so we can verify your account.',
    section: 'body',
    suspicious: true,
    reason: 'A real company will never ask you to send your password by email.',
  },
  {
    id: 'chitchat',
    text: "We hope you're having fun exploring all the new levels!",
    section: 'body',
    suspicious: false,
    reason: "Just friendly chit-chat — it's not asking for anything or rushing you.",
  },
  {
    id: 'urgency',
    text: 'Hurry! This offer disappears in 10 minutes — act now!',
    section: 'body',
    suspicious: true,
    reason: 'Rushing you to act fast, before you have time to think, is a big red flag.',
  },
]
