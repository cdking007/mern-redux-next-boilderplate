import { Component } from "react";
import { connect } from "react-redux";
import { doLogout, doLogin } from "../../redux/actions/auth";
import router from "next/router";
import Link from "next/link";

class Navbar extends Component {
  handleLogout = () => {
    console.log("calling!");
    this.props.doLogout(this.props.auth.token);
  };

  render() {
    return (
      <nav className="main-nav">
        <div
          className="nav-logo"
          onClick={() => {
            router.push("/");
          }}
        >
          CODEGRAM
        </div>
        <div className="nav-items">
          <ul>
            {this.props.auth && !this.props.auth.isAuthenticated && (
              <>
                <li>
                  <Link href="/auth/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register">
                    <a>Register</a>
                  </Link>
                </li>
              </>
            )}
            {this.props.auth && this.props.auth.isAuthenticated && (
              <li>
                <button onClick={this.handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { doLogout, doLogin })(Navbar);
