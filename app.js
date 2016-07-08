'use strict'

function parse (text) {
  var result = text
  // reeks te wijzigen woorden in lower case (regexp formatted)
  var mapObj = {
     'km/u':'kilometer per uur',
     'c ':'graden celsius ',
     'c\.':'graden celsius.',
     ' z ':' zuid ',
     ' zw ':' zuidwest ',
     ' wzw ':' westzuidwest '
  }
  var re = new RegExp(Object.keys(mapObj).join("|"),"gi")
  result = result.replace(re, function (matched) {
    return mapObj[matched.toLowerCase()]
  })

  console.log('parsed', text)
  console.log('to', result)
  return result
}

function init() {
  Homey.manager('flow').on('action.say_parsed_text', function (callback, args, state) {
    Homey.manager('speech-output').say(parse(args.text), {session: state.session})
    callback(null, true)
  })
}

module.exports.init = init
