import React, { Component } from "react";
import Form from "./components/form";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="flex-container height-100">
        <div className="flex-item">
          <div className="title color-purple p-20 text-center">
            Game Of Drones
          </div>
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
