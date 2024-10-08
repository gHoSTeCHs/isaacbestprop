import { images } from '@/constants';
import React from 'react';

interface LinkCardProps {
	value: string;
	link?: string;
	image: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ value, link, image }) => {
	return (
		<div className="border border-border rounded-md p-5 relative hover:bg-background-secondary/50">
			<a href={link}>
				<div className="flex flex-col gap-3 items-center justify-center">
					<img
						loading="lazy"
						src={image}
						alt="Image"
						className="border border-btn p-3 rounded-full "
					/>
					<h3 className="text-sm font-semibold">{value}</h3>
				</div>
			</a>
			<img
				loading="lazy"
				src={images.arrow}
				alt="arrow image"
				className="absolute top-5 right-7"
			/>
		</div>
	);
};

export default LinkCard;
