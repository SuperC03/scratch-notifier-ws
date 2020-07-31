import * as ws from 'ws';

interface IWebSocket extends ws {
  id: string;
}

export default IWebSocket;
