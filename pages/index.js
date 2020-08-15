import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { connect } from "react-redux";
import { doALert } from "../redux/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import protectRoute from "../utils/ProtectedRoute";
import Layout from "../components/Layout/Layout";

function Home({ doALert, auth }) {
  const router = useRouter();

  return (
    <Layout>
      <h1>This is awesome</h1>
      <Link href="/page2">
        <a>Page 2</a>
      </Link>
      <Link href="/admin/users">
        <a>Users</a>
      </Link>
    </Layout>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

Home.getInitialProps = (ctx) => {
  protectRoute(ctx);
  return {
    abc: [],
  };
};

export default connect(mapStateToProps, { doALert })(Home);
