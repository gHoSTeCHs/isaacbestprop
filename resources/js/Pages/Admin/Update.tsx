import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import {FormEventHandler} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import MultiImageInput from "@/Components/ImageInput";
import SelectBox from "@/Components/ui/select";
import {boolean} from "zod";
import {toast} from 'react-toastify';

const UpdateProperty = ({property, categories}) => {
    const {data, setData, patch, processing, errors, reset} = useForm({
        title: property.title,
        category: '',
        description: property.description,
        amenities: property.amenities,
        location: property.location,
        bathrooms: property.bathrooms,
        bedrooms: property.bedrooms,
        price: property.price,
        video_url: property.video_url,
        sold: property.sold,
        images: property.images as File[]
    })

    let categoryTitles = [];
    categories.forEach((category) => {
        categoryTitles.push(category.title)
    })

    const addAmenity = () => {
        setData('amenities', [...data.amenities, {amenity: ''}])
    }

    const removeAmenity = (index) => {
        const updatedAmenities = data.amenities.filter((_, i) => i !== index);
        setData('amenities', updatedAmenities);
    };

    const handleAmenityChange = (index, e) => {
        const updatedAmenities = [...data.amenities];
        updatedAmenities[index].amenity = e.target.value;
        setData('amenities', updatedAmenities);
    };

    // console.log(data.images)


    const submit: FormEventHandler = async (e) => {
        e.preventDefault()
        const id = property.id;

        try {
            await patch(route('admin.properties', id), {
                onSuccess: () => {
                    toast.success('Property Updated')
                }
            })

        } catch (e) {
            toast.error('Something went wrong')
        }

    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Update Property
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                        <div className='flex flex-col gap-4 container max-w-[600px]'>
                            <form className='flex flex-col gap-4' onSubmit={submit}
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
                                        defaultValue={data.description}
                                        className='mt-1 block w-full'
                                        autoComplete='description'
                                        onChange={(e) => setData('description', e.target.value)}/>
                                    <InputError message={errors.description} className='mt-2'/>
                                </div>

                                <div>
                                    <InputLabel htmlFor="amenities" value="Amenities"/>
                                    <div className="flex flex-col gap-2">
                                        {data.amenities.map((data, index) => (
                                            <div key={index} className="flex gap-2">
                                                <TextInput
                                                    id={`amenity-${index}`}
                                                    type="text"
                                                    name={`amenities[${index}].amenity`}
                                                    value={data.amenity}
                                                    onChange={(e) => handleAmenityChange(index, e)}
                                                    placeholder="Enter an amenity"
                                                    className="block w-full"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeAmenity(index)}
                                                    className="bg-red-500 text-white p-2 rounded"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addAmenity}
                                            className="mt-2 bg-blue-500 text-white p-2 rounded"
                                        >
                                            Add Amenity
                                        </button>
                                        {errors.amenities && (
                                            <InputError message={errors.amenities} className="mt-2"/>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor='location' value='Location'/>
                                    <TextInput id='location'
                                               type='text'
                                               name='location'
                                               value={data.location}
                                               className='mt-1 block w-full'
                                               autoComplete='location'
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
                                        defaultValue={data.sold}
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

export default UpdateProperty
