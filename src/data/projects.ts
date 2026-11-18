export interface Project {
  slug: string;
  name: string;
  tag: string;
  alt: string;
  url: string;
}

// Names, taglines and descriptions come from the Jano README showroom.
export const projects: Project[] = [
  {
    slug: 'anzu',
    name: 'Anzu',
    tag: 'Your Kindle books, as EPUB.',
    alt: 'Three locked Kindle books pass through the Anzu app and come out as EPUB files, ready for any e-reader.',
    url: 'https://github.com/ilien-dev/anzu',
  },
  {
    slug: 'ogmios',
    name: 'Ogmios',
    tag: 'Practice English speaking with AI.',
    alt: "A book is prepared chapter by chapter, and a word from it is learned with the book's own sentence.",
    url: 'https://github.com/ilien-dev/ogmios',
  },
  {
    slug: 'quiron',
    name: 'Quirón',
    tag: 'An AI humanizer that measures its own work.',
    alt: 'An AI-written draft is rewritten, and five measures of the text move from the AI side into the human range.',
    url: 'https://github.com/ilien-dev/quiron',
  },
  {
    slug: 'sharur',
    name: 'Sharur',
    tag: 'Shorter replies from Claude Code, for less money.',
    alt: 'One short instruction file cuts a long assistant reply down to a few lines, with the savings per task beside it.',
    url: 'https://github.com/ilien-dev/sharur',
  },
  {
    slug: 'muninn',
    name: 'Muninn',
    tag: 'A memory that keeps up when you change your mind.',
    alt: 'Over three sessions an old decision is put away, and two weeks later the assistant uses only the new one.',
    url: 'https://github.com/ilien-dev/muninn',
  },
  {
    slug: 'themis',
    name: 'themis',
    tag: 'Two files, one text.',
    alt: 'A page of rules for AI assistants is checked line by line, and what stays is saved as two short, identical files.',
    url: 'https://github.com/ilien-dev/themis',
  },
  {
    slug: 'svipall',
    name: 'Svipall',
    tag: 'The page, or the reason it never arrived.',
    alt: 'An AI agent asks for a web page, is turned away at a wall, gets through with a browser and receives the page.',
    url: 'https://github.com/ilien-dev/svipall',
  },
];

export const agents = [
  { m: 'CC', name: 'Claude Code', note: 'plugin', hot: true, href: '#install' },
  { m: 'Cx', name: 'Codex', note: 'skill', hot: false, href: '#install' },
  { m: 'Cu', name: 'Cursor', note: 'skill', hot: false, href: '#install' },
  { m: 'Ge', name: 'Gemini CLI', note: 'skill', hot: false, href: '#install' },
  { m: '+', name: 'More agents', note: 'skills.sh', hot: false, href: 'https://skills.sh' },
];
