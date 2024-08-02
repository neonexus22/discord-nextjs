import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  return <div>{children}</div>;
};

export default MainLayout;
