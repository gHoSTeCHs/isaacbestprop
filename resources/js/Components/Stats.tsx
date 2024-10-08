import { useRef } from 'react';
import { statistics } from '@/constants/data';
import Stat from './ui/stat';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
	const scrollRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (scrollRef.current) {
				const stats = gsap.utils.toArray<HTMLElement>(
					scrollRef.current.children
				);
				stats.forEach((stat) => {
					gsap.fromTo(
						stat,
						{ opacity: 0, y: 20, ease: 'sine.in' },
						{ opacity: 1, y: 0, delay: 0.1, stagger: 0.2, ease: 'sine.in' }
					);
				});
			}
		},
		{ scope: scrollRef }
	);

	return (
		<div
			className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 md:mb-10 lg:mb-0"
			ref={scrollRef}>
			{statistics.map((stat, index) => (
				<Stat
					key={index}
					numbers={stat.numbers}
					description={stat.description}
					className={`cursor-pointer 
            hover:bg-background-secondary/50 hover:scale-105 transition-all ${
							index < 2 ? 'col-span-1' : 'col-span-2 md:col-span-1'
						}`}
				/>
			))}
		</div>
	);
};

export default Stats;
