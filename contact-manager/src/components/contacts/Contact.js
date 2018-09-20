import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showContactInfo: false,
    contactIsDeleted: true
  };
  onShowClick = e => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };
  onClickDelete = async (id, dispatch) => {
    this.setState({
      contactIsDeleted: false
    });
    try {
      await axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
          this.setState({
            contactIsDeleted: true
          });
        });
      dispatch({
        type: "DELETE_CONTACT",
        payload: id
      });
    } catch (e) {
      dispatch({
        type: "DELETE_CONTACT",
        payload: id
      });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo, contactIsDeleted } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              {contactIsDeleted !== true ? <h2>Loading...</h2> : null}
              <h4>
                {name}{" "}
                {showContactInfo === false ? (
                  <i
                    onClick={this.onShowClick}
                    className="fas fa-angle-right"
                  />
                ) : (
                  <i onClick={this.onShowClick} className="fas fa-angle-down" />
                )}
                <i
                  onClick={this.onClickDelete.bind(this, id, dispatch)}
                  className="fas fa-times float-right"
                />
                <Link to={`contact/edit/${id}`}>
                  <i className="fas fa-pencil-alt float-right" />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
