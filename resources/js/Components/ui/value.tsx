interface ValueProps {
	title: string;
	description: string;
	image: string;
	classname?: string;
}

const ValueComponent: React.FC<ValueProps> = ({
	title,
	description,
	image,
	classname,
}) => {
	return (
		<div className={`flex flex-col gap-3 py-4 ${classname}`}>
			<div className="flex items-center gap-4">
				<img
					loading="lazy"
					src={image}
					className="border border-btn p-4 rounded-full"
					alt="Value Image"
				/>{' '}
				<h3 className="text-lg font-semibold">{title}</h3>
			</div>
			<p className="text-txt text-sm"> {description}</p>
		</div>
	);
};

export default ValueComponent;
