import Service from '@/components/Service';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import NavBar from '@/components/sections/NavBar';
import Header from '@/components/ui/header';
import {OurServices} from '@/constants/data';

const Services = ({auth}) => {
    return (
        <div>
            <NavBar auth={auth}/>
            <div className="container mb-10">
                <div className="py-10">
                    <Header
                        title="Elevate Your Real Estate Experience"
                        description="Welcome to IsaacBestProperties, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
                        showAbstract={false}
                    />
                </div>
                <div className="flex flex-col gap-10">
                    {OurServices.map((service) => (
                        <Service
                            subServices={service.subservices}
                            header={service.title}
                            description={service.description}
                            ctaheader={service.ctaheader}
                            ctadescription={service.ctadescription}
                            ctalink={service.ctalink}
                        />
                    ))}
                </div>
            </div>
            <CTA/>
            <Footer/>
        </div>
    );
};

export default Services;
