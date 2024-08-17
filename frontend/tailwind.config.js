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
            padding: {
                md: '10rem'
            }
        }
    },
    plugins: []
};
