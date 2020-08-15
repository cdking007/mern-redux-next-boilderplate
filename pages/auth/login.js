import { Component } from "react";
import Layout from "../../components/Layout/Layout";
import router from "next/router";
import { connect } from "react-redux";
import { doLogin, fetchAccount } from "../../redux/actions/auth";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import catchError from "../../utils/catchErrors";
import cookies from "next-cookies";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  componentDidUpdate() {
    if (this.props.auth && this.props.auth.isAuthenticated) {
      router.push("/");
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.doLogin(this.state.username, this.state.password);
  };

  render() {
    return (
      <Layout>
        <div className="login">
          <div className="login__box">
            <div className="login__box--center">
              <img
                src="https://images.cooltext.com/5452030.png"
                alt="logo"
                className="logo"
              />
              <h5 className="u-text-big">Login</h5>
              <form onSubmit={this.handleSubmit}>
                <div className="input__control--box">
                  <input
                    type="text"
                    className="input__control"
                    id="username"
                    placeholder="username"
                    autoComplete="off"
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                  <label htmlFor="username">username</label>
                </div>
                <div className="input__control--box">
                  <input
                    type="password"
                    className="input__control"
                    placeholder="password"
                    autoComplete="off"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <label htmlFor="password">password</label>
                </div>
                <button className="btn btn-primary btn-block">Login</button>
              </form>
              <div className="input__control--box">
                <p className="register__now">
                  Don't have Account?<a href="/auth/register"> Register now</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { doLogin, fetchAccount })(Login);
