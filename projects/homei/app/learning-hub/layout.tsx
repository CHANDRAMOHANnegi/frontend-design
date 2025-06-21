"use client"
import React, { PropsWithChildren } from "react";
import { AppProvider } from "./Providers/app-provider";

const Layout = ({ children }: PropsWithChildren) => {
  return <AppProvider>
    {children}</AppProvider>;
};

export default Layout;
