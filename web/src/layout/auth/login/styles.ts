import { styled } from 'stitches.config'



export const Info = styled('div', {
  padding: '2rem 1rem',
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  marginBottom: '3rem'
})


export const Title = styled('h1', {
  fontSize: '3rem',
  color: '$heading',
  fontWeight: 800
})

export const Section = styled('section', {
  width: '100%',
  flex: 1,
  display: 'flex',
})

export const Form = styled('form', {
  width: '100%',
  background: '$background',
  padding: '5rem 1rem',
  borderRadius: '40px 40px 0 0',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  
  '@laptops-min': {
    maxWidth: '40rem',
    padding: '2rem 1rem',
  }
})

export const Container = styled('main', {
  background: '$primary',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  
  '@table-min': {
    flexDirection: 'row',
    display: 'flex',

    [`${Section}`]: {
      flex: 1,
      height: '100vh',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '$background'
    },

    [`${Info}`]: {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
})
