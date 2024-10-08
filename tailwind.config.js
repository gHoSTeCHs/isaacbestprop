import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    theme: {
        extend: {
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    '2xl': '1400px',
                    xl: '1140px',
                    lg: '960px',
                    md: '768px',
                    sm: '640px',
                    xs: '480px',
                },
            },
            colors: {
                'background-primary': '#F7F7F7',
                'background-secondary': '#FFFFFF',
                primary: '#2D3748',
                txt: '#718096',
                border: '#E2E8F0',
                btn: '#5A67D8',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
