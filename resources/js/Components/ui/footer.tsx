import React from 'react';
import { Link } from 'react-router-dom';

interface FooterComponentProps {
	title: string;
	links: {
		name: string;
		link: string;
	}[];
	classname?: string;
}

const FooterComponent: React.FC<FooterComponentProps> = ({
	title,
	links,
	classname,
}) => {
	return (
		<div className={`flex flex-col gap-4 ${classname}`}>
			<h1 className="text-txt font-semibold text-base">{title}</h1>
			<div>
				<ul className="flex flex-col gap-2">
					{links.map((link) => (
						<li
							key={link.name}
							className="text-sm hover:text-txt font-semibold">
							<Link className="" to={link.link}>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default FooterComponent;
