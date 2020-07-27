import { TResponse, EResponseCode } from '../../../common'

const wsHandler = (ws: any, req: Express.Request) => {
  ws.on('message',(msg: string) => {
    console.log(msg);
    const res: TResponse = {
      code: EResponseCode.CreateNotifier,
      username: "Hello There",
      count: 15
    };
    ws.send(JSON.stringify(res));
  });
}

export default wsHandler;
