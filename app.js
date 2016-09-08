'use strict'

function parse (text) {
  // map with replace function parameters
  var replaceMap = [
    ['km/u', ' kilometer per uur'],
    ['kWh', 'kilowatt uur'],
    [' Z ', ' zuiden '],
    [' ZW ', ' zuidwesten '],
    [' WZW ', ' westzuidwesten '],
    [' W ', ' westen '],
    [' NW ', ' noordwesten '],
    [' N ', ' noorden '],
    [' NO ', ' noordoosten '],
    [' O ', ' oosten '],
    [' ZO ', ' zuidoosten '],
    [/(.*?\d+)(C)\b/gi, function(match, g1) { return g1 + ' graden celcius'} ]
  ]

  var result = text
  Object.keys(replaceMap).forEach(function (key) {
    result = result.replace(replaceMap[key][0], replaceMap[key][1])
  })

  console.log('parsed ', text)
  console.log('to     ', result)
  return result
}

function init() {
  Homey.manager('flow').on('action.say_parsed_text', function (callback, args, state) {
    Homey.manager('speech-output').say(parse(args.text), {session: state.session})
    callback(null, true)
  })
}

module.exports.init = init
