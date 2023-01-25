let express = require( 'express' );
let app = express();
let https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};


const server = https.createServer(options,app)
const { Server } = require('socket.io');
const io = new Server(server);

let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );
const PORT = process.env.PORT || 5000;

console.log("Server Running on port",PORT);


app.use( favicon( path.join( __dirname, 'WEB.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );


io.of( '/stream' ).on( 'connection', stream );

server.listen(PORT,"10.8.9.8",()=>{console.log("server running")});