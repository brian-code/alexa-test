'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Vaccine Facts';

/**
 * Array containing vaccine facts.
 */
var FACTS = [
    "They have kept children healthy and have saved millions of lives for more than 50 years. ",
    "Most childhood vaccines are 90% to 99% effective in preventing disease.",
    "Before a vaccine is licensed in the United States, the Food and Drug Administration (FDA) reviews all aspects of development.",
    "Your pediatrician believes that your children should receive all recommended childhood vaccines.",
    "In many parts of the world many vaccine-preventable diseases that are rarely seen in the United States are still common.",
    "Before leaving the hospital or birthing center, your baby receives the first of 3 doses of the vaccine that protects against Hepatitis B.",
    "Babies receive some immunity (protection) from their mother during the last few weeks of pregnancy. These antibodies decrease over time.",
    "Children 6 months or older should receive a flu vaccination every flu season.",
    "The American Academy of Pediatrics recommends a well child visit at 12 months, 15 months, and 18 months. Recommended vaccines are usually given at these visits.",
    "Combination vaccines protect your child against more than one disease with a single shot.",
    "Typically, your child needs a certificate of immunization to enroll in a new school."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random vaccine fact from the vaccine facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a vaccine fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};