/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/js/**/*.{vue,js,ts,jsx,tsx}"],
    safelist: [
        {
            pattern: /^w-\[\d+(px|%)?\]$/, // Match dynamic width classes
        },
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
