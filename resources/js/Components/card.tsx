import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface PropertyProps {
	title: string;
	location: string;
	price: string;
	images: string[];
	description: string;
}

const Card: React.FC<PropertyProps> = ({
	title,
	location,
	price,
	images,
	description,
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	useEffect(() => {
		if (emblaApi) {
			// console.log(emblaApi.slideNodes()) // Access API
		}
	}, [emblaApi]);

	return (
		<div className="">
			<div className="embla" ref={emblaRef}>
				<div className="embla__container">
					{images.map((image) => (
						<img
							loading="lazy"
							src={image}
							alt=""
							className="embla__slide w-full h-full object-cover"
						/>
					))}
				</div>
			</div>

			<p className="font-bold">{title}</p>
			<p className="font-bold">{location}</p>
			<p className="font-bold">{price}</p>
			<p className="">{description}</p>
		</div>
	);
};

export default Card;
