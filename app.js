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
                    cookie: "_ga=GA1.2.1614616722.1560806896; __cfduid=da54b77dfe682e2a5dc5773eedb2fa2ca1598736064; stored_data=1; cf_clearance=e91264b82b3c334f7fdf45ee1f0954d2c6a9f479-1600479432-0-1zd2cfb7daz8f417b34z39551240-150; POESESSID=6c216be86d1f1946d8ace6e18e1ef9f9"
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

