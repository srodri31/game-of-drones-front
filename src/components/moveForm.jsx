import React, { Component } from "react";

class MoveForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <form onSubmit={this.props.onSubmit} />;
  }
}

export default MoveForm;
