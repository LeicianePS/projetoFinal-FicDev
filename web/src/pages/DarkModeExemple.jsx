import React, { useState, useEffect } from "react";
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "../components/useDarkMode"
import { GlobalStyles } from "../components/Globalstyle";
import { lightTheme, darkTheme } from "../components/Themes"
import Toggle from "../components/Toggler"
import "../App.css";
import dummyData from "../data";
import CardList from "../components/CardList";

const DarkModeExemple = () => {


  
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;





  if(!mountedComponent) return <div/>

  return (
    <>      
        <ThemeProvider theme={themeMode}>
        <>
        <GlobalStyles/>
            <div className="App">
            <Toggle theme={theme} toggleTheme={themeToggler} />
            Teste
            </div>
        </>
        </ThemeProvider>
    </>


  );
};

export default DarkModeExemple;
