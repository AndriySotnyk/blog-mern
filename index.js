require('dotenv').config();
const config = require('./config/config');

const bootstrap = require('./app');

async function startServer(){
    try{
        const app = await bootstrap();
        app.listen(config.port, ()=>{
            console.log('Server is listening on '+config.port);
        });
    } catch (e){
        console.error(e);
    }
}

startServer();

