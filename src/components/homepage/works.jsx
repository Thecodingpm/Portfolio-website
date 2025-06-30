import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work Experience"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./upwork.svg"
								alt="upwork"
								className="work-image"
							/>
							<div className="work-title">Freelancer</div>
							<div className="work-subtitle">
								Software Engineer
							</div>
							<div className="work-duration">2024 - Present</div>
						</div>

						<div className="work">
							<img
								src="./webspline.png"
								alt="webspline"
								className="work-image"
							/>
							<div className="work-title">Web Splines</div>
							<div className="work-subtitle">
								Software Enginee Intern
							</div>
							<div className="work-duration">2022 - 2023</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
