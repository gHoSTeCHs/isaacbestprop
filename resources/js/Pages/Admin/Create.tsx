import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {FormEvent, FormEventHandler} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import MultiImageInput from "@/Components/ImageInput";
import SelectBox from "@/Components/ui/select";
import {boolean} from "zod";

const AdminDashboard = ({categories}) => {
    const {data, setData, post, processing, errors, reset} = useForm({
        title: '',
        category: '',
        description: '',
        location: '',
        bathrooms: '',
        bedrooms: '',
        price: '',
        video_url: '',
        sold: boolean,
        images: [] as File[]
    })

    let categoryTitles = [];
    categories.forEach((category) => {
        categoryTitles.push(category.title)
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('admin.create'), {
            onFinish: () => reset(['title', 'description'])
        })
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                        <div className='flex flex-col gap-4 container max-w-[600px]'>
                            <form className='flex flex-col gap-4' onSubmit={submit} encType="multipart/form-data">
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
                                    <InputLabel htmlFor='categoryId' value='Category'/>
                                    <SelectBox
                                        id='Categories'
                                        name='category'
                                        onChange={(value) => setData('category', value)}
                                        title='category'
                                        values={categoryTitles}/>
                                    <InputError message={errors.category} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='description' value='Description'/>
                                    <TextArea
                                        name='description'
                                        className='mt-1 block w-full'
                                        autoComplete='description'
                                        isFocused={true}
                                        onChange={(e) => setData('description', e.target.value)}/>
                                    <InputError message={errors.description} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='location' value='Location'/>
                                    <TextInput id='location'
                                               type='text'
                                               name='location'
                                               value={data.location}
                                               className='mt-1 block w-full'
                                               autoComplete='location'
                                               isFocused={true}
                                               onChange={(e) => setData('location', e.target.value)}
                                    />
                                    <InputError message={errors.location} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='bathrooms' value='Bathrooms'/>
                                    <TextInput id='bathrooms'
                                               type='text'
                                               name='bathrooms'
                                               value={data.bathrooms}
                                               className='mt-1 block w-full'
                                               autoComplete='bathrooms'
                                               isFocused={true}
                                               onChange={(e) => setData('bathrooms', e.target.value)}
                                    />
                                    <InputError message={errors.bathrooms} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='bedrooms' value='Bedrooms'/>
                                    <TextInput id='bedrooms'
                                               type='text'
                                               name='bedrooms'
                                               value={data.bedrooms}
                                               className='mt-1 block w-full'
                                               autoComplete='bedrooms'
                                               isFocused={true}
                                               onChange={(e) => setData('bedrooms', e.target.value)}
                                    />
                                    <InputError message={errors.bedrooms} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='price' value='Price'/>
                                    <TextInput id='price'
                                               type='text'
                                               name='price'
                                               value={data.price}
                                               className='mt-1 block w-full'
                                               autoComplete='price'
                                               isFocused={true}
                                               onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='video_url' value='Video URL'/>
                                    <TextInput id='video_url'
                                               type='text'
                                               name='video_url'
                                               value={data.video_url}
                                               className='mt-1 block w-full'
                                               autoComplete='video_url'
                                               isFocused={true}
                                               onChange={(e) => setData('video_url', e.target.value)}
                                    />
                                    <InputError message={errors.video_url} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor='sold' value='Sold'/>
                                    <input
                                        id='sold'
                                        name='sold'
                                        type='checkbox'
                                        checked={data.sold}
                                        onChange={(e) => setData('sold', e.target.checked)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor='images' value='Images'/>
                                    <MultiImageInput
                                        id='images'
                                        name='images'
                                        value={data.images}
                                        onChange={(files) => setData('images', files)}
                                    />
                                    <InputError message={errors.images} className='mt-2'/>
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
        </AuthenticatedLayout>
    );
}

export default AdminDashboard
