"use client";
import { Session } from "next-auth";
import {
  SessionContextValue,
  SessionProvider,
  SessionProviderProps,
} from "next-auth/react";

import React from "react";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
