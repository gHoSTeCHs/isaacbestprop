import { userTestimonials } from '@/constants/data';
import Header from '../ui/header';
import Testmonial from '../ui/testmonial';
import { useEffect, useState } from 'react';

const test = userTestimonials;
interface TestimonialType {
	name: string;
	location: string;
	title: string;
	description: string;
	rating: number;
	image: string;
}

const Testimonials = () => {
	const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);

	const testimonialsToShow = () => {
		const width = window.innerWidth;
		let allowedTestimonials;
		if (width < 640) {
			allowedTestimonials = 1;
		} else if (width < 800) {
			allowedTestimonials = 2;
		} else if (width >= 1024) {
			allowedTestimonials = 3;
		}

		setTestimonials(test.slice(0, allowedTestimonials));
	};

	useEffect(() => {
		testimonialsToShow();
		window.addEventListener('resize', testimonialsToShow);

		return () => {
			window.removeEventListener('resize', testimonialsToShow);
		};
	}, []);

	return (
		<div>
			<section className="container py-20 pt-10">
				<Header
					title="What Our Clients Say"
					description="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose IsaacBestProperties for their real estate needs."
					showAbstract={true}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 mt-10">
					{testimonials.map((testimonial) => (
						<Testmonial {...testimonial} key={testimonial.name} />
					))}
				</div>
			</section>
		</div>
	);
};

export default Testimonials;
