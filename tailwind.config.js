module.exports = {
  content: [
    "./src/**/*.{hmtl,js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        'white-nav':'#fcfbfb',
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ]
}