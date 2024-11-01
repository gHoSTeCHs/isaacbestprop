import {AuthProps, ConstructionProject} from "@/types";
import NavBar from "@/Components/Sections/NavBar";
import Footer from "@/Components/Sections/Footer";
import {EmblaOptionsType} from "embla-carousel";
import EmblaCarousel from "@/Components/ui/imgcarousel";
import React from "react";
import ReactPlayer from "react-player/youtube";
import {Head} from "@inertiajs/react";

const OPTIONS: EmblaOptionsType = {};
const ConstructionShow = ({auth, project}: { auth: AuthProps, project: ConstructionProject }) => {
    let projectImages: any = [];
    project?.images.forEach((image) => {
        projectImages.push(image.path)
    })

    return (
        <div>
            <NavBar auth={auth}/>
            <Head title='Project'/>
            <div className='container'>
                <div className='space-y-6 mt-10'>
                    <h3 className='text-2xl font-bold'>{project.title}</h3>
                    <p>{project.description}</p>
                    <EmblaCarousel slides={projectImages} options={OPTIONS}/>
                    <div className="py-4 mt-4 rounded-md">
                        {project.youtube_url ? (
                            <ReactPlayer
                                url={project.youtube_url}
                                width={"100%"}
                            />
                        ) : (
                            <p>No Video available</p>
                        )}
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )

}

export default ConstructionShow
