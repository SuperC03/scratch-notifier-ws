import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './uikit.scss';

import CardService from './services/card.service';
import InputService from './services/input.service';
import SocketService from './services/socket.service';

// Initialize UI-Kit
//@ts-ignore
UIkit.use(Icons);

// SocketController to be Used
export let socketService: SocketService;

// Init WebSocket
const socket = new WebSocket(`${SERVER_URL}/ws`);
socket.onopen = () => {
  socketService = new SocketService(socket);
}
socket.onclose = () => {
  UIkit.notification({
    message: 'The Connection has Been Lost. Please Refresh the Page or Try Again Later',
    status: 'danger',
    timeout: 20000,
  });
}
socket.onerror = () => {
  UIkit.notification({
    message: 'The Connection has Been Lost. Please Refresh the Page or Try Again Later',
    status: 'danger',
    timeout: 20000,
  });
}

// Setup Add Card Button
document.getElementById('addCard').addEventListener('click', () => InputService.getUsername((username: string) => {
  socketService.createNotifier(username);
}));