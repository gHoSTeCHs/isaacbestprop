import Service from "@/Components/Service";
import CTA from "@/Components/Sections/CTA";
import Footer from "@/Components/Sections/Footer";
import NavBar from "@/Components/Sections/NavBar";
import Header from "@/Components/ui/header";
import {OurServices} from '@/constants/data';
import React from "react";
import {AuthProps} from "@/types";

const Services: ({auth}: { auth: any }) => React.JSX.Element = ({auth}) => {
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
