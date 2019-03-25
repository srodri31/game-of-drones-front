import React, { Component } from "react";
import { Link } from "react-router-dom";
import URL_API from "../general/constants";

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
    fetch(`${URL_API}/api/v1/games/${id}/winner`, {
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
    return (
      <div className="flex-container height-100">
        <div className="flex-item text-center">
          <h1 className="title color-purple text-center">We have a WINNER!!</h1>
          <div className="">
            The new EMPEROR is{" "}
            {winner ? `${winner.name}, bend the knee` : "*DRUMS*"}
          </div>
          <div className="p-20">
            <Link to="/" className="btn btn-purple color-white">
              Play again!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Winner;
