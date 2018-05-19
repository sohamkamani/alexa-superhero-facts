/* eslint-disable  func-names */
/* eslint-disable  no-console */

import * as Alexa from 'ask-sdk'

const GetNewFactHandler: Alexa.RequestHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return (
      request.type === 'LaunchRequest' ||
      (request.type === 'IntentRequest' &&
        (request.intent.name === 'GetNewFactIntent' || request.intent.name === 'MoreIntent'))
    )
  },
  handle (handlerInput) {
    const factArr = data
    const factIndex = Math.floor(Math.random() * factArr.length)
    const randomFact = factArr[factIndex]
    const speechOutput: string = getFactMessage() + randomFact

    return handlerInput.responseBuilder.speak(speechOutput).withSimpleCard(SKILL_NAME, randomFact).getResponse()
  }
}

const HelpHandler: Alexa.RequestHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent'
  },
  handle (handlerInput) {
    return handlerInput.responseBuilder.speak(HELP_MESSAGE).reprompt(HELP_REPROMPT).getResponse()
  }
}

const ExitHandler: Alexa.RequestHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent')
    )
  },
  handle (handlerInput) {
    return handlerInput.responseBuilder.speak(STOP_MESSAGE).getResponse()
  }
}

const SessionEndedRequestHandler: Alexa.RequestHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'SessionEndedRequest'
  },
  handle (handlerInput) {
    return handlerInput.responseBuilder.getResponse()
  }
}

const ErrorHandler: Alexa.ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.log(`Error handled: ${error.message}`)

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse()
  }
}

const SKILL_NAME = 'Super hero Facts'

const HELP_MESSAGE = 'You can say tell me a super hero fact, or, you can say exit... What can I help you with?'
const HELP_REPROMPT = 'What can I help you with?'
const STOP_MESSAGE = 'Goodbye!'

const getFactMessages: string[] = [ "Here's your fact: ", 'Boom! here you go: ', 'Coming up :', 'Did you know: ' ]
const getFactMessage = (): string =>
  getFactMessages[Math.floor(Math.random() * getFactMessages.length)] || 'Did you know: '

const data: string[] = [
  'Wonder Woman once defeated a god by throwing her tiara and decapitating her with it',
  'Superman once used a machine that replicated the weight of the entire earth. Using a little yellow sun to give him energy he lifted the machine for 5 days straight',
  'The venom symbiote is bulletproof, and give the host a minor healing factor and durability superior to spider-man’s',
  'Peter Parker once built a time machine out of common household appliances',
  'Doctor strange’s magical powers at their greatest peak exceeds that of even the watcher and rivals that of other great beings, such as galactus or the celestials',
  'Black Adams “Shazam” lightning is so powerful, he once incapacitated martian manhunter with it',
  'Originally, Stan Lee wanted to make the Hulk grey, but due to issues with printing, they moved forward with the iconic green',
  'Superman’s first appearance was as a bald supervillain, bent on conquering the world. ',
  'Bruce Wayne has an IQ of 192, beating out both Stephen Hawking and Albert Einstein',
  'Superman’s shield is his family’s crest, known as the insignia for the house of El. The resemblance to the letter ‘S’ is said to be a coincidence.',
  'There is a course at the University of Victoria, called Science of Batman, where students can study the Dark Knight.',
  'Superman has complete control over his heart allowing him to stop it from beating, or make it beat louder. Superman can also hear all the heartbeats on the planet. Except for my cold, dark one.',
  'Harley Quinn’s origin story came after her TV debut in the Batman animated series. She is one of the only characters to first appear on the TV rather than in print.',
  'One of Gambit’s superpowers is possessing a hypnotic charm that he uses to influence pretty much anybody he wants. I use my charm to clear a room.',
  'One of Thor’s powers is “All-Tongue”, the ability to speak and have anybody understand him.',
  'Apocalypse is one the the world’s first mutants, tracing his origins to Ancient Egypt, where he was adopted by Baal, the leader of a nomadic tribe. ',
  'Dr. Doom murders his childhood love Valeria in order to attain more powers from demons.',
  'Daredevil can hear people talking through a soundproof wall, and can recognize a heartbeat from 20 feet away. He can also tell if someone is lying based on changes to their heartbeat.',
  'There are over 50 Iron Man suits, some designed to go to the depths of the oceans, others to take on the avengers, with one having a backup of Tony Stark’s mind, allowing it to function in the event Tony Stark is rendered incapacitated.',
  'The word brainiac comes from the 1950s Superman villain of the same name, and was quickly brought into modern day vernacular.',
  'Nightcrawler teleports by entering the brimstone dimension, and then returning to our dimension. He can only travel about 3km before he becomes very fatigued.',
  'Former comic book editor Darren Hick, ran the numbers and figured it would cost someone $600 million to be Batman. That includes the Batcave, weapons, and computer technology.',
  'Wonder Woman’s creator, William Moulton Marston, did a lot of work that contributed to the real life polygraph test, demonstrating a relationship between raised blood pressure and telling lies.',
  'Peter Parker is so smart that he actually built a time machine using a VCR, Microwave and Blender.',
  'The Joker once served as the Iranian ambassador to the United Nations.',
  'Writer Bill Finger was thinking of a name for the fictional city (not wanting to go with New York) and while flipping through the phonebook came across the name, ‘Gotham Jewelers.’ The name stuck and was Batman’s home ever since.',
  'Dead-shot is so proficient with a gun that he knows exactly where to shoot someone to get in the maximum number of shots without them dying',
  'Tony stark was actually adopted',
  'In the comics, barry allens top speed is nearly 13 trillion times the speed of light',
  'Thor once hit his opponent with so much force that it created a black hole',
  "Stan lee created doctor doom because he loved the idea that someone could be arrested for jaywalking, but doctor doom could'nt be arrested for wanting to take over the world",
  'After unleashing his full power, the hulk was able to destroy an asteroid twice the size of the earth with a single punch',
  'Thanos has killed more beings than any other character in his universe',
  'Hawkeye once ripped off his own fingernails and used them as deadly projectiles'
]

const skillBuilder = Alexa.SkillBuilders.standard()

export const handler = skillBuilder
  .addRequestHandlers(GetNewFactHandler, HelpHandler, ExitHandler, SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda()
