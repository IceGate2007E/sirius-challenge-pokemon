export const colors = {
  primary: '#dd0000',
  secondary: 'darkred',
  grey: '#f3f3f3',
  darkgrey: '#e0e0e0',
};

export const commonStyles = {
  button: {
    color: 'white',
    backgroundColor: colors.secondary,
    borderRadius: '20px',
    font: '500 18px Lato',
    '&:hover': {
      backgroundColor: colors.primary,
    },
  },
  title: {
    font: '700 32px Lato',
    margin: '0',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: '20px',
    padding: '10px 16px',
    backgroundColor: 'white',
  },
  rainbowText: {
    color: 'transparent',
    backgroundImage:
      'linear-gradient(to left, #ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#0000ff,#00ff00,#ffff00,#ff7f00,#ff0000)',
    backgroundClip: 'text',
    animation: 'rainbow-color 8s linear infinite',
    backgroundSize: '2000%',
    '@keyframes rainbow-color': {
      '0%': { backgroundPosition: '0% 50%' },
      '100%': { backgroundPosition: '100% 50%' },
    },
  },
  babyText: {
    color: '#FFCCCC',
    animation: 'baby-color 2s linear infinite alternate',
    '@keyframes baby-color': {
      '0%': { color: '#FFCCCC' },
      '50%': { color: '#ADD8E6' },
      '100%': { color: '#FFCCCC' },
    },
  },
  menuItem: {
    backgroundColor: colors.secondary,
    '& .MuiMenuItem-root': {
      color: 'white',
      font: '500 14px Lato',
      backgroundColor: colors.secondary,
    },
    '& .MuiMenuItem-root:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.12)',
    },
    '& .MuiMenuItem-root.Mui-selected': { backgroundColor: colors.primary },
    '& .MuiMenuItem-root.Mui-selected:hover': {
      backgroundColor: colors.primary,
    },
    '& .MuiListSubheader-root': {
      color: 'white',
      font: '700 18px Lato',
      backgroundColor: colors.secondary,
      padding: '12px',
    },
  },
  textInput: {
    maxWidth: '200px',
    borderRadius: '20px',
    background: 'white',
    height: '40px',
    input: {
      font: '500 16px Lato',
      '&::placeholder': {
        opacity: 1,
        color: '#676767',
        font: '500 16px Lato',
      },
    },
    '& fieldset': {
      border: 'none',
      borderRadius: '20px',
    },
    '.MuiOutlinedInput-root': {
      height: '40px',
      paddingLeft: '4px',
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      borderRadius: '20px',
    },
  },
};
