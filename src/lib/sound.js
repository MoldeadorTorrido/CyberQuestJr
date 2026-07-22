// Short sound effects synthesized with the Web Audio API — no audio files to
// fetch, so this stays consistent with "no external network calls".
let audioCtx = null

// Browsers create/keep the AudioContext "suspended" until a user gesture
// resumes it, and resume() is async — scheduling tones before it resolves
// means the very first call gets silently dropped. Awaiting it here fixes
// the "first click makes no sound" issue.
async function getContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioCtx = new AudioContextClass()
  }
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume()
  }
  return audioCtx
}

function playTone(ctx, { freq, startTime = 0, duration = 0.18, type = 'sine', gainPeak = 0.16 }) {
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = type
  oscillator.frequency.value = freq

  const now = ctx.currentTime + startTime
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(gainPeak, now + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  oscillator.connect(gain).connect(ctx.destination)
  oscillator.start(now)
  oscillator.stop(now + duration + 0.02)
}

export async function playCorrectTone() {
  const ctx = await getContext()
  playTone(ctx, { freq: 660, duration: 0.14, gainPeak: 0.15 })
  playTone(ctx, { freq: 880, startTime: 0.09, duration: 0.18, gainPeak: 0.17 })
}

export async function playIncorrectTone() {
  const ctx = await getContext()
  playTone(ctx, { freq: 320, duration: 0.22, type: 'triangle', gainPeak: 0.13 })
}

export async function playBadgeTone() {
  const ctx = await getContext()
  playTone(ctx, { freq: 523.25, duration: 0.16, gainPeak: 0.15 })
  playTone(ctx, { freq: 659.25, startTime: 0.11, duration: 0.16, gainPeak: 0.16 })
  playTone(ctx, { freq: 783.99, startTime: 0.22, duration: 0.28, gainPeak: 0.18 })
}
