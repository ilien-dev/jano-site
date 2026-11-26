export interface Scene {
  // File stem under /scenes/: `${file}-dark.svg` and `${file}-light.svg`.
  file: string;
  // The README section the picture sits over, or the hero.
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  tag: string;
  alt: string;
  url: string;
  // True when the project's whole README was written and drawn by Jano; false when only its hero.
  full: boolean;
  scenes: Scene[];
}

export interface Agent {
  name: string;
  note: string;
  href: string;
  logo?: string;
}

// Names, taglines and descriptions come from each project's README; the section names are its headings.
export const projects: Project[] = [
  {
    slug: 'jano',
    name: 'Jano',
    tag: 'A README that explains your project.',
    alt: 'A parcel leaves your project folder, passes through Jano, and lands on a README.md page, where a moving picture appears at the top and a picture over each part.',
    url: 'https://github.com/ilien-dev/jano',
    full: true,
    scenes: [
      { file: 'jano-features', alt: 'What you get' },
      { file: 'jano-audience', alt: 'Who it is for' },
      { file: 'jano-use', alt: 'Use' },
    ],
  },
  {
    slug: 'anzu',
    name: 'Anzu',
    tag: 'Your Kindle books, as EPUB.',
    alt: 'Three locked Kindle books pass through the Anzu app and come out as EPUB files, ready for any e-reader.',
    url: 'https://github.com/ilien-dev/anzu',
    full: true,
    scenes: [
      { file: 'anzu-features', alt: 'What you get' },
      { file: 'anzu-how', alt: 'How it works' },
      { file: 'anzu-privacy', alt: 'Your account stays safe' },
    ],
  },
  {
    slug: 'svipall',
    name: 'Svipall',
    tag: 'The page, or the reason it never arrived.',
    alt: 'An AI agent asks for a web page, is turned away at a wall, gets through with a browser and receives the page.',
    url: 'https://github.com/ilien-dev/svipall',
    full: true,
    scenes: [
      { file: 'svipall-features', alt: 'What your AI can do with it' },
      { file: 'svipall-how', alt: 'How it gets past a wall' },
      { file: 'svipall-install', alt: 'Install' },
      { file: 'svipall-privacy', alt: 'Where your data goes' },
    ],
  },
  {
    slug: 'ogmios',
    name: 'Ogmios',
    tag: 'Practice English speaking with AI.',
    alt: "A book is prepared chapter by chapter, and a word from it is learned with the book's own sentence.",
    url: 'https://github.com/ilien-dev/ogmios',
    full: true,
    scenes: [
      { file: 'ogmios-talk', alt: 'Talk, and nobody stops you' },
      { file: 'ogmios-improve', alt: 'How it helps you improve' },
      { file: 'ogmios-books', alt: 'Learn the words of your own books' },
      { file: 'ogmios-privacy', alt: 'Your data stays on your computer' },
    ],
  },
  {
    slug: 'sharur',
    name: 'Sharur',
    tag: 'Shorter replies from Claude Code, for less money.',
    alt: 'One short instruction file cuts a long assistant reply down to a few lines, with the savings per task beside it.',
    url: 'https://github.com/ilien-dev/sharur',
    full: false,
    scenes: [],
  },
  {
    slug: 'quiron',
    name: 'Quirón',
    tag: 'An AI humanizer that measures its own work.',
    alt: 'An AI-written draft is rewritten, and five measures of the text move from the AI side into the human range.',
    url: 'https://github.com/ilien-dev/quiron',
    full: false,
    scenes: [],
  },
  {
    slug: 'muninn',
    name: 'Muninn',
    tag: 'A memory that keeps up when you change your mind.',
    alt: 'Over three sessions an old decision is put away, and two weeks later the assistant uses only the new one.',
    url: 'https://github.com/ilien-dev/muninn',
    full: false,
    scenes: [],
  },
  {
    slug: 'themis',
    name: 'themis',
    tag: 'Two files, one text.',
    alt: 'A page of rules for AI assistants is checked line by line, and what stays is saved as two short, identical files.',
    url: 'https://github.com/ilien-dev/themis',
    full: false,
    scenes: [],
  },
];

// Brand marks from Lobe Icons (MIT), used to name the agents Jano runs in.
export const agents: Agent[] = [
  { logo: '/logos/claude.svg', name: 'Claude Code', note: 'plugin', href: '#install' },
  { logo: '/logos/chatgpt.svg', name: 'Codex', note: 'skill', href: '#install' },
  { logo: '/logos/cursor.svg', name: 'Cursor', note: 'skill', href: '#install' },
  { logo: '/logos/gemini.svg', name: 'Gemini CLI', note: 'skill', href: '#install' },
  { name: 'More agents', note: 'skills.sh', href: 'https://skills.sh' },
];
