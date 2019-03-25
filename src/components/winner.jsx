import React, { Component } from "react";

class Winner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null
    };
  }

  componentDidMount() {
    this.fetchGameWinner();
  }

  fetchGameWinner = () => {
    const { id } = this.props.match.params;
    fetch(`http://localhost:8000/api/v1/games/${id}/winner`, {
      method: "Get"
    })
      .then(res => {
        return res.json();
      })
      .catch(error => console.error("Error:", error))
      .then(winner => {
        console.log(winner);
        this.setState({ winner });
      });
  };

  render() {
    const { winner } = this.state;
    return <div>The winner is: {winner ? winner.name : "*DRUMS*"}</div>;
  }
}

export default Winner;
