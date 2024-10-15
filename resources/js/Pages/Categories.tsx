import CTA from "@/Components/Sections/CTA";
import Footer from "@/Components/Sections/Footer";
import NavBar from "@/Components/Sections/NavBar";
import Header from "@/Components/ui/header";
import React, {useEffect, useState} from "react";
import {Head, Link} from "@inertiajs/react";
import {AuthProps, Categories, Category} from "@/types";

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

interface CategoryProps{
    auth: AuthProps
    categories: Categories
}

const Categories: React.FC<CategoryProps> = ({auth, categories}) => {
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
                        {categories?.map((category: Category) => {
                            let image;
                            const categoryImage = category.image.path.split('/')
                            if (categoryImage[0] == 'https:') {
                                image = category.image.path;
                            } else if (categoryImage[0] == 'uploads') {
                                image = `${window.location.origin}/storage/${category.image.path}`
                            }

                            return (
                                <Link
                                    href={`/properties/categories/${category.title}`}
                                >
                                    <div
                                        key={category.title}
                                        className="flex flex-col gap-2 justify-center p-4 max-w-[300px] h-[428px] border border-border rounded-xl hover:scale-105 hover:bg-background-secondary/30 transition-all"
                                    >
                                        <img
                                            loading="lazy"
                                            src={image}
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
                            )
                        })}
                    </div>
                </section>
                <CTA/>
                <Footer/>
            </div>
        </div>
    );
};

export default Categories;
