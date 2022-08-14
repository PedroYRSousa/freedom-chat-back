module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@Socket': './src/Socket',
        '@Server': './src/Server',
        '@Log': './src/Log',
        '@App': './src/App'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
