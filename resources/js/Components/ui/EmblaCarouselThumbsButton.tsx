import React from 'react';

type PropType = {
	selected: boolean;
	index: number;
	onClick: () => void;
	image: string; // Add image prop
};

export const Thumb: React.FC<PropType> = (props) => {
	const { selected, index, onClick, image } = props;

	return (
		<div
			className={`embla-thumbs__slide ${
				selected ? 'embla-thumbs__slide--selected' : ''
			}`}
			onClick={onClick}>
			<img
				loading="lazy"
				src={image}
				alt={`Thumbnail for slide ${index + 1}`}
				className="embla-thumbs__slide__image w-[67px] h-[41px] object-cover rounded-md"
			/>
		</div>
	);
};
