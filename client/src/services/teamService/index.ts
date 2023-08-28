import { Socket } from "socket.io-client";
import { Team } from "../../pages/RoomStudent";

class TeamService {
  public async joinGeneralRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));
    });
  }

  public async updateTeam(socket: Socket, teams: Team[]) {
    socket.emit("update_teams", { teams: teams });
  }

  public async onTeamUpdate(
    socket: Socket,
    listiner: (teams: Team) => void
  ) {
    socket.on("on_team_update", ({ teams }) => {
      listiner(teams)
    });
  }

  // public async onStartGame(
  //   socket: Socket,
  //   listiner: (options: IStartGame) => void
  // ) {
  //   socket.on("start_game", listiner);
  // }

  // public async gameWin(socket: Socket, message: string) {
  //   socket.emit("game_win", { message });
  // }

  // public async onGameWin(socket: Socket, listiner: (message: string) => void) {
  //   socket.on("on_game_win", ({ message }) => listiner(message));
  // }
}

export default new TeamService();
