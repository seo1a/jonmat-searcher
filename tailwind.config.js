/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        customRegular: ['MyCustomFont_Regular', 'sans-serif'], 
        customBold: ['MyCustomFont_Bold', 'sans-serif'], 
        alagard: ['MyCustomFont_Alagard', 'sans-serif'],
      },
      backgroundImage: {
        buttonNaver: "url('/assets/naver_button.png')",
        buttonGoogle: "url('/assets/google_button.png')",
        buttonKakao: "url('/assets/kakao_button.png')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

