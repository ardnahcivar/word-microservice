require('dotenv').config();
const express = require('express');
const app = express();
const image = require('./fetch-image.js');


app.use(express.static('public'));

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.get('/word-image/:word', function (request, response) {
    try {
        if (!request.params.word || request.params.word.length <= 4)
            throw 'invalid arguments';
        image(request.params.word).then(data => {
            response.status(200).send(data);
        }, error => {
            response.status(404).send({
                message: 'image not found'
            });

        })
    } catch (error) {
        response.status(500).send({
            message: error
        });
    }
})

app.get('**', function (request, response) {
    response.status(500).send({
        message: 'invalid api route'
    })
})


app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`)
})