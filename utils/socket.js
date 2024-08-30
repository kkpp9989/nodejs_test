//const socket = require("socket.io").Server;
const socket = require('socket.io').Server;
let io = null;

class Socket{

    

    createConnection(){

        io = new socket("localhost:35000",{cors:true}); 

        io.use((socket,next)=>{
            socket['email'] = socket.handshake.auth.email;
            next();
        })
  
        io.on("connection", (socket) => {

            socket.join(socket.email);

            socket.on("disconnect", (reason) => {
                // any custom code when socket gets disconnected;
             
              });
        });

    }

    getIo(){
        return io;
    }
}

module.exports.socket = new Socket();