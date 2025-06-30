import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
	faTwitter,
	faGithub,
	faLinkedin,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import INFO from "../../data/user";

import "./styles/socials.css";

const Socials = () => {
	return (
		<div className="socials-floating-card">
			<h2 className="socials-heading">Social Links</h2>
			<div className="socials-grid">
				<a href={INFO.socials.twitter} target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faTwitter} className="social-icon" />
					<span>Twitter</span>
				</a>
				<a href={INFO.socials.github} target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faGithub} className="social-icon" />
					<span>GitHub</span>
				</a>
				<a href={INFO.socials.linkedin} target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faLinkedin} className="social-icon" />
					<span>LinkedIn</span>
				</a>
				<a href={INFO.socials.instagram} target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faInstagram} className="social-icon" />
					<span>Instagram</span>
				</a>
				<a href={`mailto:${INFO.main.email}`} target="_blank" rel="noreferrer">
					<FontAwesomeIcon icon={faEnvelope} className="social-icon" />
					<span>{INFO.main.email}</span>
				</a>
			</div>
		</div>
	);
};

export default Socials;
