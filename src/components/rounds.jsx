import React, { Component } from "react";

class Rounds extends Component {
  renderRounds = () => {
    const { rounds } = this.props;
    if (rounds && rounds.length > 0) {
      return (
        <div>
          <h2>Rounds</h2>
          <ol>
            {rounds.map(round => {
              return (
                <li key={round.id}>
                  <b className="color-purple">Winner:</b> {round.player.name}
                </li>
              );
            })}
          </ol>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return this.renderRounds();
  }
}

export default Rounds;
