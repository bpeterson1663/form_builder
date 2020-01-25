import * as React from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Welcome from "./components/Welcome";

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
      <h1>Form Builder</h1>
      <Welcome firstName="Brady" lastName="Peterson" />
    </div>
  );
};

export default hot(module)(App);
