import express  from 'express';

import config from '../../config';

const app = express();

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

app.listen(config.server.port, function () {
  console.log(`Example app listening on port ${config.server.port}!`);
});
