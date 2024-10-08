import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumbsButton';

type PropType = {
	slides: string[];
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
	});
	const [isImageFullScreen, setIsImageFullScreen] = useState(false);
	const [fullScreenImage, setFullScreenImage] = useState('');

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return;
			emblaMainApi.scrollTo(index);
		},
		[emblaMainApi, emblaThumbsApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		setSelectedIndex(emblaMainApi.selectedScrollSnap());
		emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaMainApi) return;
		onSelect();

		emblaMainApi.on('select', onSelect).on('reInit', onSelect);
	}, [emblaMainApi, onSelect]);

	const handleImageClick = (image: string) => {
		setFullScreenImage(image);
		setIsImageFullScreen(true);
	};

	const handleCloseFullScreen = () => {
		setIsImageFullScreen(false);
	};

	return (
		<div className="emblaV2 bg-background-secondary p-4 rounded-md">
			<div className="embla__viewport" ref={emblaMainRef}>
				<div className="embla__containerV2">
					{slides.map((image, index) => (
						<div
							className="embla__slideV2 cursor-pointer"
							key={index}
							onClick={() => handleImageClick(image)}>
							<img
								loading="lazy"
								src={image}
								alt={`Slide ${index + 1}`}
								className=" rounded-md h-[249px] object-cover w-full"
							/>
						</div>
					))}
				</div>
			</div>
			<div className="embla-thumbs">
				<div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
					<div className="embla-thumbs__container bg-background-primary border border-border border-r-0 border-l-0 rounded-md p-2 flex justify-between">
						{slides.map((image, index) => (
							<Thumb
								key={index}
								onClick={() => onThumbClick(index)}
								selected={index === selectedIndex}
								index={index}
								image={image}
							/>
						))}
					</div>
				</div>
			</div>
			{isImageFullScreen && (
				<div
					className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-pointer"
					onClick={handleCloseFullScreen}>
					<img
						src={fullScreenImage}
						alt="Full Screen"
						className="max-h-[90%] max-w-[90%] object-contain"
					/>
				</div>
			)}
		</div>
	);
};

export default EmblaCarousel;
