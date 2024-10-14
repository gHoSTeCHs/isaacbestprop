import React, {useEffect} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Button from "./ui/button";

interface PropertyProps {
    title: string | JSX.Element;
    location: string | JSX.Element;
    price: string;
    images: any;
    description: string | JSX.Element;
}

const PropertyCard: React.FC<PropertyProps> = ({
                                                   title,
                                                   location,
                                                   price,
                                                   images,
                                                   description,
                                               }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
    useEffect(() => {
        if (emblaApi) {
            // console.log(emblaApi.slideNodes()) // Access API
        }
    }, [emblaApi]);

    let NGN = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0,
    });

    return (
        <div
            className="flex flex-col gap-6 border border-border max-w-[413px] py-5 px-4 rounded-lg lg:p-5 hover:scale-105 hover:bg-background-secondary/30 transition-all">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">

                    {images.map(
                        (
                            image: { path: string | undefined },
                            index: React.Key | null | undefined
                        ) => {
                            let images;
                            const imagePath = image.path?.split('/');

                            if (imagePath[0] == 'https:') {
                                images = image.path
                            } else if (imagePath[0] == 'uploads') {
                                images = `${window.location.origin}/storage/${image.path}`
                            }
                            return (
                                <img
                                    loading="lazy"
                                    src={images}
                                    alt=""
                                    key={index}
                                    className="embla__slide w-full max-h-[250px] object-cover rounded-md"
                                />
                            )
                        }
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <p className="max-w-[280px] inline-block bg-background-secondary border border-border rounded-full text-sm md:text-base p-1 px-3 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {location}
                </p>

                <div className="flex flex-col gap-1">
                    <h2 className="text-lg md:text-xl font-semibold line-clamp-1">
                        {title}
                    </h2>
                    <p className="text-txt text-sm md:text-base line-clamp-2">
                        {description}
                    </p>
                </div>
                <div className="grid grid-cols-9 gap-4 mt-1">
                    <div className="col-span-4">
                        <p className="text-txt text-sm">Price</p>
                        <h2 className="text-lg md:text-xl font-semibold">
                            {NGN.format(parseInt(price))}
                        </h2>
                    </div>
                    <Button variant="secondary" className="col-span-5">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
