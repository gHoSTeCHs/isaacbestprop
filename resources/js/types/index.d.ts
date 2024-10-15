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

export interface Amnenity {

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
    id: number
    property_id: number
    amenity: string
}

export interface Amenities {
    amenities: Amenity[]
}

export interface Property {
    id: number | undefined;
    title: string;
    description: string;
    price: string;
    amenities: Amenities
    bathrooms: string;
    bedrooms: string;
    location: string;
    created_at: string;
    updated_at: string;
    sold: boolean;
    property_category_id: number;
    video_url?: string;
    images: string[];
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
