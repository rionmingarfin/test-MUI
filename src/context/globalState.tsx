/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useMemo, useState, FC, ReactNode } from "react";
import enMessages from "@/messages/en.json";
import idMessages from "@/messages/id.json";
interface Messages {
  [key: string]: { [key: string]: string };
}
const messages: Messages = { en: enMessages, id: idMessages };

interface GlobalContextType {
  locale: string;
  setLocale: React.Dispatch<React.SetStateAction<"en" | "id">>;
  messages: Messages;
}

export type TLangSelection = "en" | "id";

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<TLangSelection>("en");

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages,
    }),
    [locale, setLocale]
  );

  return (
    <GlobalContext.Provider value={value} key={102903}>
      {children}
    </GlobalContext.Provider>
  );
};
