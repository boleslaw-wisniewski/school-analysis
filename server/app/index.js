import express  from 'express';

import routes from './routes';
import config from '../../config';

const app = express();

app.get('/api', function (req, res) {
  res.send('Hello World!');
});

routes.setupEndpoints(app);

app.listen(config.server.port, function () {
  console.log(`School Analysis back end listening on port ${config.server.port}!`);
});
