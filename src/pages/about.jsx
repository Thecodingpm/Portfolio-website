import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className="about-logo-container">
						<div className="about-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="about-container">
						<div className="about-main" style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", gap: "40px", marginTop: "40px" }}>
							<div
								style={{
									position: "relative",
									width: "220px",
									height: "220px",
									flexShrink: 0,
								}}
								onMouseOver={(e) => {
									e.currentTarget.querySelectorAll(".hover-image").forEach((img) => {
										img.style.opacity = 1;
										img.style.transform = "scale(1)";
									});
								}}
								onMouseOut={(e) => {
									e.currentTarget.querySelectorAll(".hover-image").forEach((img) => {
										img.style.opacity = 0;
										img.style.transform = "scale(0.8)";
									});
								}}
							>
								<img
									src="/abc.jpg"
									alt="ABC"
									style={{
										width: "100%",
										height: "100%",
										borderRadius: "50%",
										objectFit: "cover",
										animation: "fadeIn 1.2s ease-in-out",
										transition: "transform 0.4s ease-in-out",
										cursor: "pointer",
									}}
								/>
								{["/linux.png", "/mysql.png", "/post.png"].map((src, i) => (
									<img
										key={i}
										src={src}
										className="hover-image"
										style={{
											position: "absolute",
											top: `${i * 60}px`,
											left: `${220 + 10}px`,
											width: "60px",
											height: "60px",
											borderRadius: "8px",
											objectFit: "cover",
											transition: "all 0.4s ease-in-out",
											opacity: 0,
											transform: "scale(0.8)",
											zIndex: 0,
											boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
										}}
									/>
								))}
							</div>
							<div className="about-right-side" style={{ flex: 1, maxWidth: "100%", lineHeight: "1.6" }}>
								<div className="title about-title">
									{INFO.about.title}
								</div>

								<div className="subtitle about-subtitle">
									{INFO.about.description}
								</div>
								<div className="about-socials" style={{ marginTop: "30px" }}>
									<Socials />
								</div>
							</div>
						</div>
						<div className="about-socials-mobile">
							<Socials />
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default About;
