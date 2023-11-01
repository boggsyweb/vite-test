import { ReactNode } from "react";
import Header from "./ResponsiveHeader";
import Aside from "./Aside";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-screen-2xl grid grid-cols-1 lg:grid-cols-[4fr_1fr] px-10 md:px-20">
        {children}
        <Aside />
      </main>
    </>
  );
};
export default Layout;
