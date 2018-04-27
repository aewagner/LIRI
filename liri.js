const twitterKeys = require('./keys');
const request = require('request');
const Twitter = require('twitter');

const action = process.argv[2];

if (action === 'my-tweets') {
    let client = new Twitter(twitterKeys);
    let count = 0;
    const params = { screen_name: 'au_ew89' };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);

            tweets.map(tweet => {
                // console.log('TWEET TWEET TWEET');
                count++;
                // console.log(count);
                if (count < 20) {
                    console.log(tweet.text);
                }
            });

        }
    });
}