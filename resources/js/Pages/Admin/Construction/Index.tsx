import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import React, {FormEventHandler, useState} from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import MultiImageInput from "@/Components/ImageInput";
import z from "zod";
import PrimaryButton from "@/Components/PrimaryButton";
import {toast} from "react-toastify";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import {ConstructionProject} from "@/types";
import Projects from "@/Pages/Admin/Construction/Partials/Projects";

const formData = z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    youtube_url: z.string(),
    images: z.array(z.union([z.instanceof(File), z.string()])),
})

type FormData = z.infer<typeof formData>

const AdminConstruction = ({constructions}: { constructions: ConstructionProject[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<ConstructionProject>()


    const {data, setData, errors, post, processing, reset} = useForm<FormData>({
        title: '',
        description: '',
        price: '',
        youtube_url: '',
        images: []
    })

    const handleImageChange = (files: (File | string)[]) => {
        setData('images', files);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('construction.store'), {
            onSuccess: () => {
                reset('title',
                    'description',
                    'price',
                    'youtube_url', 'images')
                toast.success('Construction Project uploaded successfully')
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Properties under construction
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className='flex flex-col gap-4'
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
                                    <InputLabel htmlFor='price' value='Price'/>
                                    <TextInput id='price'
                                               type='text'
                                               name='price'
                                               value={data.price}
                                               className='mt-1 block w-full'
                                               autoComplete='price'
                                               onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='youtube_url' value='Video URL'/>
                                    <TextInput id='youtube_url'
                                               type='text'
                                               name='youtube_url'
                                               value={data.youtube_url}
                                               className='mt-1 block w-full'
                                               autoComplete='youtube_url'
                                               onChange={(e) => setData('youtube_url', e.target.value)}
                                    />
                                    <InputError message={errors.youtube_url} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='images' value='Images'/>
                                    <MultiImageInput
                                        id='images'
                                        name='images'
                                        value={data.images}
                                        onChange={handleImageChange}
                                    />
                                    <InputError message={errors.images} className='mt-2'/>
                                </div>

                                <div className='inline-block'>
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Submit
                                    </PrimaryButton>
                                </div>
                            </form>

                            <Projects constructions={constructions}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default AdminConstruction
