/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                white: {
                    full: "#FFFFFF",
                    medium: "#F9F9f9",
                    low: "#F1F1F1",
                },
                black: {
                    full: "#212529",
                    medium: "#9BA2A8",
                    low: "#6C757D",
                },
                state: {
                    yellow: {
                        full: "#E1DB30",
                        medium: "#E7E255",
                        low: "#FFFDB2",
                    },
                    red: {
                        full: "#E34A46",
                        medium: "#FE9F99",
                        low: "#FFF5F2",
                    },
                    green: {
                        full: "#489019",
                        medium: "#7DC932",
                        low: "#EEFFCD",
                    },
                },
                blue: {
                    full: "#0034BB",
                    medium: "#3C7BC6",
                    low: "#F6FAFD",
                },
                complementary: {
                    yellow: "#D1A34F",
                    green: "#32C3A4",
                    purple: "#A13764",
                },
            },
            maxWidth: {
                "8xl": "90rem",
                "9xl": "100rem",
                "10xl": "110rem",
                "11xl": "120rem",
            },
        },
    },
    plugins: [],
};

