import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-full">{children}</div>;
};

export default AuthLayout;
