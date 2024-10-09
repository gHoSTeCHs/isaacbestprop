import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import NavBar from "@/components/sections/NavBar";
import Header from "@/components/ui/header";
import {ArrowLeftIcon} from "lucide-react";
import {useEffect, useState} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {PageProps} from "@/types";
import {Head, Link} from "@inertiajs/react";

interface Files {
    imgUrls: string[];
    $id: string;
    title: string;
    description: string;
    location: string;
    price: string;
    images: string[];
    video?: string;
    propertyType?: string;
}

const Categories = ({auth, categories}) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
        };
    }, []);

    return (
        <div>
            <NavBar auth={auth}/>
            <Head title={'Categories'}/>
            <div className="container">
                <section className="py-12">
                    <Header
                        title="Choose a Property Type"
                        description="Select a property type to explore the available options."
                        showAbstract={true}
                    />
                    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
                        {categories.map((category) => (
                            <Link
                                href={`/properties/categories/${category.title}`}
                            >
                                <div
                                    key={category.title}
                                    className="flex flex-col gap-2 justify-center p-4 max-w-[300px] h-[428px] border border-border rounded-xl hover:scale-105 hover:bg-background-secondary/30 transition-all"
                                >
                                    <img
                                        loading="lazy"
                                        src={category.image.path}
                                        alt={category.title}
                                        className="w-full h-[200px] object-cover rounded-xl"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-xl font-semibold">
                                            {category.title}
                                        </h1>
                                        <p className="text-sm text-txt">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
                <CTA/>
                <Footer/>
            </div>
        </div>
    );
};

export default Categories;
