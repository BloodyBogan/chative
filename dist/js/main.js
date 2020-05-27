const chatForm = document.querySelector('.chat-form');
const chatMessages = document.querySelector('.main__messages');
const roomName = document.querySelector('.room');
const userList = document.querySelector('.users');
const inputField = document.getElementById('msg');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

let typing = false;
const timeoutTime = 1000;
let timeout = undefined;

msg.addEventListener('keyup', (e) => {
  if (e.code !== 'Enter') {
    typing = true;
    socket.emit('typing', { username, room, typing: true });
    clearTimeout(timeout);
    timeout = setTimeout(typingTimeout, timeoutTime);
  } else {
    clearTimeout(timeout);
    typingTimeout();
  }
});

let fired = false;

socket.on('display', (data) => {
  if (data.typing == true) {
    if (fired == false) {
      outputTyping(data);
      fired = true;
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
    const element = document.querySelector('.typing');
    chatMessages.removeChild(element);
    fired = false;
  }
});

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on('message', (message) => {
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit('chatMessage', msg);

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message-container');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.main__messages').appendChild(div);
}

function outputTyping(data) {
  const div = document.createElement('div');
  div.classList.add('typing');
  div.innerHTML = `<p class="text">
  <b>${data.username}</b> is typing <i class="fas fa-circle"></i>
  <i class="fas fa-circle"></i> <i class="fas fa-circle"></i>
</p>`;
  document.querySelector('.main__messages').appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join('')}
    `;
}

function typingTimeout() {
  typing = false;
  socket.emit('typing', { username, typing: false });
}
