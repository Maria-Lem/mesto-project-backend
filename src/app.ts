import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log('Hello World!');
  // console.log(req);
  // console.log(res);
});

server.listen(3000);
