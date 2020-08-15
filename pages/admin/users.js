import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import protectRoute from "../../utils/ProtectedRoute";
import { useRouter } from "next/router";
import { baseUrl } from "../../utils/baseUrl";
import DataTable, { createTheme } from "react-data-table-component";

createTheme("solarized", {
  text: {
    primary: "#268bd2",
    secondary: "#2aa198",
  },
  background: {
    default: "#002b36",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

function Users({ auth }) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      if (auth.token) {
        try {
          const resp = await axios.get(`${baseUrl}/users`, {
            headers: { Authorization: auth.token },
          });
          setUsers(resp.data.users);
        } catch (error) {
          console.log(error);
          return router.push("/");
        }
      }
    })();
  }, [auth.token]);
  console.log(users);
  const columns = [
    {
      name: "Username",
      selector: "username",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
    },
    {
      name: "Created at",
      selector: "createdAt",
      sortable: true,
    },
    {
      name: "Title",
      sortable: true,
      cell: (row) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{row.username}</div>
          {row.summary}
        </div>
      ),
    },
  ];
  const handleChange = (state) => {
    console.log("i called");
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state.selectedRows);
  };
  return (
    <>
      <Layout>
        <DataTable
          title="Users"
          columns={columns}
          theme="solarized"
          selectableRows
          data={users}
          Clicked
          onSelectedRowsChange={handleChange}
          clearSelectedRows={true}
          pagination
        />
      </Layout>
    </>
  );
}

Users.getInitialProps = (ctx) => {
  protectRoute(ctx);
  return {
    a: [],
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Users);
