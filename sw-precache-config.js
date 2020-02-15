module.exports = {
  staticFileGlobs: [
    '/index.html'
  ],
  navigateFallback: '/',
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    }
  ]
};
