import React, { Component } from "react";
import gameMoves from "../general/gameMoves";

class Player extends Component {
  render() {
    const { player } = this.props;
    return (
      <div>
        <div>
          <h2>Player: {player.name}</h2>
        </div>
        <div>
          <form onSubmit={e => this.props.onMove(e, player)}>
            <label>
              Select move
              <select className="">
                {gameMoves.map(move => {
                  return (
                    <option key={move.value} value={JSON.stringify(move)}>
                      {move.label}
                    </option>
                  );
                })}
              </select>
            </label>
            <input
              type="submit"
              className="btn btn-purple color-white"
              value="Play!"
            />
          </form>
        </div>
        <div>
          <b>Actual move: </b>
          {player.move ? player.move.label : "No moves"}
        </div>
      </div>
    );
  }
}

export default Player;
