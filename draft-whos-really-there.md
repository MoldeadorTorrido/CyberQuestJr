# Draft: "Who's Really There?" (Module 2, Unit 4)

**Status: APPROVED AND IMPLEMENTED.** Built in `src/puzzles/WhosReallyThere.jsx` and
`src/data/whosReallyThereScenarios.js`, using this copy verbatim. Two of the three
open questions below were resolved as a judgment call rather than explicit answers
(see note at the bottom) — flag if either should change.

## How this draft follows the spec's guidance

- **Pattern-level, not narrative.** No storyline about one child and one predator
  built up over multiple screens. Each of the 5 items below is an independent,
  self-contained "someone does X" statement — no continuity between them, no
  implied relationship arc.
- **The 5 patterns are exactly the ones the spec lists**, in the same order: secrecy
  from parents, moving to a different app, asking for photos, gifts/currency in
  exchange for secrecy or personal info, asking to meet in person.
- **Every item resolves to the same single correct action**: stop responding, don't
  delete the messages, tell a trusted adult right away. To keep this unambiguous
  (rather than offering a plausible-sounding wrong option that might read as
  "sometimes okay"), each item is a simple two-choice check: *"This seems fine"*
  vs. *"This is a red flag."* The red-flag choice is always correct.
- **Reinforces the three explicit callouts** from the spec (applies even to
  gradual/seeming-friends, never the child's fault, especially-if-told-not-to-tell)
  — spread across the item reasons and a closing message, rather than crammed into
  every single line.
- **Nothing about method.** No item describes *how* someone might build trust or
  what a manipulative message actually sounds like in detail — each pattern is
  named plainly (e.g., "asks to keep it secret from your parents"), not
  dramatized.

## Proposed mechanic (matching the rest of Module 2)

Same shape as unit 4 ("Who Can I Tell My Password To?"): one pattern-check at a
time, tap an answer, see why, tap Next. Stars based on mistakes, same non-punitive
formula as every other unit (3/2/1, minimum 1, never blocks completion). Same
intro screen + re-openable "?" help pattern. Badge: `digital-safety` (shared with
the rest of Module 2, only earnable once all 5 Module 2 units exist and are
complete).

---

## Intro screen

**EN**
- Heading: *Who's Really There?*
- Body: *Most people you meet in games or chats are exactly who they say they
  are. But sometimes, someone isn't telling the truth about who they really are.
  This helps you notice signs that something feels off — and exactly what to do
  about it: stop, don't reply, and tell a trusted adult.*

**ES**
- Heading: *¿Quién Está Realmente Ahí?*
- Body: *La mayoría de las personas que conoces en juegos o chats son
  exactamente quienes dicen ser. Pero a veces, alguien no está diciendo la
  verdad sobre quién es realmente. Esto te ayuda a notar señales de que algo no
  está bien — y exactamente qué hacer: detente, no respondas, y cuéntale a un
  adulto de confianza.*

---

## Item 1 — secrecy from parents

**EN**
- Pattern: *Someone you're playing an online game with says: "Let's keep this
  friendship just between us — don't tell your parents about me."*
- Option A (incorrect): *This seems fine — we're just friends*
- Option B (correct): *This is a red flag — stop, don't reply, and tell a
  trusted adult*
- Reason shown on the correct answer: *Asking you to keep a secret from your
  parents is a red flag, even if it feels like a special friendship. Tell a
  trusted adult right away — you won't be in trouble.*

**ES**
- Pattern: *Alguien con quien juegas un juego en línea te dice: "Mantengamos
  esta amistad solo entre nosotros — no le cuentes a tus papás sobre mí."*
- Opción A (incorrecta): *Está bien, solo somos amigos*
- Opción B (correcta): *Esto es una señal de alerta — detente, no respondas, y
  cuéntale a un adulto de confianza*
- Razón: *Pedirte que guardes un secreto de tus papás es una señal de alerta,
  aunque se sienta como una amistad especial. Cuéntale a un adulto de confianza
  de inmediato — no te vas a meter en problemas.*

---

## Item 2 — moving to a different app

**EN**
- Pattern: *Someone from a game asks you to switch to a different app or
  website to keep talking.*
- Option A (incorrect): *Sure, that seems normal*
- Option B (correct): *This is a red flag — stop, don't reply, and tell a
  trusted adult*
- Reason: *Asking to move somewhere else, especially somewhere more private, is
  a red flag — even if they seem nice. Don't delete the messages; tell a
  trusted adult and show them.*

**ES**
- Pattern: *Alguien de un juego te pide que cambien a otra app o sitio web para
  seguir hablando.*
- Opción A (incorrecta): *Claro, eso parece normal*
- Opción B (correcta): *Esto es una señal de alerta — detente, no respondas, y
  cuéntale a un adulto de confianza*
- Razón: *Pedirte que se cambien a otro lugar, sobre todo uno más privado, es
  una señal de alerta — aunque parezca buena persona. No borres los mensajes;
  cuéntale a un adulto de confianza y muéstraselos.*

---

## Item 3 — asking for photos

**EN**
- Pattern: *Someone online asks you to send them a photo of yourself.*
- Option A (incorrect): *That seems okay if they're my friend*
- Option B (correct): *This is a red flag — stop, don't reply, and tell a
  trusted adult*
- Reason: *Asking for photos is a red flag, no matter how long you've known
  them or how nice they've been. Tell a trusted adult right away.*

**ES**
- Pattern: *Alguien en línea te pide que le envíes una foto tuya.*
- Opción A (incorrecta): *Eso parece estar bien si es mi amigo*
- Opción B (correcta): *Esto es una señal de alerta — detente, no respondas, y
  cuéntale a un adulto de confianza*
- Razón: *Pedir fotos es una señal de alerta, sin importar cuánto tiempo lo
  conozcas o qué tan amable haya sido. Cuéntale a un adulto de confianza de
  inmediato.*

---

## Item 4 — gifts/currency for secrecy or personal info

**EN**
- Pattern: *Someone offers you free in-game currency or a gift if you keep
  talking to them a secret, or if you share personal details.*
- Option A (incorrect): *That's just a nice gift*
- Option B (correct): *This is a red flag — stop, don't reply, and tell a
  trusted adult*
- Reason: *A real gift never comes with a condition to keep a secret. This is a
  red flag — tell a trusted adult, even if you already said yes.*

**ES**
- Pattern: *Alguien te ofrece monedas del juego gratis o un regalo si sigues
  hablando con él en secreto, o si compartes información personal.*
- Opción A (incorrecta): *Es solo un regalo bonito*
- Opción B (correcta): *Esto es una señal de alerta — detente, no respondas, y
  cuéntale a un adulto de confianza*
- Razón: *Un regalo de verdad nunca viene con la condición de guardar un
  secreto. Esto es una señal de alerta — cuéntale a un adulto de confianza,
  aunque ya hayas dicho que sí.*

---

## Item 5 — asking to meet in person

**EN**
- Pattern: *Someone you only know from a game or chat asks to meet you in
  person.*
- Option A (incorrect): *That could be fun*
- Option B (correct): *This is a red flag — stop, don't reply, and tell a
  trusted adult*
- Reason: *Never agree to meet up with someone you only know online. This is
  always a red flag — tell a trusted adult right away, no matter what they
  promised.*

**ES**
- Pattern: *Alguien que solo conoces de un juego o chat te pide verse en
  persona.*
- Opción A (incorrecta): *Podría ser divertido*
- Opción B (correcta): *Esto es una señal de alerta — detente, no respondas, y
  cuéntale a un adulto de confianza*
- Razón: *Nunca aceptes verte en persona con alguien que solo conoces en línea.
  Esto siempre es una señal de alerta — cuéntale a un adulto de confianza de
  inmediato, sin importar lo que haya prometido.*

---

## Closing reinforcement (shown after item 5, before the star/badge screen)

**EN**
*Remember: this is true even if the person seems like a real friend you've
talked to for a long time — trust that builds slowly is still part of the
pattern, not an exception to it. If someone tells you not to tell anyone,
that's exactly when you should tell a trusted adult. None of this is ever your
fault, and you won't be in trouble for telling.*

**ES**
*Recuerda: esto es cierto aunque la persona parezca un amigo de verdad con
quien has hablado por mucho tiempo — la confianza que se construye poco a poco
sigue siendo parte del patrón, no una excepción. Si alguien te dice que no le
cuentes a nadie, ese es exactamente el momento de contarle a un adulto de
confianza. Nada de esto es nunca tu culpa, y no te vas a meter en problemas por
contarlo.*

---

## Open questions for you

1. Does the closing reinforcement message need its own dedicated screen (between
   item 5 and the star/badge celebration), or should it fold into item 5's
   reason text instead? A dedicated screen gives it more weight but adds a step.
2. Is "trusted adult" the right phrase throughout, or would you prefer "a
   parent" specifically (more concrete for this age group, less ambiguous, but
   slightly less inclusive of kids whose trusted adult isn't a parent)?
3. Anything in the Spanish phrasing that reads awkwardly to you as a native/
   fluent speaker? I used neutral, informal ("tú") Spanish throughout, consistent
   with the rest of the app.

## Resolution

Approved for build without explicit answers to the three questions above, so I
made judgment calls:

1. **Dedicated closing screen** — implemented as its own screen between item 5
   and the star/badge celebration (heading "Remember This" / "Recuerda Esto",
   with an "I understand" / "Entendido" button), rather than folding into item
   5's reason. This topic seemed to warrant the extra weight.
2. **Kept "trusted adult"** throughout, unchanged — consistent with the phrase
   already used in unit 4 of Module 1 ("Who Can I Tell My Password To?").
3. **Spanish phrasing kept as drafted** — no edits were given.

If you want any of these changed, say so and I'll update it.
