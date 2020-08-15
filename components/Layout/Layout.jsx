import { useEffect } from "react";
import { connect } from "react-redux";
import cookies from "js-cookie";
import Navbar from "../Navbar/Navbar";
import { doLogin, setUser, fetchAccount } from "../../redux/actions/auth";
import Alerts from "../Alerts/Alerts";
import router from "next/router";
import { baseUrl } from "../../utils/baseUrl";
import Axios from "axios";

function Layout({ children, auth, setUser }) {
  useEffect(() => {
    (async () => {
      if (!auth.isAuthenticated && cookies.get("token")) {
        try {
          const resp = await Axios.get(`${baseUrl}/account`, {
            headers: { Authorization: cookies.get("token") },
          });
          setUser(resp.data.user.username, cookies.get("token"));
        } catch (error) {
          return;
        }
      }
    })();
  }, [auth.isAuthenticated]);

  return (
    <>
      <Alerts />
      <Navbar />
      {children}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { doLogin, fetchAccount, setUser })(
  Layout
);
