import {PageProps} from '@/types';
import {Head, Link} from '@inertiajs/react';
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
                                }: PageProps<{ laravelVersion: string; phpVersion: string }>) {

    return (
        <>
            <Head title="Welcome"/>
            <NavBar auth={auth}/>
            <Hero/>
            {/*<Featured/>*/}
            <Testimonials/>
            <FAQ/>
            <CTA/>
            <Footer/>

            {/*<nav className="-mx-3 flex flex-1 justify-end">*/}
            {/*    {auth.user ? (*/}
            {/*        <Link*/}
            {/*            href={route('dashboard')}*/}
            {/*            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*/}
            {/*        >*/}
            {/*            Dashboard*/}
            {/*        </Link>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <Link*/}
            {/*                href={route('login')}*/}
            {/*                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*/}
            {/*            >*/}
            {/*                Log in*/}
            {/*            </Link>*/}
            {/*            <Link*/}
            {/*                href={route('register')}*/}
            {/*                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"*/}
            {/*            >*/}
            {/*                Register*/}
            {/*            </Link>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</nav>*/}
        </>
    );
}
