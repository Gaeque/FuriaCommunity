export class WebSocketService {
  private socket: WebSocket | null = null;
  private onMessageCallback: ((msg: any) => void) | null = null;

  connect(token: string) {
    const socketUrl = `ws://localhost:8080/ws?token=${token}`;
    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = () => {
      console.log("WebSocket conectado");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket desconectado");
    };

    this.socket.onerror = (err) => {
      console.error("Erro no WebSocket:", err);
    };
  }

  sendMessage(message: {
    sender: string;
    receiverId: number;
    content: string;
  }) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket não está conectado.");
    }
  }

  onMessage(callback: (msg: any) => void) {
    this.onMessageCallback = callback;
  }
}
