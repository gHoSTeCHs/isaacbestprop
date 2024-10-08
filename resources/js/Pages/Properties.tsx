import PropertyCard from "@/Components/PropertyCard";
import {Link} from "@inertiajs/react";

interface PropertiesProps {
    images: string[]
}

const Properties = ({properties, images}) => {
    return (
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
            {properties.map((property) => (
                <Link
                    className="w-full"
                    herf={`/property/${encodeURIComponent(doc.title)}`}
                    key={property.$id}>
                    <PropertyCard
                        title={property.title}
                        location={doc.location}
                        price={doc.price}
                        // images={property.imgUrls}
                        description={property.description}
                        images={images}/>
                </Link>
            ))}
        </div>
    )
}

export default Properties
