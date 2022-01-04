require('dotenv').config({path:'process.env'});
const http = require('http');
const app = require('./app');


// Permet de renvoyer un port valide qu'il soit fourni sous la forme d'un numéro ou d'une chaine.
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// recherche les différentes erreurs et les gère de manière appropriée.
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

const server = http.createServer(app);
server.on('error', errorHandler);
// Lance un écouteur d'évènement consignant le port ou le conal nommé sur lequel le serveur s'éxécute dans la console. 
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
//on écoute le serveur, soit sur la variable d'environnement de la plateforme de déploiement, soit le port 3000.
server.listen(port);