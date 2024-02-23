let socket = io();

socket.on('connect', () => {
    let name = prompt('이름을 입력해 주세요.', '');

    if (!name) {
        name = '익명';
    }

    socket.emit('newUser', name);
});

socket.on('update', (data) => {
    let chat = document.getElementById('chat');
    let message = document.createElement('div');
    let node = document.createTextNode(`${data.name} : ${data.message}`);
    let className = '';

    switch (data.type) {
        case 'message':
            className = 'other';
            break;
        case 'connect':
            className = 'connect';
            break;
        case 'disconnect':
            className = 'disconnect';
            break;
    }

    message.classList.add(className);
    message.appendChild(node);
    chat.appendChild(message);
});

function send() {
    let message = document.getElementById('input').value;

    document.getElementById('input').value = '';

    let chat = document.getElementById('chat');
    let msg = document.createElement('div');
    let node = document.createTextNode(message);

    msg.classList.add('me');
    msg.appendChild(node);
    chat.appendChild(msg);

    socket.emit('message', { type: 'message', message: message });
}