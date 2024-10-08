import React from 'react';
import StarComponent from './star';

interface TestmonialProps {
	name: string;
	location: string;
	title: string;
	description: string;
	rating: number;
	image: string;
}

const Testmonial: React.FC<TestmonialProps> = ({
	name,
	location,
	title,
	description,
	rating,
	image,
}) => {
	return (
		<div className="flex flex-col gap-6 border border-border p-7 rounded-lg max-w-[413px] lg:p-10 hover:scale-105 hover:bg-background-secondary/30 transition-all">
			<StarComponent rating={rating} />

			<div className="flex flex-col gap-[6px]">
				<h3 className="text-lg font-semibold lg:text-xl">{title}</h3>
				<p className="text-sm font-medium lg:text-lg">{description}</p>
			</div>
			<div className="flex items-center gap-4">
				<img
					loading="lazy"
					src={image}
					alt={name}
					className="rounded-full w-12 h-12 object-cover"
				/>
				<div>
					<p className="text-base font-medium lg:text-lg">{name}</p>
					<p className="text-txt text-sm font-medium lg:text-base">
						{location}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Testmonial;
