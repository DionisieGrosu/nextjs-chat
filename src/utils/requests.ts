import axios from "axios";
import { CookiesOptions } from "next-auth";
import { useSession } from "next-auth/react";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export function signup(body: FormData) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("BODY");
      let result = await instance.post("api/signup", body);
      console.log(result);
      if (result?.data) {
        resolve(result?.data);
      } else {
        resolve(result);
      }
    } catch (e) {
      if (e?.response?.data?.message) {
        reject({ success: false, message: e.response.data.message });
      } else {
        reject({ success: false, message: "Something went wrong" });
      }
    }
  });
}

export function getConversations() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await instance.get("/api/conversation");
      console.log("CONVERSATIONS IN REQUEST");
      console.log(result);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}
