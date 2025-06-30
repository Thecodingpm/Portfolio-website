import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import "./styles/hackerzone.css";
import FakeTerminal from "../components/fakeTerminal/terminalSwitcher";
import BasicAiChatbot from "../components/chatBot/BasicAiChatbot";

const Hz = () => {
  useEffect(() => {
    const canvas = document.getElementById("stars-canvas");
    const ctx = canvas.getContext("2d");

    let stars = [];

    for (let i = 0; i < 800; i++) {
      stars.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: Math.random() * 1.5,
        dx: Math.random() * 0.5,
        dy: Math.random() * 0.5,
      });
    }

    function animate() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.fillStyle = Math.random() < 0.5 ? "#000000" : "#555555";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        if (star.x > canvas.width) star.x = 0;
        if (star.y > canvas.height) star.y = 0;
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Hacker Zone</title>
        <meta name="description" content="Explore fun terminal-style features and hacker-themed UI." />
      </Helmet>

      <div className="page-content">
        <canvas
          id="stars-canvas"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            backgroundColor: "transparent",
            pointerEvents: "none"
          }}
        />
        <NavBar active="hackerzone" />
        <div className="content-wrapper hackerzone-wrapper">
          <div
            style={{
              maxWidth: "800px",
              margin: "140px auto 30px auto",
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              textAlign: "center",
              height: "300px",
              backgroundColor: "#fdfdfd",
            }}
          >
            <div style={{ position: "relative", zIndex: 2, padding: "40px" }}>
              <h1
                style={{
                  fontSize: "52px",
                  fontWeight: "900",
                  fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
                  letterSpacing: "1px",
                  borderBottom: "3px solid #fff",
                  display: "inline-block",
                  paddingBottom: "8px",
                  marginBottom: "12px",
                  color: "#000",
                }}
              >
                Welcome to the play ground
              </h1>
              <p style={{ fontSize: "18px", color: "#000" }}>
                A creative playground for exploring fake terminals, coding experiments, and hacker aesthetics.
              </p>
            </div>
          </div>
          <div style={{ position: "relative", maxWidth: "1200px", margin: "auto", padding: "0 20px" }}>
            {/* Overlay to hide dots behind terminal */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#fdfdfd",
                zIndex: 10,
                pointerEvents: "none",
                borderRadius: "12px"
              }}
            />
            <div style={{ position: "relative", zIndex: 20 }}>
              <h2
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  fontFamily: "'Playfair Display', serif",
                  color: "#222",
                  margin: "40px auto 32px auto",
                  borderBottom: "2px solid rgba(34, 34, 34, 0.4)",
                  paddingBottom: "10px",
                  width: "fit-content",
                  display: "block",
                  textAlign: "center",
                  letterSpacing: "0.05em",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                Terminal
              </h2>
              <FakeTerminal />
            </div>
          </div>
          {/* Add BasicAiChatbot below the terminal section */}
         
        </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "32px", marginTop: "60px", paddingBottom: "30px", borderBottom: "1px solid #ddd" }}>
          <a href="https://github.com/Thecodingpm" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" style={{ width: "32px", height: "32px" }} />
          </a>
          <a href="https://x.com/ahmadmuaaz10?s=21" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="Twitter" style={{ width: "32px", height: "32px" }} />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-ahmad-b71483261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" style={{ width: "32px", height: "32px" }} />
          </a>
        </div>
    </React.Fragment>
  );
};

export default Hz;
