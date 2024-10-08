interface SubServiceProp {
	subserviceTitle: string;
	subserviceDescription: string;
	subserviceImage: string;
}

const SubService: React.FC<SubServiceProp> = ({
	subserviceTitle,
	subserviceDescription,
	subserviceImage,
}) => {
	return (
		<div className="flex flex-col gap-3 border border-border p-4 rounded-xl ">
			<div className="flex items-center gap-3 ">
				<div className="flex items-center justify-center border border-btn p-3 rounded-full w-10 h-10 overflow-hidden">
					<img
						src={subserviceImage}
						alt="Image"
						className="w-[30px]"
						loading="lazy"
					/>
				</div>

				<h1 className="text-lg font-semibold">{subserviceTitle}</h1>
			</div>
			<p className="text-sm text-txt">{subserviceDescription}</p>
		</div>
	);
};

export default SubService;
