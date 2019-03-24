import React, { Component } from "react";

class Player extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { player } = this.props;
    return (
      <div className="row">
        <div className="col-12 p-4 text-center">
          <h2>Player: {player.name}</h2>
        </div>
        <div className="col-md-6">
          <b>Actual move: </b>
          {player.move ? player.move.label : "No moves"}
        </div>
      </div>
    );
  }
}

export default Player;
