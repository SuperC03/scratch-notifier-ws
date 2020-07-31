import IWebSocket from './websocket.interface';

interface INotifier {
  username: string;
  count?: number;
  id: string;
  newUsername?: string;
  lastUpdated?: number;
}

export default INotifier;
