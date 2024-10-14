import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import MultiImageInput from "@/Components/ImageInput";
import {FormEventHandler, useState} from "react";
import {toast} from "react-toastify";
import TextArea from "@/Components/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import {Trash} from "lucide-react";


const Dashboard = ({categories}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const {data, setData, errors, post, processing, reset, delete: destroy} = useForm({
        title: '',
        description: '',
        image: []
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('admin.category'), {
            onSuccess: () => {
                reset('title', 'image', 'description')
                toast.success('Category created successfully');
            }
        })
    }

    const handleDelete = (id) => {
        destroy(route('admin.delete', id), {
            onSuccess: () => {
                if (isModalOpen) {
                    closeModal()
                }

                toast.success('Category deleted successfully')
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create and View Categories
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                            <div className='flex flex-col gap-4 container max-w-[600px]'>

                                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold">Delete Category</h2>
                                        <p>Are you sure you want to delete the category "{categoryToDelete?.title}"?</p>
                                        <div className="flex justify-end gap-4 mt-4">
                                            <button
                                                onClick={() => setIsModalOpen(false)}
                                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={() => handleDelete(categoryToDelete?.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </Modal>
                                <form className='flex flex-col gap-4' onSubmit={handleSubmit}
                                      encType="multipart/form-data">
                                    <div>
                                        <InputLabel htmlFor='title' value='Title'/>
                                        <TextInput id='title'
                                                   type='text'
                                                   name='title'
                                                   value={data.title}
                                                   className='mt-1 block w-full'
                                                   autoComplete='title'
                                                   isFocused={true}
                                                   onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <InputError message={errors.title} className='mt-2'/>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor='description' value='Description'/>
                                        <TextArea
                                            name='description'
                                            className='mt-1 block w-full'
                                            autoComplete='description'
                                            onChange={(e) => setData('description', e.target.value)}/>
                                        <InputError message={errors.description} className='mt-2'/>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor='image' value='Category Image'/>
                                        <MultiImageInput
                                            id='image'
                                            name='image'
                                            value={data.image}
                                            className='mt-1'
                                            onChange={(files) => setData('image', files)}
                                        />
                                        <InputError message={errors.image} className='mt-2'/>
                                    </div>

                                    <div className='inline-block'>
                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <div
                                    className=" grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
                                    {categories.map((category, index) => {
                                        let image;
                                        const categoryImage = category.image.path.split('/')
                                        if (categoryImage[0] == 'https:') {
                                            image = category.image.path;
                                        } else if (categoryImage[0] == 'uploads') {
                                            image = `${window.location.origin}/storage/${category.image.path}`
                                        }

                                        return (
                                            <div
                                                key={index}
                                                className="relative flex flex-col gap-2 justify-center p-4 max-w-[300px] h-[428px] border border-border rounded-xl hover:scale-105 hover:bg-background-secondary/30 transition-all"
                                            >
                                                <img
                                                    loading="lazy"
                                                    src={`${image}`}
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
                                                <Trash className='absolute font-bold text-red-600 top-6 right-6'
                                                       onClick={() => {
                                                           setIsModalOpen(true)
                                                           setCategoryToDelete(category);
                                                       }}/>

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard
