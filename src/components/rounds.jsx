import React from "react";

const Rounds = props => {
  return (
    <ol>
      {props.rounds.map(round => {
        <li>{JSON.stringify(round)}</li>;
      })}
    </ol>
  );
};

export default Rounds;
