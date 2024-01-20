// node server which handle connection of socket io 
const io = require('socket.io')(5500 ,
    {
        cors:{
            origin:"*"
        }
    })

const users = {};

io.on('connection', socket =>{

    socket.on("new-user-joined", namee =>{
        // console.log("NEW USER" , namee);
     users[socket.id]= namee;
     socket.broadcast.emit('user-joined', namee);
    });

    socket.on('send' , message =>{
        socket.broadcast.emit('receive',{message: message, namee: users[socket.id]})
    })

    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.io]
    })
})

//  tried to use express to serve static files 
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// const PORT = process.env.PORT || 5500;

// // Serve static files from the "public" folder
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// const users = {};

// io.on('connection', (socket) => {
//     socket.on("new-user-joined", namee => {
//         users[socket.id] = namee;
//         socket.broadcast.emit('user-joined', namee);
//     });

//     socket.on('send', message => {
//         socket.broadcast.emit('receive', { message: message, namee: users[socket.id] });
//     });

//     socket.on('disconnect', () => {
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     });
// });

// server.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
