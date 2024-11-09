"use client";
import React, { FC, useContext } from "react";
import Navbar from "@/components/navbar";
import WelcomeMessage from "@/components/message";
import { useLocalStorage } from "@/hooks/localstorage";
import { IntlProvider } from "react-intl";
import { GlobalContext } from "@/context/globalState";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { locale } = useContext(GlobalContext);
  const [showWelcome, setShowWelcome] = useLocalStorage("show", "true");

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <IntlProvider locale={locale}>
      <Navbar />
      {showWelcome && (
        <WelcomeMessage open={showWelcome} onClose={handleCloseWelcome} />
      )}
      <main>{children}</main>
    </IntlProvider>
  );
};

export default Layout;
