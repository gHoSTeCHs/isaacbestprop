import {Head} from "@inertiajs/react";
import NavBar from "@/Components/Sections/NavBar";
import Hero from "@/Components/Sections/Hero";
import Featured from "@/Components/Sections/Featured";
import Testimonials from "@/Components/Sections/Testimonials";
import FAQ from "@/Components/Sections/FAQs";
import CTA from "@/Components/Sections/CTA";
import Footer from "@/Components/Sections/Footer";
import React from "react";
import {Categories} from "@/types";

interface User {
    id: number,
    isAdmin: boolean,
    name: string
}

interface AuthProps {
    user: User
}


interface FeaturedProperty {
    id: number;
    title: string;
    description: string;
    price: number;
    bathrooms: number;
    bedrooms: number;
    location: string;
    created_at: string; // You might want to use Date type if you parse it
    updated_at: string; // Same as above
    sold: number;
    property_category_id: number;
    video_url?: string; // Optional if not always present
    images: string[];
}

interface WelcomeProps {
    auth: AuthProps,
    categories: Categories
    featuredProperties: FeaturedProperty[]
}


const Welcome: React.FC<WelcomeProps> = ({
                                             auth,
                                             categories,
                                             featuredProperties
                                         }) => {

    return (
        <>
            <Head title="Home"/>
            <NavBar auth={auth}/>
            <Hero categories={categories}/>
            <Featured featuredProperties={featuredProperties}/>
            <Testimonials/>
            <FAQ/>
            <CTA/>
            <Footer/>
        </>
    );
}

export default Welcome
