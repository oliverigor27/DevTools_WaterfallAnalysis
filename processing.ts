import http from 'node:http';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');

    setTimeout(() => {
        res.end("Hello World!"); 
    }, 10000)
});

server.listen(3030, () => console.log("Server is runnig at 3030"));