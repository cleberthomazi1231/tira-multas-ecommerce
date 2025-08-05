/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        colors: {
            'white': '#FFFFFF',
            'black': '#000000',
            'lightGray': '#F2F2F2',
            'gray': '#D8D8D8',
            'green': '#2BA555',
            'lightYellow': '#F4E8C5',
            'yellow': '#F2B502',
            'red': '#D92121'
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
    },
    plugins: [],
};
