import { Component } from "react";
import { connect } from "react-redux";
import cookies from "js-cookie";
import Navbar from "../Navbar/Navbar";
import { doLogin, fetchAccount } from "../../redux/actions/auth";
import Alerts from "../Alerts/Alerts";
import router from "next/router";

class SecuredLayout extends Component {
  render() {
    return (
      <>
        <Alerts />
        <Navbar />
        {this.props.children}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { doLogin, fetchAccount })(
  SecuredLayout
);
