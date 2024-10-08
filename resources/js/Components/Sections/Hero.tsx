import { images } from '@/constants';
import Button from '../ui/button';
import Stats from '../Stats';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
	useGSAP(() => {
		gsap.fromTo(
			'#img',
			{ opacity: 0.5, y: 20, ease: 'sine.in' },
			{ opacity: 1, y: 0, delay: 0.05, stagger: 0.2, ease: 'sine.in' }
		);

		gsap.fromTo(
			'#text',
			{ opacity: 0, y: 20, stagger: 0.2, ease: 'sine.in' },
			{ opacity: 1, y: 0, delay: 0.1, stagger: 0.2, ease: 'sine.in' }
		);

		gsap.fromTo(
			'.para',
			{
				opacity: 0,
				y: 20,
				stagger: 0.2,
				ease: 'sine.in',
			},
			{
				opacity: 1,
				y: 0,
				delay: 0.5,
				stagger: 0.2,
				ease: 'sine.in',
			}
		);
	}, []);

	return (
		<div className="container mx-auto mt-9">
			<section className="md:flex md:flex-col-reverse md:items-center md:justify-center lg:flex-row-reverse">
				<div
					id="img"
					className="border border-border rounded-lg overflow-hidden md:border-0">
					<img
						src={images.building}
						alt="Building image"
						loading="lazy"
						className="lg:h-[500px] lg:w-[800px]"
					/>
				</div>
				<div>
					<div className="mt-5 mb-7 md:w-[450px] md:text-center md:flex md:flex-col md:items-center md:jusitfy-center md:gap-2 md:mx-auto md:mt-2 lg:w-auto lg:text-left">
						<h2
							id="text"
							className="text-[28px] font-semibold text-primary md:text-4xl lg:text-5xl">
							Discover Your Dream Property with IsaacBest
						</h2>
						<p className="text-[14px] text-txt lg:text-[16px] para">
							Your journey to finding the perfect property begins here. Explore
							our listings to find the home that matches your dreams.{' '}
							<span className="font-bold">
								{' '}
								Toronto Junction Mcc/Uratta road Imo state Nigeria.
							</span>{' '}
							<span className="font-bold">08035450948</span>,{' '}
							<span className="font-bold">09068412173</span> Email:
							<span className="font-bold">isaacamuchie@gmail.com</span>
						</p>
					</div>
					<div className="flex flex-col gap-4 md:flex-row md:w-[400px] md:mx-auto md:items-center md:justify-center lg:w-auto lg:justify-start">
						<Button className="para">
							<Link to={'/services'}>Learn More</Link>
						</Button>
						<Button className="para" variant="secondary">
							{' '}
							<Link to={'/properties'}>Browse Properties</Link>
						</Button>
					</div>
					<Stats />
				</div>
			</section>
		</div>
	);
};

export default Hero;
