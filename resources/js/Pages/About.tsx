import CTA from "@/Components/Sections/CTA";
import Footer from "@/Components/Sections/Footer";
import Hero from '@/Components/Sections/Hero';
import NavBar from '@/Components/Sections/NavBar';
import AchievementComponent from "@/Components/ui/achievement";
import Header from "@/Components/ui/header";
import ValueComponent from "@/Components/ui/value";
import {Achievements, Values} from '@/constants/data';
import {Head} from "@inertiajs/react";
import React from "react";
import {AuthProps, Category} from "@/types";

interface AboutProps{
    auth: AuthProps
    categories: Category[]
}

const About: React.FC<AboutProps> = ({auth, categories}) => {

    return (
        <div className="">
            <Head title={'About'}/>
            <NavBar auth={auth}/>
            <Hero categories={categories}/>
            <div className="container mt-10">
                <Header
                    title="Our Values"
                    description="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
                    showAbstract={true}
                />
                <div className="bg-background-secondary p-2 rounded-xl mt-10">
                    <div className="bg-background-primary flex flex-col  border border-border p-5 rounded-xl">
                        {Values.map((value, index) => (
                            <ValueComponent
                                key={index}
                                {...value}
                                classname={`border-b border-border ${
                                    index >= Values.length - 1 ? 'border-b-0' : ''
                                } `}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="container mt-10 mb-10">
                <Header
                    title="Our Achievements"
                    description="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
                    showAbstract={true}
                />
                <div className="flex flex-col gap-4 mt-7">
                    {Achievements.map((achievement, index) => (
                        <AchievementComponent key={index} {...achievement} />
                    ))}
                </div>
            </div>
            <CTA/>
            <Footer/>
        </div>
    );
};

export default About;
