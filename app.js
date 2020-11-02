// const EventEmitter = require('events');

// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged', (args) => {
//     console.log("Listener called", args);
// })



// logger.log('message');


// const http = require('http');

// const server = http.createServer((req, res) => {
//     if(req.url === '/'){
//         res.write('Hello Mate');
//         res.end();
//     }

//     if(req.url === '/api/courses'){
//         res.write(JSON.stringify([1,2,3]));
//         res.end();
//     }
// });

// server.listen(3000);

// console.log('Listening on port 3000...')

const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/public/project.html`);
  });


app.listen(3000, () => console.log("listening in 3000.."));

