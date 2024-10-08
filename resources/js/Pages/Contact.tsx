import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import NavBar from '@/components/sections/NavBar';
import Button from '@/components/ui/button';
import Header from '@/components/ui/header';
import LinkCard from '@/components/ui/linkcard';
import { images } from '@/constants';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Contact = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div>
			<NavBar />
			<div className="container my-10">
				<div className="pb-10">
					<Header
						title={'Get in Touch with IsaacBestProperties'}
						description={
							"Welcome to IsaacBestProperties's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have."
						}
						showAbstract={false}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<LinkCard
						value={'+2348035450948'}
						link={`tel:+2348035450948`}
						image={images.phone}
					/>
					<a href="mailto:isaacbest@gmail.com" title="email">
						<LinkCard value={'isaacamuchie@gmail.com'} image={images.email} />
					</a>

					<LinkCard
						value={'Main Headquarters'}
						link={'https://maps.google.com/?q=<lat>,<lng>'}
						image={images.location}
					/>
					<LinkCard value={'Socials'} link={'#'} image={images.socials} />
				</div>
				<div className="mt-10">
					<Header
						title={"Let's Connect"}
						description={
							"We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with IsaacBestProperties."
						}
						showAbstract={true}
					/>
					<div className="border border-border p-4 rounded-md mt-6">
						<form className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<label htmlFor="name" className="text-base font-semibold">
									First Name
								</label>
								<input
									id="name"
									type="text"
									name="name"
									className="bg-background-secondary w-full border border-border rounded-md p-3"
									placeholder="Enter First Name"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="last_name" className="text-base font-semibold">
									Last Name
								</label>
								<input
									id="last_name"
									type="text"
									name="last_name"
									className="bg-background-secondary w-full border border-border rounded-md p-3"
									placeholder="Enter Last Name"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="email" className="text-base font-semibold">
									Email
								</label>
								<input
									id="email"
									type="email"
									name="
                      email"
									className="bg-background-secondary w-full border border-border rounded-md p-3"
									placeholder="Enter Email"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="number" className="text-base font-semibold">
									Number
								</label>
								<input
									id="number"
									type="number"
									name="number"
									className="bg-background-secondary w-full border border-border rounded-md p-3"
									placeholder="Enter Phone Number"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="message" className="text-base font-semibold">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									rows={5}
									className="bg-background-secondary w-full border border-border rounded-md p-3 "
									placeholder="Enter First Name"
								/>
							</div>

							<Button variant="secondary" className="mt-5">
								Submit
							</Button>
						</form>
					</div>
				</div>
			</div>
			<CTA />
			<Footer />
		</div>
	);
};

export default Contact;
