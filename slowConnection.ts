import { Socket } from 'net';
import http from 'node:http';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text-plain');
    setTimeout(() => {
        res.end("Hello World!\n"); 
    }, 10000)
});

server.maxConnections = 1;
let connection = 0;
let serverQueue: Socket[] = [];

server.on("connection", socket => {
    connection++;

    if(connection >= server.maxConnections) {
        serverQueue.push(socket);
    } else {
        console.log('Nova conexão aceita.');
        // Implemente aqui o seu código de processamento para a nova conexão

        socket.on('close', () => {
            connection--;

            if (serverQueue.length > 0) {
                const nextSocket = serverQueue.shift();
                console.log('Aceitando conexão da fila de espera.');
                server.emit('connection', nextSocket);
            }
        });
    }

})

server.listen(3030, "0.0.0.0", () => {
    console.log("Server is runnig at 3030");
});