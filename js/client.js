
const socket = io('http://localhost:5500');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");



const append = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    var audio = new Audio('../public/ring.mp3');
    if(position== 'left'){
        audio.play();
    }

}

form.addEventListener('submit',(e)=>{
    console.log("chl chl")
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send',message);
    messageInput.value =''
})

const namee = prompt("Enter Your name to join");
socket.emit('new-user-joined', namee)

socket.on('user-joined', namee =>{

    append(`${namee} joined the chat`, 'right');

})

socket.on('receive', data =>{

    append(`${data.namee}: ${data.message}`, 'left');

})
socket.on('left', name =>{

    append(`${namee} left the chat`, 'left');

})
