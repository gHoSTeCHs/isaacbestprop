// import { images } from "@/constants";
import FooterComponent from '../ui/footer';
import { footerLinks } from '@/constants/data';
import logo from '../../assets/icons/logo3.svg';

const Footer = () => {
	return (
		<footer>
			<div className="container flex flex-col gap-5 py-10 ">
				<div>
					<img
						loading="lazy"
						src={logo}
						alt="Logo"
						className="w-[93px] h-[35px] md:w-[114px] md:h-[35px]"
					/>
				</div>
				<div className="grid grid-cols-2 gap-7 md:grid-cols-4 lg:grid-cols-5">
					{footerLinks.map((footerlink, index) => (
						<FooterComponent
							key={footerlink.title}
							title={footerlink.title}
							links={footerlink.links}
							classname={`border-b border-border pb-5 md:border-0 ${
								index % 2 === 0 ? 'border-r md:border-0' : ''
							}`}
						/>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
// className="grid grid-cols-2 gap-6 place-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
