const http = require('http');
const dotenv=require('dotenv');

dotenv.config();
console.log(process.env.TESTWORD)

const hostname = process.env.IP
const port = process.env.PORT

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1><hr><p>hi its data structure</p>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});