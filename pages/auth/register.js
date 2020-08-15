import { connect } from "react-redux";
import { Component } from "react";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import { doRegister } from "../../redux/actions/auth";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
  };
  componentDidUpdate() {
    if (this.props.auth && this.props.auth.isAuthenticated) {
      router.push("/");
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.doRegister(
      this.state.email,
      this.state.username,
      this.state.password
    );
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
              <form onSubmit={this.handleSubmit}>
                <h5 className="u-text-big">Signup</h5>
                <div className="input__control--box">
                  <input
                    type="email"
                    className="input__control"
                    id="email"
                    placeholder="Email"
                    autoComplete="off"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <label htmlFor="email">Email</label>
                </div>

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
                <button className="btn btn-primary btn-block">signup</button>
              </form>
              <div className="input__control--box">
                <p className="register__now">
                  Already have Account?
                  <Link href="/auth/login">
                    <a>Login now</a>
                  </Link>
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

export default connect(mapStateToProps, { doRegister })(Register);
