/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                mustard: '#FDDB53',
                ironGray: '#616569',
                maize: '#F3CA40'
            }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem', // Apply padding by default
                sm: '1rem',
                md: '10rem', // Larger padding on medium screens and up
                lg: '10rem',
                xl: '10rem'
            }
        }
    },
    plugins: []
};
