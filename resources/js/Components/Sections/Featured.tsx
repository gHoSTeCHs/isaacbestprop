import PropertyCard from '../PropertyCard';
import Header from '../ui/header';
import Button from '../ui/button';
import {useEffect, useState} from 'react';
// import { Loader } from 'lucide-react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {Link} from "@inertiajs/react";
import property from "@/Pages/Property"; // Import skeleton styles

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

const Featured = ({featuredProperties}) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<Files[]>([]);
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
                            // Display skeleton loaders while loading
                            // <SkeletonTheme baseColor="#191919">
                            // 	{Array.from({ length: 3 }).map((_, index) => (
                            // 		<div
                            // 			key={index}
                            // 			className="w-full border border-border py-5 px-4 rounded-lg lg:p-5 hover:scale-105 hover:bg-background-secondary/30 transition-all">
                            // 			<Skeleton height={200} />
                            // 			<Skeleton height={20} style={{ marginTop: '10px' }} />
                            // 			<Skeleton height={20} style={{ marginTop: '5px' }} />
                            // 			<Skeleton height={20} style={{ marginTop: '5px' }} />
                            // 		</div>
                            // 	))}
                            // </SkeletonTheme>
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
                                            price={property.price}
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
