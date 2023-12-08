import jsonServer from 'json-server';
import { handleEndpoints } from './common/service.js';
import { apis } from './apis.js';

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares);
server.use(jsonServer.bodyParser);

apis().map(api => {
    handleEndpoints(server, api)
})

server.listen(5000, () => {
  console.log('JSON Server is running');
});