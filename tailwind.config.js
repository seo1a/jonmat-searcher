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
        pretendard: ['pretendard', 'sans-serif'],
        noto_sans: ['noto-sans', 'sans-serif'],
      },
      backgroundImage: {
        buttonNaver: "url('/assets/naver_button.png')",
        buttonGoogle: "url('/assets/google_button.png')",
        buttonKakao: "url('/assets/kakao_button.png')",
        buttonNaver2: "url('/assets/naver_button2.png')",
        buttonGoogle2: "url('/assets/google_button2.png')",
        buttonKakao2: "url('/assets/kakao_button2.png')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

