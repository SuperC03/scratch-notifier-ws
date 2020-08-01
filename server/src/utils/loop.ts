import axios from 'axios';

import IWebSocket from '../types/websocket.interface';
import { EResponseCode, TResponse } from '../../../common/index';
import { wsInstance } from '../index';
import { notifiers } from '../controllers/ws';

setInterval(() => {
  if(notifiers.length > 0) {
    const notifier = notifiers[0];
    const { username, newUsername, count, lastUpdated } = notifier;
    if(Date.now() > notifier.lastUpdated || !notifier.lastUpdated) {
      console.log('Request');
      axios.get(`https://api.scratch.mit.edu/users/${newUsername ? newUsername : username}/messages/count`)
        .then(({ data }) => {
          console.log(data)
          notifier.count = data["count"];
          if(!lastUpdated && !count) {
            send({
              code: EResponseCode.CreateNotifier,
              username, count: notifier.count,
            }, notifier.id);
          } else if (newUsername) {
            send({
              code: EResponseCode.EditNotifier,
              oldUsername: username,
              newUsername, count: notifier.count
            }, notifier.id);
            notifier.username = newUsername;
            notifier.newUsername = null;
          } else {
            send({
              code: EResponseCode.UpdateNotifier,
              username: notifier.username,
              count: notifier.count,
            }, notifier.id);
          }
        });
        notifier.lastUpdated = Date.now() + (1 * 1000);
        notifiers.push(notifiers.shift());
        console.table(notifiers);
    }
  }
}, 100);

const send = (msg: TResponse, id: string): void => {
  // @ts-ignore
  wsInstance.getWss().clients.forEach((ws: IWebSocket) => {
    if(ws.id == id) {
      ws.send(JSON.stringify(msg));
    }
  })
}