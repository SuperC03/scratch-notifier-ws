import { WebsocketRequestHandler } from 'express-ws';

import { TResponse, EResponseCode, TRequest, ERequestCode } from '../../../common/index';
import INotifier from '../types/notifier.interface';
import IWebSocket from '../types/websocket.interface';
import { wsInstance } from '../index';

// @ts-ignore
const wsHandler: WebsocketRequestHandler = (ws: IWebSocket, _) => {
  while(true) {
    const id = Math.floor(Date.now() * Math.random()).toString();
    if(notifiers.filter(n => n.id != id)) {
      ws.id = id;
      break;
    }
  }
  ws.on('message', (msg: string) => {
    const data: TRequest = JSON.parse(msg);
    switch(data.code) {
      case ERequestCode.CreateNotifier: {
        const notifier: INotifier = {
          username: data.username,
          id: ws.id,
          count: null,
          lastUpdated: null,
          newUsername: null,
        };
        if(!notifiers.filter(n => notifier.id == n.id && notifier.username == n.username)) {
          const res: TResponse = {
            code: EResponseCode.CreateFailure,
            msg: `${notifier.username} Notifier Already Exists`,
            username: notifier.username,
          }
          ws.send(JSON.stringify(res));
        } else {
          notifiers.push(notifier);
        }
        break;
      }
      case ERequestCode.EditNotifier: {
        const index = notifiers.findIndex(n => data.oldUsername == n.username && ws.id == n.id);
        if(index == -1) {
          const res: TResponse = {
            code: EResponseCode.EditFailure,
            msg: `${data.oldUsername} Notifier Does Not Exist`,
            username: data.oldUsername,
          };
          ws.send(JSON.stringify(res));
        } else {
          notifiers[index].newUsername = data.newUsername;
        }
        break;
      }
      case ERequestCode.DeleteNotifier: {
        const index = notifiers.findIndex(n => data.username == n.username && ws.id == n.id);
        if(index == -1) {
          const res: TResponse = {
            code: EResponseCode.EditFailure,
            msg: `${data.username} Notifier Does Not Exist`,
            username: data.username,
          };
          ws.send(JSON.stringify(res));
        } else {
          notifiers = notifiers.filter((_, i) => i !== index);
          const res: TResponse = {
            code: EResponseCode.DeleteNotifier,
            username: data.username,
          }
          ws.send(JSON.stringify(res));
        }
        break;
      }
    }
  });
  ws.on('close', () => {
    notifiers = notifiers.filter(n => n.id !== ws.id);
  });
}

// Queue Array
export let notifiers: Array<INotifier> = [];

export default wsHandler;
