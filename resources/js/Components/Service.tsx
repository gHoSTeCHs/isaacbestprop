// import { Link } from "react-router-dom";
import Button from './ui/button';
import Header from './ui/header';
import SubService from './ui/subService';

interface ServiceProp {
	subServices: {
		title: string;
		description: string;
		image: string;
	}[];
	header: string;
	description: string;
	ctaheader: string;
	ctadescription: string;
	ctalink?: string;
}

const Service: React.FC<ServiceProp> = ({
	header,
	description,
	subServices,
	ctaheader,
	ctadescription,
}) => {
	return (
		<div>
			<div>
				<Header title={header} description={description} showAbstract={true} />
			</div>
			<div className="flex flex-col gap-5 mt-10">
				{subServices.map((subService) => (
					<SubService
						key={subService.title}
						subserviceTitle={subService.title}
						subserviceDescription={subService.description}
						subserviceImage={subService.image}
					/>
				))}
				<div className="flex flex-col gap-5 bg-background-secondary border border-border p-6 rounded-md">
					<h1 className="text-xl font-bold ">{ctaheader}</h1>
					<Button className="rounded-xl">
						<a
							href={`mailto:isaacamuchie@gmail.com?subject=Inquiry%20about%20${encodeURIComponent(
								header
							)}&body=${encodeURIComponent(
								`I would like to make an inquiry on your ${header} services`
							)}`}>
							Learn More
						</a>
					</Button>
					<p className="text-txt text-sm font-medium ">{ctadescription}</p>
				</div>
			</div>
		</div>
	);
};

export default Service;
