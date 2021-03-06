const presets = [
  [
    '@babel/env', {
      targets: {
        'ie': '11',
        'edge': '17',
        'firefox': '50',
        'chrome': '64',
        'safari': '11.1'
      },
      useBuiltIns: 'entry'
    }
  ]
]
module.exports = { presets };