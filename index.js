const express = require('express');
const bodyParser = require('body-parser');


const token = process.env.NODE_BOT_TOKEN || '***';
const port = process.env.PORT || 8888;
const app = express();
app.use(bodyParser.json());

const bot = require('./bot')(token);

app.get('/', function (req, res) {
  res.json({ version: '1.0' });
});

app.post('/' + token, function (req, res) {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const server = app.listen(port, function () {
  console.log('listen', port);
});