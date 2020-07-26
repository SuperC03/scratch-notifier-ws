const wsHandler = (ws: any, req: Express.Request) => {
  ws.on('message',(msg: string) => {
    console.log(msg);
    ws.send("Hi");
  });
}

export default wsHandler;