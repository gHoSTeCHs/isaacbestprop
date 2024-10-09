import {PageProps} from "@/types";
import {Head, Link} from "@inertiajs/react";
import NavBar from "@/Components/Sections/NavBar";
import Hero from "@/Components/Sections/Hero";
import Featured from "@/Components/Sections/Featured";
import Testimonials from "@/Components/Sections/Testimonials";
import FAQ from "@/Components/Sections/FAQs";
import CTA from "@/Components/Sections/CTA";
import Footer from "@/Components/Sections/Footer";

export default function Welcome({
                                    auth,
                                    laravelVersion,
                                    phpVersion,
                                    categories,
                                    featuredProperties
                                }: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    // console.log(featuredProperties)
    return (
        <>
            <Head title="Home"/>
            <NavBar auth={auth}/>
            <Hero categories={categories}/>
            <Featured  featuredProperties={featuredProperties}/>
            <Testimonials/>
            <FAQ/>
            <CTA/>
            <Footer/>
        </>
    );
}
