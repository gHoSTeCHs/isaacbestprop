import {Head} from "@inertiajs/react";
import NavBar from "@/Components/Sections/NavBar";
import Hero from "@/Components/Sections/Hero";
import Featured from "@/Components/Sections/Featured";
import Testimonials from "@/Components/Sections/Testimonials";
import FAQ from "@/Components/Sections/FAQs";
import CTA from "@/Components/Sections/CTA";
import Footer from "@/Components/Sections/Footer";
import React from "react";
import {Category, Property} from "@/types";

interface User {
    id: number,
    isAdmin: boolean,
    name: string
}

interface AuthProps {
    user: User
}

interface WelcomeProps {
    auth: AuthProps,
    categories: Category[]
    featuredProperties: Property[]
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
