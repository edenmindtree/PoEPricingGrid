const axios = require('axios')

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res,) {
    res.sendFile('index.html', { root: __dirname });

});

app.get(`/stash/:league/:username/:stashNumber`, async (req, res,) => {
    try {
        var data =  await axios.get(
            `https://www.pathofexile.com/character-window/get-stash-items?league=${req.params.league}&tabs=1&tabIndex=${req.params.stashNumber}&accountName=${req.params.username}`,
            {
                headers: {
                    cookie: "_ga=GA1.2.1614616722.1560806896; stored_data=1; POESESSID=36d889f906d82dbe181acca0bdb4602b; __cfduid=d765415bb96aba231e044cb202fe3c3d21584064036"
                }
            }
        )
        res.send(data.data);
    } catch (error) {
        console.error(error)
        res.send(error);
    }

    
});



app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

