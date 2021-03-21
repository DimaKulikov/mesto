const isDev = process.env.NODE_ENV === 'development'

const useBabel = [
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

const presets = isDev ? [] : useBabel;

module.exports = { presets };