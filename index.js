const http = require('http');
const axios = require('axios');

// Configuración del dominio a donde se enviará la petición
const destino = 'http://tu_dominio.com';

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const timestamp = Date.now();
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Current timestamp: ${timestamp}\n`);

        // Esperar 1 segundo y luego enviar la petición HTTP
        setTimeout(() => {
            axios.get(destino)
                .then(response => {
                    console.log(`Respuesta del servidor: ${response.data}`);
                })
                .catch(error => {
                    console.error(`Error al enviar la petición: ${error.message}`);
                });
        }, 1000);
    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Método no permitido\n');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

