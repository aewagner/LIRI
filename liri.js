const twitterKeys = require('./keys');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

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
} else if (action === 'spotify-this-song') {
    const song = process.argv[3];
    let spotify = new Spotify({
        id: 'd3b691929cf04f92a44cb221690df275',
        secret: '6b3e1468353f48a9be6f84d0fc761ea2'
    });

    spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //Artist
        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
        //Song
        console.log(`Title: ${data.tracks.items[0].name}`);
        //Preview Link
        console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
        //Album
        console.log(`Album: ${data.tracks.items[0].album.name}`);        
    });


}