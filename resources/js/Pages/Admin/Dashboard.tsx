import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import PropertyCard from "@/Components/PropertyCard";
import {Edit, Trash} from "lucide-react";
import React, {useState} from "react";
import Modal from "@/Components/Modal";
import {toast} from "react-toastify";
import {PaginatedProperties, Properties, Property} from "@/types";

const Dashboard: ({properties}: { properties: PaginatedProperties }) => React.JSX.Element = ({properties}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<Property>()

    console.log(properties)

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const {post, delete: destroy} = useForm({})

    const handleDelete = (id: any) => {
        destroy(route('admin.properties.delete', id), {
            onSuccess: () => {
                if (isModalOpen) {
                    closeModal()
                }
                toast.success('Property deleted successfully')
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold">Delete Category</h2>
                                    <p>Are you sure you want to delete the category "{propertyToDelete?.title}"?</p>
                                    <div className="flex justify-end gap-4 mt-4">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => handleDelete(propertyToDelete?.id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </Modal>

                            {properties?.data.length < 1 ?
                                <>
                                    No properties found
                                </> :
                                <div
                                    className="grid grid-col-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10 transition-all duration-75">
                                    {properties.data.map((property: any, index) => {
                                        return (
                                            <div
                                                className="relative"
                                                key={index}
                                            >
                                                <PropertyCard
                                                    key={property.id}
                                                    title={property.title}
                                                    location={property.location}
                                                    price={property.price}
                                                    description={property.description}
                                                    images={property.images}
                                                />
                                                <div className='absolute flex items-center gap-3 top-4 right-4'>
                                                    <Link href={route('admin.properties.show', property.id)}>
                                                        <Edit className='text-blue-600 font-bold' size={30}
                                                        />
                                                    </Link>

                                                    <Trash className='text-red-600 font-bold' size={30} onClick={() => {
                                                        setIsModalOpen(true)
                                                        setPropertyToDelete(property)
                                                    }}/>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>}

                            <div className="pagination mt-6">
                                {properties?.links.map((link: any, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-4 py-2 border ${link.active ? 'bg-blue-500 text-white' : ''} ${link.url === null ? 'pointer-events-none text-gray-500' : ''}`}
                                        dangerouslySetInnerHTML={{__html: link.label}}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


export default Dashboard;
