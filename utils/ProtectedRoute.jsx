import cookies from "next-cookies";
import Router from "next/router";
import { fetchAccount } from "../redux/actions/auth";

export default function protectRoute(ctx) {
  const allCookies = cookies(ctx);
  const { token } = allCookies;
  if (token) {
    fetchAccount(token);
  } else {
    if (ctx.req) {
      // If `ctx.req` is available it means we are on the server.
      ctx.res.writeHead(302, { Location: "/auth/login" });
      ctx.res.end();
    } else {
      // This should only happen on client.
      Router.push("/auth/login");
    }
  }
}
