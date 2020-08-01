import UIKit from 'uikit';

import { ERequestCode, EResponseCode, TRequest, TResponse } from '../../../common/';

import CardService from './card.service';
import StorageService from './storage.service';

class SocketService {
  private socket: WebSocket;

  constructor(_socket: WebSocket) {
    this.socket = _socket;
    this.handleResponse();
  }

  createNotifier(username: string): void {
    const data: TRequest = {
      code: ERequestCode.CreateNotifier,
      username,
    };
    this.socket.send(JSON.stringify(data));
  }

  editNotifier(oldUsername: string, newUsername: string): void {
    const data: TRequest = {
      code: ERequestCode.EditNotifier,
      oldUsername, newUsername,
    }
    this.socket.send(JSON.stringify(data));
  }

  deleteNotifier(username: string): void {
    const data: TRequest = {
      code: ERequestCode.DeleteNotifier,
      username,
    };
    this.socket.send(JSON.stringify(data));
  }

  private handleResponse(): void {
    // @ts-ignore
    this.socket.onmessage = ({ data }) => {
      const res: TResponse = JSON.parse(data);
      switch (res.code) {
        case EResponseCode.CreateNotifier:
          CardService.updateCard(res.username, res.count);
          StorageService.addUsername(res.username);
          break;
        case EResponseCode.CreateFailure:
          UIKit.notification({
            status: 'danger',
            message: res.msg
          });
          StorageService.removeUsername(res.username);
          break;
        case EResponseCode.UpdateNotifier:
          CardService.updateCard(res.username, res.count);
          StorageService.addUsername(res.username);
          break;
        case EResponseCode.UpdateFailure:
          UIKit.notification({
            status: 'danger',
            message: res.msg
          });
          CardService.deleteCard(res.username);
          StorageService.removeUsername(res.username);
          break;
        case EResponseCode.EditNotifier:
          CardService.deleteCard(res.oldUsername);
          CardService.updateCard(res.newUsername, res.count);
          StorageService.editUsername(res.oldUsername, res.newUsername);
          break;
        case EResponseCode.EditFailure:
          UIKit.notification({
            status: 'danger',
            message: res.msg
          });
          break;
        case EResponseCode.DeleteNotifier:
          CardService.deleteCard(res.username);
          StorageService.removeUsername(res.username);
          break;
        case EResponseCode.DeleteFailure:
          UIKit.notification({
            status: 'danger',
            message: res.msg
          });
          break;
        default:
          UIKit.notification({
            status: 'danger',
            message: 'I have no idea what\'s happening? Refresh Maybe ¯\_(ツ)_/¯'
          });
      }
    };
  }
}

export default SocketService;
