import {PageProps} from "@/types";
import PropertyCard from "@/Components/PropertyCard";
import NavBar from "@/Components/Sections/NavBar";
import {Link} from "@inertiajs/react";
import Testimonials from "@/Components/Sections/Testimonials";
import FAQ from "@/Components/Sections/FAQs";
import CTA from "@/Components/Sections/CTA";
import Footer from "@/Components/Sections/Footer";

interface PropertiesProps {
    images: string[];
}

const Properties = ({properties, auth}: PageProps<{ properties: any }>) => {
    return (
        <>
            <NavBar auth={auth}/>

            <div className='container'>
                <p className='my-7 font-bold text-3xl'>Properties</p>
                <div
                    className="grid grid-col-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
                    {properties.map((property: any) => {
                        return (
                            <Link
                                className="w-full"
                                href={`/property/${property.title}`}
                                key={property.$id}
                            >
                                <PropertyCard
                                    key={property.id}
                                    title={property.title}
                                    location={property.location}
                                    price={property.price}
                                    description={property.description}
                                    images={property.images}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
            <Testimonials/>
            <FAQ/>
            <CTA/>
            <Footer/>
        </>
    );
};

export default Properties;
