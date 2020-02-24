// Construct commands to draw the input text string
const commands = text => [
  ['SkCanvas', 'drawText', text, '100', '100'],
  ['SkCanvas', 'flush']
]

module.exports = commands
