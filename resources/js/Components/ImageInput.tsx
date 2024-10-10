import React, { useState, useRef, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

interface ImageFile {
    file: File;
    preview: string;
}

interface MultiImageInputProps {
    onChange: (files: File[]) => void;
    value?: File[];
}

const MultiImageInput: React.FC<MultiImageInputProps> = ({ onChange, value }) => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Clear object URLs to avoid memory leaks
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [images]);

    useEffect(() => {
        if (value) {
            const newImages = value.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
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
            preview: URL.createObjectURL(file)
        }));
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onChange(updatedImages.map(img => img.file));
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onChange(updatedImages.map(img => img.file));
    };

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
                <Upload className="mx-auto text-gray-400" />
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
                                onClick={() => removeImage(index)}
                                type="button"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiImageInput;
