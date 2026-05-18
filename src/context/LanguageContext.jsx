"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('id'); // Default to ID

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) {
      setLang(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'id' : 'en';
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (enString, idString) => {
    return lang === 'en' ? enString : idString;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
