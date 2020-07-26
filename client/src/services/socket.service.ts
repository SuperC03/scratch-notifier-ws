import { ERequestCode, EResponseCode, TRequest, TResponse } from '../../../common/';

class SocketService {
  private socket: WebSocket;

  constructor(_socket: WebSocket) {
    this.socket = _socket;
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

  handleResponse(): void {
    // @ts-ignore
    this.socket.onmessage((data: TResponse) => {
      switch (data.code) {
        case EResponseCode.CreateNotifier:
          
      }
    });
  }
}