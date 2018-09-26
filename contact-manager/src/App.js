import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "./context";
import Contacts from "./components/contacts/Contacts";
import AddContact from "./components/contacts/AddContact";
import Header from "./components/layout/Header";

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Header branding="Contact Manager" />
          <div className="container">
            <AddContact />
            <Contacts />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
