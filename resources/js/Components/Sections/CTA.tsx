import Header from '../ui/header';
import Button from '../ui/button';
import { Link } from 'react-router-dom';

const CTA = () => {
	return (
		<div className="border border-border border-l-0 border-r-0">
			<section className="container py-12">
				<div className="cta flex flex-col justify-center gap-7 md:flex-row lg:justify-between lg:items-center">
					<div className="max-w-[960px]">
						<Header
							title={'Start Your Real Estate Journey Today'}
							description={
								"Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, IsaacBestProperties is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance."
							}
							showAbstract={false}
						/>
					</div>
					<Button variant="secondary">
						<Link to={'/properties'}>Browse Properties</Link>
					</Button>
				</div>
			</section>
		</div>
	);
};

export default CTA;
