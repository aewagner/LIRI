const keys = require('./keys');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const fs = require("fs");

let action = process.argv[2];
let nodeArgs = process.argv;

let tweetLog = '';


switchFunction(action);

// TWITTER //////////////////////////////////////////////////////////////////////
function twitterThis() {
    let client = new Twitter(keys.twitterKeys);
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
                    tweetLog += ` ${tweet.text},`;
                }
            });

            log();

        }
    });
}

// SPOTIFY //////////////////////////////////////////////////////////////////////
function spotifyThis() {

    let song = '';
    // console.log(nodeArgs.length);
    if (nodeArgs.length > 3) {
        for (let i = 3; i < nodeArgs.length; i++) {

            if (i > 2 && i < nodeArgs.length) {

                song = song + "+" + nodeArgs[i];

            }

            else {

                song += nodeArgs[i];

            }
        }
    } else {
        song = 'The Ace of Base';
    }


    let spotify = new Spotify(keys.spotifyKeys);

    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
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

// OMDB /////////////////////////////////////////////////////////////////////////
function movieThis() {


    let movieName = "";

    if (nodeArgs.length > 3) {
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {

                movieName = movieName + "+" + nodeArgs[i];

            }

            else {

                movieName += nodeArgs[i];

            }
        }
    } else {
        movieName = 'Mr. Nobody';
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            // console.log(body);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country or Countries of Production: " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

        }
    });
}

// FS ///////////////////////////////////////////////////////////////////////////
function readThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        

        
        var dataArr = data.split(",");

        //console.log(dataArr);
        //console.log(dataArr);
        action = dataArr[0];
        nodeArgs = dataArr[1].split(' ');
        nodeArgs.unshift('node', '', action);
        //console.log(nodeArgs);

        switchFunction(action);
        

    });
}

// LOG //////////////////////////////////////////////////////////////////////////
function log() {
    
    let item = '';

    if (nodeArgs.length > 3) {
        for (let i = 3; i < nodeArgs.length; i++) {
            item += ` ${nodeArgs[i]}`;
        }
    } else {
        console.log(tweetLog);
        item = tweetLog;
    }

    fs.appendFile('log.txt', `${action}, ${item}\n`, function (err) {

        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        // else {
        //     console.log("Logged!");
        // }

    });
}

function switchFunction(action) {
    switch (action) {
        case 'my-tweets':
            twitterThis();
            // log();
            break;
        case 'spotify-this-song':
            spotifyThis();
            log();
            break;
        case 'movie-this':
            movieThis();
            log();
            break;
        case 'do-what-it-says':
            readThis();
            log();
            break;
        default:
            break;
    }
}