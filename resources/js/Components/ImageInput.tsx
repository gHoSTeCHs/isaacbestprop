import React, {useState, useRef, useEffect} from 'react';
import {X, Upload} from 'lucide-react';
import {useForm} from "@inertiajs/react";
import {toast} from "react-toastify";

interface ImageFile {
    file: File | null; // Updated to allow null for URL images
    preview: string;
    id?: number;
}

interface MultiImageInputProps {
    onChange: (files: (File | string)[]) => void; // Allow string for URLs
    value?: (File | { path: string; id: number })[]; // Allow string for existing URLs
}

const MultiImageInput: React.FC<MultiImageInputProps> = ({onChange, value}) => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Clear object URLs to avoid memory leaks
        return () => {
            images.forEach(image => {
                if (image.file) URL.revokeObjectURL(image.preview);
            });
        };
    }, [images]);

    useEffect(() => {
        if (value) {
            const newImages = value.map(fileOrObj => {
                if (fileOrObj instanceof File) {
                    return {
                        file: fileOrObj,
                        preview: URL.createObjectURL(fileOrObj),
                    };
                } else if (typeof fileOrObj === 'object') {
                    return {
                        file: null,
                        preview: fileOrObj.path, // Use the path from the object
                        id: fileOrObj.id, // Get the ID if available
                    };
                }
                return {file: null, preview: ''}; // Fallback case
            });
            setImages(newImages);
        }
    }, [value]);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            handleFiles(files);
        }
    };

    const handleFiles = (files: File[]) => {
        const validImageFiles = files.filter(file => file.type.startsWith('image/'));
        const newImages = validImageFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onChange(updatedImages.map(img => img.file || img.preview)); // Return File or URL
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onChange(updatedImages.map(img => img.file || img.preview)); // Return File or URL
    };

    const {post, delete: destroy} = useForm({})

    const deleteImage = async (id: any) => {
        try {
            await destroy(route('admin.images', id), {
                onSuccess: () => {
                    toast.success('Image deleted successfully')
                }
            })
        } catch (e) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileInput}
                    multiple
                    accept="image/*"
                />
                <Upload className="mx-auto text-gray-400"/>
                <p className="mt-2 text-sm text-gray-600">
                    Drag and drop images here, or click to select files
                </p>
            </div>
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image.preview}
                                alt={`Preview ${index}`}
                                className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                onClick={() => image.id ? deleteImage(image.id) : removeImage(index)}
                                type="button"
                            >
                                <X size={16}/>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiImageInput;


// {image.preview.path ? <>
//     <div key={index} className="relative group">
//         <img
//             src={image.preview.path}
//             alt={`Preview ${index}`}
//             className="w-full h-24 object-cover rounded-lg"
//         />
//         <button
//             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//             onClick={() => deleteImage(image.preview.id)}
//             type="button"
//         >
//             <X size={16}/>
//         </button>
//     </div>
// </> : <>
//     <div key={index} className="relative group">
//         <img
//             src={image.preview}
//             alt={`Preview ${index}`}
//             className="w-full h-24 object-cover rounded-lg"
//         />
//         <button
//             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//             onClick={() => removeImage(index)}
//             type="button"
//         >
//             <X size={16}/>
//         </button>
//     </div>
// </>}
