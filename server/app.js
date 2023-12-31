// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    const {stockSymbol, date} = req.body;

    axios.get(`https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${date}/${date}?limit=10&apiKey=${process.env.ACCESS_TOKEN}`).then( stockData => {
        if(stockData.status >= 400 && stockData.status < 500 ){
            throw new Error("Error Occured");
        } else {
            res.status(200).send({result: stockData.data.results, status: stockData.data.status});
        }
    }).catch(err => {
        console.log(err);
        res.status(404).send("Error occured");
    })
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));