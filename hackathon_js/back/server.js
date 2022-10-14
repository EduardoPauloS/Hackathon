const { response } = require("express");
const express = require("express");
const fs = require("fs");
const { request } = require("http");
const twit = require("twit");
const app = express();

app.listen(3000)

const Twit = new twit({
    consumer_key: 'xOtsCjpBX5Q3Qzxd2Iz9VnepQ',
    consumer_secret: 'dAwbzt6ckwlzdGl5Ip2ESyzLocW6jrQLNrxCDXZtue8DSAI7dj',
    access_token: '1476571633615785988-lGv82VJOdVXzV3vCmOOoIyxXYE7C6W',
    access_token_secret: 'av6bPsfAQgSd7zLAZU92Rhl3jIDury4sknVEfLdLYHrzc',
    timeout_ms: 60000,
});

app.get('/toptrends', (request, response) => {
    Twit.get('search/tweets', { q: 'livro -RT since:2022-10-11', count: 100 }, function(err, data, response) {
        let result = []
        data['statuses'].map(item => { result.push(item)});
        result = JSON.stringify(result);

        fs.appendFile("./arch.json", result, err => {
            if (err) throw err;
            console.log('O arquivo foi criado!');
        })
      })

      response.sendStatus(200)
})

app.post("/toptrends", (request, response) => {
    fs.readFile("./arch.json", 'utf8', (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        let result = [];
        JSON.parse(data).map( (item,index) => { 
            result.push({"id": item.id, 'text': item.text})
        });

        response.send(result);
    })
})
