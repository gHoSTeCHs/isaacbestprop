import { useEffect, useRef } from 'react';
import { FAQs } from '@/constants/data';
import Accordion from '../ui/accordian';
import Header from '../ui/header';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
	const faqRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const element = faqRef.current;

		if (element) {
			gsap.fromTo(
				element.querySelector('.header'),
				{
					opacity: 0,
					y: 20,
				},
				{
					opacity: 1,
					y: 0,
					duration: 1,
					scrollTrigger: {
						trigger: element.querySelector('.header'),
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			);

			const accordions = element.querySelectorAll('.accordion');
			accordions.forEach((accordion, index) => {
				gsap.fromTo(
					accordion,
					{
						opacity: 0,
						y: 20,
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						delay: index * 0.1,
						scrollTrigger: {
							trigger: accordion,
							start: 'top 80%',
							toggleActions: 'play none none reverse',
						},
					}
				);
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<section className="container pb-20" ref={faqRef}>
			<div className="mb-7">
				<Header
					title={'Frequently Asked Questions'}
					description={
						"Find answers to common questions about IsaacBestProperties's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
					}
					showAbstract={true}
				/>
			</div>
			<div className="flex flex-col items-center justify-between gap-4 md:flex-row md:flex-wrap w-full">
				{FAQs.map(({ question, answer }) => (
					<Accordion
						title={question}
						content={answer}
						key={question}
						className="accordion"
					/>
				))}
			</div>
		</section>
	);
};

export default FAQ;
