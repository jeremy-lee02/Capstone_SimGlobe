import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class RoomController {
  private getSocketGameRoom(socket: Socket): string {
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );
    const gameRoom = socketRooms && socketRooms[0];

    return gameRoom;
  }

  @OnMessage("update_teams")
  public async updateTeam(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameTeam = this.getSocketGameRoom(socket);
    console.log(gameTeam);
    socket.to(gameTeam).emit("on_team_update", message);
  }

  @OnMessage("join_game")
  public async joinGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log("New User joining room: ", message);

    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );
    
    if (
      (connectedSockets && connectedSockets.size === 50)
    ) {
      socket.emit("room_join_error", {
        error: "Room is full please choose another room to play!",
      });
    } else {
      await socket.join(message.roomId);
      socket.emit("room_joined");

      if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
        socket.emit("start_game", { start: true, symbol: "x" });
        socket
          .to(message.roomId)
          .emit("start_game", { start: false, symbol: "o" });
      }
    }
  }
}
