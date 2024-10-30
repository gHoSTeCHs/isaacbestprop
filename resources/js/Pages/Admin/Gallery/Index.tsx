import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import React, {FormEventHandler} from "react";
import InputLabel from "@/Components/InputLabel";
import SelectBox from "@/Components/ui/select";
import InputError from "@/Components/InputError";
import MultiImageInput from "@/Components/ImageInput";
import {GalleryCategory} from "@/types";
import z from "zod";
import PrimaryButton from "@/Components/PrimaryButton";
import {toast} from "react-toastify";

const formData = z.object({
    category: z.string(),
    images: z.array(z.union([z.instanceof(File), z.string()])),
})

type FormData = z.infer<typeof formData>

const AdminGallery = ({categories}: { categories: GalleryCategory[] }) => {

    let categoryTitles: string[] = [];
    categories.forEach((category: GalleryCategory) => {
        categoryTitles.push(category.category)
    })


    const {data, setData, errors, post, processing, reset} = useForm<FormData>({
        category: '',
        images: []
    })

    const handleImageChange = (files: (File | string)[]) => {
        setData('images', files);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('gallery.create'), {
            onSuccess: () => {
                reset('category', 'images')
                toast.success('Images uploaded successfully')
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gallery Images
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default AdminGallery
