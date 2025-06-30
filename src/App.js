import React, { useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";

import Contact from "./pages/contact";
import Notfound from "./pages/404";

import { TRACKING_ID } from "./data/tracking";
import "./app.css";
import Hz from "./pages/hz";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
  }
`;

function App() {
	const [isDark, setIsDark] = useState(false);
	const toggleTheme = () => setIsDark((prev) => !prev);

	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<GlobalStyle />
			<div className="App">
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
				
					<Route path="/contact" element={<Contact />} />
					<Route path="/hacker-zone" element={<Hz />} />
					<Route path="*" element={<Notfound />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
