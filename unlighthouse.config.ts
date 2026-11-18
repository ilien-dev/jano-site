// Unlighthouse settings for `npm run lighthouse`.
// blockedUrlPatterns keeps scripts that a local antivirus injects into pages out of the scores.
export default {
  site: 'https://jano.ilien.dev',
  scanner: {
    samples: 3,
  },
  lighthouseOptions: {
    blockedUrlPatterns: ['*kaspersky-labs.com*'],
  },
};
