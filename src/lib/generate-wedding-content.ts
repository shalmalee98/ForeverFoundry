/**
 * Mock AI generation — swap implementation for OpenAI server-side call later.
 * Keep this pure (no React) so it can run in API routes or client for preview.
 */

export interface GenerateInput {
  partner1: string;
  partner2: string;
  howTheyMet?: string;
  proposalStory?: string;
}

export interface GeneratedContent {
  story: string;
  tagline: string;
}

/** Simple hash for variety in mock copy */
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const TAGLINES = [
  "Two hearts, one journey",
  "Forever starts here",
  "Together is our favorite place",
  "Every love story is beautiful — especially ours",
  "The best is yet to come",
];

/**
 * Synchronous mock — replace with async OpenAI call:
 * `const completion = await openai.chat.completions.create(...)`
 */
export function generateWeddingContentSync(input: GenerateInput): GeneratedContent {
  const a = (input.partner1 || "Partner 1").trim();
  const b = (input.partner2 || "Partner 2").trim();
  const met = (input.howTheyMet || "").trim();
  const proposal = (input.proposalStory || "").trim();
  const h = hashString(`${a}|${b}|${met}|${proposal}`);
  const tagline = TAGLINES[h % TAGLINES.length];

  let story = `${a} and ${b} share a love that feels both effortless and extraordinary. `;
  if (met) {
    story += `Their story began ${met.charAt(0).toLowerCase() === met.charAt(0) ? "" : "when "}${met.endsWith(".") ? met.slice(0, -1) : met}. `;
  } else {
    story += `From the first laugh they shared to the quiet moments in between, every chapter has led to this celebration. `;
  }
  if (proposal) {
    story += `When ${proposal.endsWith(".") ? proposal.slice(0, -1) : proposal}, it sealed a promise they had already been living. `;
  } else {
    story += `With hearts wide open, they’re ready to say “I do” surrounded by the people who mean the most. `;
  }
  story += `Join them as they begin the next beautiful chapter — together.`;

  return { story, tagline };
}
