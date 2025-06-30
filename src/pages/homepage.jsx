import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGithub,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import Article from "../components/homepage/article";
import Works from "../components/homepage/works";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";
import myArticles from "../data/articles";
import skills from "../data/skills";


import "./styles/homepage.css";

const Homepage = () => {
	const [stayLogo, setStayLogo] = useState(false);
	const [logoSize, setLogoSize] = useState(80);
	const [oldLogoSize, setOldLogoSize] = useState(80);
	const [showScatter, setShowScatter] = useState(false);

	const slideshowImages = [
		`${process.env.PUBLIC_URL}/react.png`,
		`${process.env.PUBLIC_URL}/next.png`,
		`${process.env.PUBLIC_URL}/git.png`,
	];
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const imageRef = useRef();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			let scroll = Math.round(window.pageYOffset, 2);
			let newLogoSize = 80 - (scroll * 4) / 10;

			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 40) {
					setLogoSize(newLogoSize);
					setOldLogoSize(newLogoSize);
					setStayLogo(false);
				} else {
					setStayLogo(true);
				}
			} else {
				setLogoSize(newLogoSize);
				setStayLogo(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [logoSize, oldLogoSize]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "home");

	const logoStyle = {
		display: "flex",
		position: stayLogo ? "fixed" : "relative",
		top: stayLogo ? "3vh" : "auto",
		zIndex: 999,
		border: stayLogo ? "1px solid white" : "none",
		borderRadius: stayLogo ? "50%" : "none",
		boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
	};

	const toggleScatter = () => setShowScatter(!showScatter);

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
			</Helmet>

			<div className="page-content">
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						<div style={logoStyle}>
							<Logo width={logoSize} link={false} />
						</div>
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title">
									{INFO.homepage.title}
								</div>

								<div className="subtitle homepage-subtitle">
									{INFO.homepage.description}
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div
									className="interactive-image-wrapper exceptional-animation"
									style={{ position: 'relative' }}
									onMouseEnter={() => setShowScatter(true)}
									onMouseLeave={() => setShowScatter(false)}
								>
									<img
										src="/abc.JPG"
										alt="Main Visual"
										className="main-image"
									/>
									{showScatter && (
										<div className="scatter-images-group">
											<img src="/react.png" alt="React" className="scatter-img" style={{ position: 'absolute', top: '-60px', left: '-60px' }} />
											<img src="/next.png" alt="Next.js" className="scatter-img" style={{ position: 'absolute', top: '-60px', right: '-60px' }} />
											<img src="/git.png" alt="Git" className="scatter-img" style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)' }} />
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="homepage-socials">
							<a href={INFO.socials.twitter} target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faTwitter} className="homepage-social-icon" />
							</a>
							<a href={INFO.socials.github} target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faGithub} className="homepage-social-icon" />
							</a>
							<a href={INFO.socials.linkedin} target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faLinkedin} className="homepage-social-icon" />
							</a>
							<a href={INFO.socials.instagram} target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faInstagram} className="homepage-social-icon" />
							</a>
							<a href={`mailto:${INFO.main.email}`} target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faMailBulk} className="homepage-social-icon" />
							</a>
						</div>

						<section className="skills-section">
							<h2 className="animated-skills-heading">My Skills</h2>
							<div style={{ marginTop: "40px" }}></div>
							<div className="skills-grid">
								{skills.map((skill, index) => (
									<div key={index} className="skill-icon">
										<img
											src={skill.image}
											alt={skill.name}
											className="skill-logo"
											onError={(e) => {
												e.target.style.display = "none";
											}}
										/>
										<span>{skill.name}</span>
									</div>
								))}
							</div>
						</section>

						<section className="skills-section">
							<h2 className="animated-skills-heading">My Projects</h2>
							<div className="homepage-projects">
								<AllProjects />
							</div>
						</section>


						<div className="homepage-after-title">
							<div className="homepage-articles">
								{myArticles.map((article, index) => (
									<div className="homepage-article" key={(index + 1).toString()}>
										<Article
											key={(index + 1).toString()}
											date={article().date}
											title={article().title}
											description={article().description}
											link={"/article/" + (index + 1)}
										/>
									</div>
								))}
							</div>

							<div className="homepage-works">
								<Works />
							</div>
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;