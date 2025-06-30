import React, { useState } from "react";
import FakeTerminal from "./fakeTerminal";
import LiveHtmlTerminal from "./LiveHtmlTerminal";
import "./styles/terminalSwitcher.css";

const TerminalSwitcher = () => {
  const [activeTerminal, setActiveTerminal] = useState("fake");

  return (
    <>
      <div className="terminal-dropdown-top-wrapper">
        <select
          className="terminal-dropdown-top"
          value={activeTerminal}
          onChange={(e) => setActiveTerminal(e.target.value)}
        >
          <option value="fake">Fake Terminal</option>
          <option value="html">Live HTML Terminal</option>
        </select>
      </div>
      <div className="terminal-switcher-container">
        <div className="terminal-panel">
          {activeTerminal === "fake" ? <FakeTerminal /> : <LiveHtmlTerminal />}
        </div>
      </div>
    </>
  );
};

export default TerminalSwitcher;