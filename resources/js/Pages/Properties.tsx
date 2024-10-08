import { PageProps } from "@/types";
import PropertyCard from "@/Components/PropertyCard";
import NavBar from "@/Components/Sections/NavBar";
import { Link } from "@inertiajs/react";

interface PropertiesProps {
    images: string[];
}

const Properties = ({ properties, auth }: PageProps<{ properties: any }>) => {
    return (
        <>
            <NavBar auth={auth} />

            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
                {properties.map((property: any) => {
                    return (
                        <Link
                            className="w-full"
                            href={`/property/${property.title}}`}
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
        </>
    );
};

export default Properties;
