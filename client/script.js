import io from 'socket.io-client';
const portClient = 'http://localhost:3000';


const socket = io(portClient, {
    withCredentials: false,
    transports: ['websocket'],
});




const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


let drawing = false;

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

socket.on('draw', (data) => {
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
})

function startPosition(e) {
    drawing = true;
    draw(e);
}


function endPosition() {
    drawing = false;
    ctx.beginPath();
}


function draw(e) {
    if (!drawing) {
        return;
    }
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

    socket.emit('draw', {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    })
}