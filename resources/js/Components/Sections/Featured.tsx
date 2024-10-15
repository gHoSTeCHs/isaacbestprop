import PropertyCard from '../PropertyCard';
import Header from '../ui/header';
import Button from '../ui/button';
import React, {useState} from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import {Link} from "@inertiajs/react";
import {Property} from "@/types";

// interface Files {
//     imgUrls: string[];
//     $id: string;
//     title: string;
//     description: string;
//     location: string;
//     price: string;
//     images: string[];
//     video?: string;
//     propertyType?: string;
// }


interface FeaturedProps {
    featuredProperties: Property[];
}

const Featured: React.FC<FeaturedProps> = ({featuredProperties}) => {
    const [loading, setLoading] = useState(false);
    // const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    return (
        <section className="py-20">
            <div className="container">
                <div>
                    <div className="mb-6">
                        <Header
                            title="Featured Properties"
                            description="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through IsaacBestProperties. Click 'View Details' for more information."
                            showAbstract={true}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
                        {loading ? (
                            loading
                        ) : (
                            featuredProperties.map((property) => {
                                return (
                                    <Link
                                        className="w-full"
                                        href={`/property/${property.title}`}
                                        key={property.id}>
                                        <PropertyCard
                                            title={property.title || 'Untitled'}
                                            location={property.location}
                                            price={String(property.price)}
                                            images={property.images}
                                            description={property.description}
                                        />
                                    </Link>
                                )
                            })
                        )}
                        {error && <p>{`Error loading featured properties: ${error}`}</p>}
                    </div>
                    <div className="w-full">
                        <Button
                            variant="primary"
                            className="bg-background-secondary w-full mt-5">
                            <Link href={'/properties/categories'}> View All Properties </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
