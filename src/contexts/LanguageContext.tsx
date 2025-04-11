
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationKeys } from "@/i18n";

type LanguageContextType = {
  language: Language;
  t: (key: string) => string;
  formatMessage: (key: string, values?: Record<string, string>) => string;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const getNestedValue = (obj: any, path: string): string => {
    const keys = path.split(".");
    let result = obj;
    
    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        return path; // Return the path if translation is missing
      }
    }
    
    return result as string;
  };

  const t = (key: string): string => {
    return getNestedValue(translations[language], key);
  };

  const formatMessage = (key: string, values?: Record<string, string>): string => {
    let message = t(key);

    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        message = message.replace(new RegExp(`{${key}}`, "g"), value);
      });
    }

    return message;
  };

  return (
    <LanguageContext.Provider value={{ language, t, formatMessage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
