// Every visible string of the home page, per language. English is the default at /, Spanish at /es/.
// The copy mirrors Jano's README.md and README.es.md; project taglines mirror each project's README.
import { projects as baseProjects, type Project } from './data/projects';

export type Lang = 'en' | 'es';

const projectsEs: Record<string, { tag: string; alt: string; sections: string[] }> = {
  jano: {
    tag: 'Un README que explica tu proyecto.',
    alt: 'Un paquete sale de la carpeta de tu proyecto, pasa por Jano y llega a una página README.md, donde aparece una imagen en movimiento arriba y una imagen sobre cada parte.',
    sections: ['Qué obtienes', 'Para quién es', 'Uso'],
  },
  anzu: {
    tag: 'Tus libros de Kindle, en EPUB.',
    alt: 'Tres libros de Kindle con candado pasan por la app Anzu y salen como archivos EPUB, listos para cualquier lector.',
    sections: ['Qué obtienes', 'Cómo funciona', 'Tu cuenta sigue segura'],
  },
  svipall: {
    tag: 'La página, o la razón por la que no llegó.',
    alt: 'Un agente de IA pide una página web, lo detiene un muro, pasa con un navegador y recibe la página.',
    sections: ['Qué puede hacer tu IA con él', 'Cómo pasa un muro', 'Instalación', 'Adónde van tus datos'],
  },
  ogmios: {
    tag: 'Practica inglés hablado con IA.',
    alt: 'Un libro se prepara capítulo a capítulo y una de sus palabras se aprende con la frase del propio libro.',
    sections: ['Habla, y nadie te detiene', 'Cómo te ayuda a mejorar', 'Aprende las palabras de tus libros', 'Tus datos se quedan en tu computadora'],
  },
  sharur: {
    tag: 'Respuestas más cortas de Claude Code, por menos dinero.',
    alt: 'Un archivo de instrucciones corto reduce una respuesta larga del asistente a unas pocas líneas, con el ahorro por tarea al lado.',
    sections: [],
  },
  quiron: {
    tag: 'Un humanizador de textos de IA que mide su propio trabajo.',
    alt: 'Un borrador escrito por IA se reescribe y cinco medidas del texto pasan del lado de la IA a la franja humana.',
    sections: [],
  },
  muninn: {
    tag: 'Una memoria que se pone al día cuando cambias de opinión.',
    alt: 'A lo largo de tres sesiones una decisión vieja se guarda, y dos semanas después el asistente usa solo la nueva.',
    sections: [],
  },
  themis: {
    tag: 'Dos archivos, un solo texto.',
    alt: 'Una página de reglas para asistentes de IA se revisa línea por línea y lo que queda se guarda como dos archivos cortos e idénticos.',
    sections: [],
  },
};

// Jano's own pictures exist in Spanish too, under /scenes/es/.
export function projectsFor(lang: Lang): Project[] {
  if (lang === 'en') return baseProjects;
  return baseProjects.map((p) => {
    const t = projectsEs[p.slug];
    const prefix = p.slug === 'jano' ? 'es/' : '';
    return {
      ...p,
      tag: t.tag,
      alt: t.alt,
      scenes: p.scenes.map((s, i) => ({ file: prefix + s.file, alt: t.sections[i] ?? s.alt })),
    };
  });
}

const en = {
  locale: 'en_US',
  path: '/',
  scenes: '/scenes/',
  title: 'Jano · A README that explains your project, with animated pictures',
  description:
    'Jano is a skill for Claude Code, Codex and other AI assistants that writes your GitHub README and draws its animated SVG pictures, in dark and light, in your own colours.',
  ogImageAlt: 'Jano: a README that explains your project, with moving pictures in dark and light.',
  keywords: 'GitHub README, README generator, animated SVG, README banner, dark mode, Claude Code skill',
  navMain: 'Main',
  navHome: 'Jano, home',
  altLang: 'es',
  altHref: '/es/',
  altShort: 'ES',
  altLabel: 'Versión en español',
  nav: { get: 'What you get', who: 'Who it is for', use: 'Use', faq: 'Questions' },
  h1a: 'A README that',
  h1hot: 'explains',
  h1b: 'your project.',
  lead: 'Ask once, answer a few questions, and get a front page with moving pictures, in dark and light, in your own colours.',
  heroAlt:
    'Jano: a README that explains itself. A parcel leaves your project folder, passes through Jano, and lands on a README.md page, where a moving picture appears at the top and a picture over each part.',
  skillLine: 'agent skill · MIT',
  installMethod: 'Install method',
  tabPlugin: 'Claude Code',
  tabNpx: 'npx',
  copyMarket: 'Copy the marketplace command',
  copyPlugin: 'Copy the plugin install command',
  copyNpx: 'Copy the npx command',
  py1: 'Needs Python 3.9 or later. With',
  py2: 'that is all; without it, run',
  py3: 'once.',
  runsIn: 'Runs in',
  moreAgents: 'More agents',
  seeMore: 'See what you get',
  getEyebrow: 'What you get',
  getH: 'The whole front page, not only the top.',
  getP: 'The pictures are ordinary image files that play on GitHub, with nothing to install or host.',
  getAlt:
    'A finished front page, zoomed in. Its parts light one at a time while a card names each: a moving picture on top, a picture where it helps, short plain text. Then a pointer clicks the dark and light switch and the whole page turns light.',
  getItems: [
    'A moving picture at the top that shows what your project does.',
    'A picture over the parts that need one, each showing something different.',
    'Short, plain text, sized so people read to the end.',
    'Dark and light versions of every picture.',
    'Your logo and colours kept, when your project has them.',
  ],
  whoEyebrow: 'Who it is for',
  whoH: 'Front pages Jano wrote and drew for real projects.',
  whoPick: '{n} projects · pick one',
  full: 'full README',
  heroOnly: 'hero',
  heroOf: '{name} hero: {alt}',
  sceneOf: '{name}, {section}',
  openGh: 'Open on GitHub',
  useEyebrow: 'Use',
  useH: 'Type one line. Answer a few questions.',
  useP: "Open your AI assistant in your project's folder. Jano asks who will read it and whether to leave out unfinished parts, then works on its own. It never commits anything, so you look before you keep it.",
  useAlt:
    "In a chat window you type /jano make this repository's README. Jano asks who will read it and the pointer clicks People who use it; it asks whether to leave out unfinished parts and the pointer clicks Leave out. A bar fills while it writes and draws, and a message says your README is ready.",
  prompts: [
    { caption: 'The whole README', text: "/jano make this repository's README", label: 'Copy the README prompt' },
    { caption: 'Only the picture at the top', text: '/jano make a hero for this repository', label: 'Copy the hero prompt' },
    { caption: 'Four heroes side by side', text: "/jano make 4 alternatives for this repository's hero", label: 'Copy the four-alternatives prompt' },
  ],
  pluginNote: 'As a Claude Code plugin it is /jano:jano, and in Codex $jano.',
  baEyebrow: 'Before / after',
  baH: 'Same project. A page people read.',
  baGroup: 'Compare the README',
  without: 'Without Jano',
  with: 'With Jano',
  baTitle: 'Jano: a README that explains your project',
  worksWith: 'Works with',
  nameEyebrow: 'The name',
  nameH: 'Why Jano?',
  nameP: 'Jano is Spanish for Janus, the Roman god of doors, drawn with two faces. A README is the door to a project, and every picture Jano draws has two faces too, one for dark screens and one for light.',
  dark: 'dark',
  light: 'light',
  faqEyebrow: 'Questions',
  faqH: 'Before you ask.',
  faqs: [
    {
      q: 'What does Jano make?',
      a: 'A README that says what your project does, for whom and how to start, with a moving picture at the top and over the parts that need one, in dark and light, in your project’s colours.',
    },
    {
      q: 'Will it change my README without asking?',
      a: 'It never commits anything, so you look before you keep it. Before you see the result, fresh helpers that never saw your project read it cold.',
    },
    {
      q: 'Can I ask only for the picture at the top?',
      a: '“/jano make a hero for this repository” draws only the hero and leaves the rest of your README alone. Ask for 4 alternatives and they open side by side on one page; you keep one, or say what to take from several.',
    },
    {
      q: 'What do I need to run it?',
      a: 'Python 3.9 or later. With uv that is all; without it, run pip install fonttools brotli once.',
    },
    {
      q: 'Which AI assistants can run it?',
      a: 'Claude Code, as a plugin or a skill, plus Codex, Cursor, Gemini CLI and the other assistants the skills tool supports.',
    },
    {
      q: 'Where do the pictures live?',
      a: 'In your repository. They are ordinary SVG files that play on GitHub, with nothing to install or host, and GitHub shows each visitor the one that matches their screen.',
    },
    {
      q: 'What are its limits?',
      a: 'The result depends on the AI model that runs it: a stronger model draws better pictures. Every picture uses the same two typefaces, and it has been used on a handful of projects so far.',
    },
  ],
  footer: 'Jano · MIT licence · Space Grotesk and JetBrains Mono under SIL OFL',
  releases: 'Releases',
  copy: 'Copy',
  theme: { label: 'Theme', light: 'Light', dark: 'Dark', system: 'System' },
};

export type Strings = typeof en;

const es: Strings = {
  locale: 'es_ES',
  path: '/es/',
  scenes: '/scenes/es/',
  title: 'Jano · Un README que explica tu proyecto, con imágenes animadas',
  description:
    'Jano es un skill para Claude Code, Codex y otros asistentes de IA que escribe el README de tu repositorio de GitHub y dibuja sus imágenes SVG animadas, en oscuro y claro, con tus colores.',
  ogImageAlt: 'Jano: un README que explica tu proyecto, con imágenes en movimiento en oscuro y claro.',
  keywords: 'README de GitHub, generador de README, SVG animado, banner para README, modo oscuro, skills de Claude Code',
  navMain: 'Principal',
  navHome: 'Jano, inicio',
  altLang: 'en',
  altHref: '/',
  altShort: 'EN',
  altLabel: 'English version',
  nav: { get: 'Qué obtienes', who: 'Para quién es', use: 'Uso', faq: 'Preguntas' },
  h1a: 'Un README que',
  h1hot: 'explica',
  h1b: 'tu proyecto.',
  lead: 'Lo pides una vez, respondes unas preguntas y recibes una portada con imágenes en movimiento, en oscuro y claro, con tus propios colores.',
  heroAlt:
    'Jano: un README que se explica solo. Un paquete sale de la carpeta de tu proyecto, pasa por Jano y llega a una página README.md, donde aparece una imagen en movimiento arriba y una imagen sobre cada parte.',
  skillLine: 'skill para agentes · MIT',
  installMethod: 'Método de instalación',
  tabPlugin: 'Claude Code',
  tabNpx: 'npx',
  copyMarket: 'Copiar el comando del marketplace',
  copyPlugin: 'Copiar el comando de instalación del plugin',
  copyNpx: 'Copiar el comando npx',
  py1: 'Necesita Python 3.9 o posterior. Si tienes',
  py2: 'no hace falta nada más; si no, ejecuta',
  py3: 'una vez.',
  runsIn: 'Funciona en',
  moreAgents: 'Más agentes',
  seeMore: 'Ver qué obtienes',
  getEyebrow: 'Qué obtienes',
  getH: 'Toda la portada, no solo la parte de arriba.',
  getP: 'Las imágenes son archivos normales que se reproducen en GitHub, sin instalar ni alojar nada.',
  getAlt:
    'Una portada terminada, vista de cerca. Sus partes se iluminan una a una mientras una tarjeta nombra cada una: una imagen que se mueve arriba, imágenes donde ayudan, texto breve y sencillo. Luego un puntero pulsa el interruptor de oscuro y claro y toda la página se vuelve clara.',
  getItems: [
    'Una imagen en movimiento arriba que muestra qué hace tu proyecto.',
    'Una imagen sobre las partes que la necesitan, y cada una muestra algo distinto.',
    'Texto breve y sencillo, a la medida para que se lea hasta el final.',
    'Versión oscura y clara de cada imagen.',
    'Tu logo y tus colores, cuando tu proyecto los tiene.',
  ],
  whoEyebrow: 'Para quién es',
  whoH: 'Portadas que Jano escribió y dibujó para proyectos reales.',
  whoPick: '{n} proyectos · elige uno',
  full: 'README completo',
  heroOnly: 'hero',
  heroOf: 'Hero de {name}: {alt}',
  sceneOf: '{name}, {section}',
  openGh: 'Abrir en GitHub',
  useEyebrow: 'Uso',
  useH: 'Escribe una línea. Responde unas preguntas.',
  useP: 'Abre tu asistente de IA en la carpeta de tu proyecto. Jano pregunta quién va a leer el README y si deja fuera lo que no está terminado, y después trabaja por su cuenta. Nunca hace commit de nada, así que lo revisas antes de quedártelo.',
  useAlt:
    'En una ventana de chat escribes /jano haz el README de este repositorio. Jano pregunta quién lo va a leer y el puntero pulsa Quien lo usa; pregunta si deja fuera lo que no está terminado y el puntero pulsa Dejar fuera. Una barra se llena mientras escribe y dibuja, y un mensaje dice que tu README está listo.',
  prompts: [
    { caption: 'Todo el README', text: '/jano haz el README de este repositorio', label: 'Copiar la instrucción para el README' },
    { caption: 'Solo la imagen de arriba', text: '/jano haz un hero para este repositorio', label: 'Copiar la instrucción para el hero' },
    { caption: 'Cuatro heroes lado a lado', text: '/jano haz 4 alternativas para el hero de este repositorio', label: 'Copiar la instrucción para cuatro alternativas' },
  ],
  pluginNote: 'Como plugin de Claude Code es /jano:jano, y en Codex $jano.',
  baEyebrow: 'Antes / después',
  baH: 'El mismo proyecto. Una página que se lee.',
  baGroup: 'Comparar el README',
  without: 'Sin Jano',
  with: 'Con Jano',
  baTitle: 'Jano: un README que explica tu proyecto',
  worksWith: 'Funciona con',
  nameEyebrow: 'El nombre',
  nameH: '¿Por qué Jano?',
  nameP: 'Jano es el dios romano de las puertas (Janus, en latín), al que se dibuja con dos caras. Un README es la puerta de un proyecto, y cada imagen que dibuja Jano también tiene dos caras: una para pantallas oscuras y otra para claras.',
  dark: 'oscuro',
  light: 'claro',
  faqEyebrow: 'Preguntas',
  faqH: 'Antes de que preguntes.',
  faqs: [
    {
      q: '¿Qué hace Jano?',
      a: 'Un README que dice qué hace tu proyecto, para quién es y cómo empezar, con una imagen en movimiento arriba y sobre las partes que la necesitan, en oscuro y claro, con los colores de tu proyecto.',
    },
    {
      q: '¿Cambia mi README sin preguntar?',
      a: 'Nunca hace commit de nada, así que lo revisas antes de quedártelo. Antes de que veas el resultado, ayudantes nuevos que nunca vieron tu proyecto lo leen en frío.',
    },
    {
      q: '¿Puedo pedir solo la imagen de arriba?',
      a: '“/jano haz un hero para este repositorio” dibuja solo el hero y deja el resto de tu README como está. Si pides 4 alternativas, se abren lado a lado en una página; te quedas con una, o dices qué tomar de varias.',
    },
    {
      q: '¿Qué necesito para usarlo?',
      a: 'Python 3.9 o posterior. Si tienes uv, no hace falta nada más; si no, ejecuta pip install fonttools brotli una vez.',
    },
    {
      q: '¿Qué asistentes de IA pueden usarlo?',
      a: 'Claude Code, como plugin o como skill, además de Codex, Cursor, Gemini CLI y los demás asistentes que admite la herramienta skills.',
    },
    {
      q: '¿Dónde quedan las imágenes?',
      a: 'En tu repositorio. Son archivos SVG normales que se reproducen en GitHub, sin instalar ni alojar nada, y GitHub le muestra a cada visitante la que va con su pantalla.',
    },
    {
      q: '¿Qué límites tiene?',
      a: 'El resultado depende del modelo de IA que lo ejecuta: un modelo más capaz dibuja mejores imágenes. Todas las imágenes usan las mismas dos tipografías, y hasta ahora se ha usado en unos cuantos proyectos.',
    },
  ],
  footer: 'Jano · licencia MIT · Space Grotesk y JetBrains Mono bajo la SIL OFL',
  releases: 'Versiones',
  copy: 'Copiar',
  theme: { label: 'Tema', light: 'Claro', dark: 'Oscuro', system: 'Sistema' },
};

export const strings: Record<Lang, Strings> = { en, es };

export const fill = (tpl: string, vars: Record<string, string>) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
