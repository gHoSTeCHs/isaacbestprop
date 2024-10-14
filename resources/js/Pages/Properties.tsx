import {PageProps} from "@/types";
import PropertyCard from "@/Components/PropertyCard";
import NavBar from "@/Components/Sections/NavBar";
import {Head, Link} from "@inertiajs/react";
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
            <Head title={'Properties'}/>
            <div className='container'>
                <p className='my-7 font-bold text-3xl'>Properties</p>
                {properties.length < 1 ?
                    <>
                        <div className="h-screen text-center">
                            <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
                            <p className="mb-4 text-lg text-gray-600">No Property found for the selected category</p>
                            <div className="animate-bounce">
                                <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </div>
                            <p className="mt-4 text-gray-600">Let's get you back <Link href="/properties/categories"
                                                                                       className="text-blue-500">Property
                                Categories</Link>.
                            </p>
                        </div>
                    </> :
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
                }

            </div>
            <Testimonials/>
            <FAQ/>
            <CTA/>
            <Footer/>
        </>
    );
};

export default Properties;
