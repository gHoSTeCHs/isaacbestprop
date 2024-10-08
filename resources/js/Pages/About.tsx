import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import NavBar from '@/components/sections/NavBar';
import AchievementComponent from '@/components/ui/achievement';
import Header from '@/components/ui/header';
import ValueComponent from '@/components/ui/value';
import { Achievements, Values } from '@/constants/data';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const About = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<div className="">
			<NavBar />
			<Hero />
			<div className="container mt-10">
				<Header
					title="Our Values"
					description="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
					showAbstract={true}
				/>
				<div className="bg-background-secondary p-2 rounded-xl mt-10">
					<div className="bg-background-primary flex flex-col  border border-border p-5 rounded-xl">
						{Values.map((value, index) => (
							<ValueComponent
								key={index}
								{...value}
								classname={`border-b border-border ${
									index >= Values.length - 1 ? 'border-b-0' : ''
								} `}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="container mt-10 mb-10">
				<Header
					title="Our Achievements"
					description="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
					showAbstract={true}
				/>
				<div className="flex flex-col gap-4 mt-7">
					{Achievements.map((achievement, index) => (
						<AchievementComponent key={index} {...achievement} />
					))}
				</div>
			</div>
			<CTA />
			<Footer />
		</div>
	);
};

export default About;
