import {ConstructionProject} from "@/types";
import React, {useState} from "react";
import {Link, useForm} from "@inertiajs/react";
import {toast} from "react-toastify";
import Modal from "@/Components/Modal";
import PropertyCard from "@/Components/PropertyCard";
import {Edit, Trash} from "lucide-react";

const Projects = ({constructions}: { constructions: ConstructionProject[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<ConstructionProject>()

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const {delete: destroy} = useForm({})
    const handleDelete = (id: any) => {
        destroy(route('admin.projects.delete', id), {
            onSuccess: () => {
                if (isModalOpen) {
                    closeModal()
                }

                toast.success('Property deleted successfully')
            }
        })
    }

    return (
        <div>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-4">
                    <h2 className="text-xl font-bold">Delete Project</h2>
                    <p>Are you sure you want to delete the Project "{projectToDelete?.title}"?</p>
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => handleDelete(projectToDelete?.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>

            {constructions?.length < 1 ?
                <>
                    No properties found
                </> :
                <div
                    className="grid grid-col-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10 transition-all duration-75">
                    {constructions.map((property: any, index) => {
                        return (
                            <div
                                className="relative"
                                key={index}
                            >
                                <PropertyCard
                                    key={property.id}
                                    title={property.title}
                                    location={''}
                                    price={property.price}
                                    description={property.description}
                                    images={property.images}
                                />
                                <div className='absolute flex items-center gap-3 top-4 right-4'>

                                    <Trash className='text-red-600 font-bold' size={30} onClick={() => {
                                        setIsModalOpen(true)
                                        setProjectToDelete(property)
                                    }}/>
                                </div>
                            </div>
                        );
                    })}
                </div>}

        </div>
    )
}

export default Projects
