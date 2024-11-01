import NavBar from "@/Components/Sections/NavBar";
import {Head, Link} from "@inertiajs/react";
import React from "react";
import {AuthProps, ConstructionProject} from "@/types";
import PropertyCard from "@/Components/PropertyCard";

const Construction = ({auth, projects}: { auth: AuthProps, projects: ConstructionProject[] }) => {
    console.log(projects)

    return (
        <div>
            <NavBar auth={auth}/>
            <Head title='Ongoing Constructions'/>
            <div className='container'>
                <h3 className='text-xl font-bold py-6'>Ongoing Construction Projects</h3>
                <div
                    className="grid grid-col-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center transition-all duration-75">
                    {projects.map((project, index: number) => {
                        return (
                            <Link className='' href={`/construction/projects/${project.id}`} key={index}>
                                <PropertyCard title={project.title} location={''} price={project.price}
                                              images={project.images}
                                              description={''}/>
                            </Link>

                        )
                    })}

                </div>
            </div>

        </div>
    )
}

export default Construction
