/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            margin: {
                xs: '0.5rem',
                sm: '1rem',
                md: '1.5rem',
                lg: '2rem',
                xlg: '2.5rem',
                xxlg: '3rem'
            }
        },
    },
    plugins: [],
} satisfies Config