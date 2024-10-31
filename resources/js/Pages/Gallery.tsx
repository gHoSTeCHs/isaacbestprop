import {AuthProps, GalleryCategory, GalleryImage} from "@/types";
import React, {useState} from "react";
import NavBar from "@/Components/Sections/NavBar";
import Button from "@/Components/ui/button";
import {
    ZoomIn,
} from "lucide-react";
import Modal from "@/Components/Modal";
import {Head, Link} from "@inertiajs/react";

const Gallery = ({galleryCategories, auth, galleryImages}: {
    galleryCategories: GalleryCategory[],
    auth: AuthProps,
    galleryImages: GalleryImage[]
}) => {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <NavBar auth={auth}/>
            <Head title='Gallery Page'/>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex flex-wrap gap-2 mb-8">
                    <Link href={'/gallery'}>
                        <Button
                            className="capitalize"
                        >
                            All
                        </Button>
                    </Link>
                    {galleryCategories.map((category, index: number) => (
                        <Link href={`/gallery/${category.category}`} key={index}>
                            <Button
                                className="capitalize"
                            >
                                {category.category}
                            </Button>
                        </Link>

                    ))}
                </div>

                {galleryImages.length < 1
                    ?
                    <div>
                        No Images found for this Category. Please choose another.
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                        {galleryImages.map((image, index) => {
                            // Create varied layouts based on index
                            const spanClasses = [
                                "md:col-span-2 md:row-span-2", // Large
                                "md:col-span-2 md:row-span-1", // Wide
                                "md:col-span-1 md:row-span-2", // Tall
                                "md:col-span-1 md:row-span-1", // Normal
                            ][index % 4];

                            const location = window.location.origin
                            const imagePath = `${location}/storage/${image.path}`
                            return (
                                <div
                                    key={image.id}
                                    className={`relative group overflow-hidden rounded-xl ${spanClasses}`}
                                    onClick={() => {
                                        setSelectedImage(image);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <img
                                        src={`${imagePath}`}
                                        alt={'Gallery Image'}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"/>
                                    <div
                                        className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {/*<h3 className="text-white font-semibold text-lg">{image.title}</h3>*/}
                                        {/*<p className="text-white/80 text-sm">{image.category}</p>*/}
                                    </div>
                                    <Button
                                        variant="secondary"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(image);
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        <ZoomIn className="h-4 w-4"/>
                                    </Button>
                                </div>
                            );
                        })}

                    </div>
                }
                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="p-4">
                        {selectedImage ?
                            <div>
                                <img src={`${window.location.origin}/storage/${selectedImage.path}`}
                                     alt={'Gallery Image'}/>
                            </div>
                            :
                            <div>

                            </div>
                        }
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

// @ts-ignore
export default Gallery;
