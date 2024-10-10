import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import MultiImageInput from "@/Components/ImageInput";
import {FormEventHandler} from "react";
import {ToastContainer, toast} from "react-toastify";
import TextArea from "@/Components/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";

import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {

    const {data, setData, errors, post, processing, reset} = useForm({
        title: '',
        description: '',
        image: []
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('admin.category'), {
            onSuccess: () => {
                reset('title', 'image')
                toast.success('Category created successfully');
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Categories
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                            <div className='flex flex-col gap-4 container max-w-[600px]'>
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
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </AuthenticatedLayout>
    );
}
