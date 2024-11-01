import {number, string} from "zod";

export interface User {
    id: number;
    name: string;
    isAdmin?: boolean;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface UserAuth {
    id: number,
    isAdmin: boolean,
    name: string
}

export interface AuthProps {
    user: UserAuth
}


export interface CategoryImage {
    path: string
}

export interface Category {
    id: number | undefined
    title: string
    description: string
    image: CategoryImage
    created_at?: string,
    updated_at?: string
}

export interface Categories {
    categories: Category[]
}

export interface Amenity {
    id?: number
    property_id?: number
    amenity: string
}


export interface PropertyImage {
    path: string
}

export interface PropertyImages {
    images: PropertyImage[]
}

export interface Property {
    id: number | undefined;
    category?: any
    title: string;
    description: string;
    price: string;
    amenities: Amenity[]
    bathrooms: string;
    bedrooms: string;
    location: string;
    created_at: string;
    updated_at: string;
    sold: boolean;
    property_category_id: number;
    video_url?: string;
    images: PropertyImage[];
}

export interface Properties {
    properties: Property[]
}

export interface Link {
    active: boolean
    label: string
    url: string
}

export interface PaginatedProperties {
    current_page: number
    data: Property[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
}

export interface AdminGalleryCreate {
    title: string
}

export interface GalleryCategory {
    id: number
    category: string
    created_at: string | null | number
    updated_at: string | null | number
}

export interface GalleryImage {
    id: number
    gallery_id: number
    path: string
    created_at: string | null | number
    updated_at: string | null | number
}

export interface ConstructionImage{
    id: number
    construction_id: number
    path: string
    created_at: string
    updated_at: string
}

export interface ConstructionType{
    id: number
    title: string
    description: string
    price: string | number
    youtube_url: string
}

export interface ConstructionProject{
    id: 1
    title: string
    description:string
    price: string
    images: ConstructionImage[]
    created_at: string | number
    updated_at: string
    youtube_url: string
}
