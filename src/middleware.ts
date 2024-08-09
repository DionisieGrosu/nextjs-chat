// import { withAuth } from "next-auth/middleware";
// import NextAuth from "next-auth";
// import options from "./app/api/auth/options";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default withAuth({
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//   },
// });

// export default NextAuth(options).auth;

export { default } from "next-auth/middleware";

// export default withAuth(
//   function middleware(request) {
//     console.log("REQUEST FROM MIDDLEWARE");
//     let headers = request.headers;
//     console.log(headers);
//     return NextResponse.json({ success: false }, { status: 500 });
//   },
//   {
//     callbacks: {
//       authorized: (params) => {
//         let { token } = params;
//         return token;
//       },
//     },
//   }
// );

export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/((?!api|auth|_next/static|_next/image|favicon.ico).*)"],
};

// export default () => {};
