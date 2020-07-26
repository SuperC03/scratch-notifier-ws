import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './uikit.scss';

import CardService from './services/card.service';
import InputService from './services/input.service';
InputService.deleteUsername('SuperC_03', name => console.log(name));

// Initialize UI-Kit
//@ts-ignore
UIkit.use(Icons);

// Init WebSocket
const socket = new WebSocket(`ws://${SERVER_URL}/ws`);
socket.onopen = () => {
  console.log('Connection Established :)');
}
socket.onerror = () => {
  UIkit.notification({
    message: 'The Connection has Been Lost. Please Refresh the Page or Try Again Later',
    status: 'danger',
    timeout: 20000,
  });
}