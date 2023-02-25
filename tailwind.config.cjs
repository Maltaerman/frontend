/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-c-100' :'#F7F9FC',
        'gray-c-200' : '#F0F4FA',
        'gray-c-300' :'#C5D0E3',
        'gray-c-400' :'#91A2BD',
        'gray-c-500' :'#64748C',
        'gray-c-600' :'#495466',
        'gray-c-700' :'#37404D',
        'gray-c-800' :'#1D2229',
        'blue-c-100' : '#F2F7FF',
        'blue-c-200' : '#CCDFFF',
        'blue-c-300' : '#80B0FF',
        'blue-c-400' : '#3C7CE6',
        'blue-c-500' : '#2E60B2',
        'blue-c-600' : '#214580',
        'red-c-100' : '#FFEEEA',
        'red-c-200' : '#FDDFD8',
        'red-c-300' : '#E36144',
        'red-c-500' : '#C02C0B',
        'red-c-600' : '#992309',
        'red-c-700' : '#661706',
        'green-c-200' : '#BDEBBC',
        'green-c-300' : '#5CBF5A',
        'green-c-500' : '#098507',
        'green-c-600' : '#076605',
        'green-c-700' : '#094008',
      },
      boxShadow: {
        'cs1' : '1px 0px 0px rgba(181, 181, 181, 0.25), 2px 0px 20px rgba(207, 205, 205, 0.25);',
        'cs2' : '0px 1px 0px rgba(197, 208, 227, 0.4);',
        'cs3' : '2px 2px 10px 0px rgba(115, 118, 128, 0.11);',
        'cs4' : '4px 4px 12px 0px rgba(177, 177, 177, 0.25);'
      },
      height: {
        '1/12': '8.333334%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333334%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333334%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333334%',
        '11/12': '91.666667%',
      },
      fontSize: {
        'h1': ['32px', '51px'],
        'h1-m': ['24px', '38px'],
        'h2': ['20px', '32px'],
        'h2-m': ['18px', '32px'],
        'h3': ['16px', '26px'],
        'h4': ['14px', '22px'],
        'b3': ['12px', '19px']
      },
      keyframes: {
        appear : {
          '0%': {
            opacity : '0',
            marginTop : '50px'
          },
          '100%': {
            opacity : '1',
            marginTop : '0px'
          },
        },
        disappear : {
          '100%': {
            opacity : '0',
            marginTop : '50px'
          },
          '0%': {
            opacity : '1',
            marginTop : '0px'
          },
        },
        userSettingsAppear : {
          '0%': {
            marginRight : '-100%'
          },
          '100%': {
            marginRight : '0%'
          },
        },
        userSettingsDisappear : {
          '100%': {
            marginRight: '-100%'
          },
          '0%': {
            marginRight: '0%'
          },
        }
      },
      animation:{
        appear : 'appear 0.5s ease',
        disappear : 'disappear 0.5s ease',
        userSettingsAppear : 'userSettingsAppear 0.1s ease',
        userSettingsDisappear : 'userSettingsDisappear 0.1s ease'
      }
    },
    screens : {
      'comp' : {
        'min': '950px',
      },
      'tablet' : {
        'min': '480px',
        'max' : '949px'
      },
      'mobile' : { 'max' : '480px'},
     }
  },
  plugins: [],
}
