const aws = require('aws-sdk');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const dynamodb = new aws.DynamoDB();

    const params = {
        TableName: process.env.DYNAMODBUSERTABLE,
        Key: {
          'id': { S: JSON.parse(event.body) }
        }
      };

      const userData = await dynamodb.getItem(params).promise();

        const firstName = userData.Item.firstName.S;

        const messageTemplate = {
            firstTimeGreeting: "Hello there, {name}. I am Person. I am here to provide you with helpful summaries of current events, as well as any other information you may need. Additionally, I can occasionally display interesting facts or jokes to brighten up your day.",
            goodMorning: ["Good morning {name}! Wishing you a productive and successful day ahead.", "Good morning {name}! I hope you have a great day today!", "Rise and shine {name}! It's a new day full of opportunities.", "Good morning {name}! I hope you’re having a great start to your day."],
            goodAfternoon: ["Good afternoon {name}! I hope you're having a great day so far.",
            "Hope you're having a great afternoon so far {name}!",
            "Hope you're having a great day so far {name}!",],
            goodEvening: ["Good evening {name}! I hope you're having a great day so far.",
            "Hope you're having a great evening so far {name}!",
            "Hope you're having a great day so far {name}!",],
            goodNight: "Good night {name}! I hope you have a great night's rest.",
            greeting: ["Hello {name}! How are you today?", "Hi {name}! How are you doing today?", "Hey {name}! How are you doing today?", "Hey {name}! How are you today?", "Hi {name}! How are you today?", "Hello {name}! How are you doing today?"],
        }
        
        
        
        const messages = [];

        // if date is less than 12pm, then good morning
        // if date is less than 6pm, then good afternoon
        
        const date = new Date();
        const hour = date.getHours();
        console.log(hour)
        if (hour < 12) {
            messages.push(messageTemplate.goodMorning[Math.floor(Math.random() * messageTemplate.goodMorning.length)].replace('{name}', firstName));
        } else if (hour < 18) {
            messages.push(messageTemplate.goodAfternoon[Math.floor(Math.random() * messageTemplate.goodAfternoon.length)].replace('{name}', firstName));
        } else {
            messages.push(messageTemplate.goodEvening[Math.floor(Math.random() * messageTemplate.goodEvening.length)].replace('{name}', firstName));
        }

        console.log(messages)

      


    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(messages),
    };
};
