import { styled } from 'stitches.config'

export const Container = styled('div', {
  padding: '1rem',
  borderRadius: '$default',
  width: '100%',
  background: '$background',


  variants: {

    variant: {
      primary: {
        backgroundColor: '$primary'
      },
      secondary: {
        backgroundColor: '$secondary'
      },
      tertiary: {
        backgroundColor: '$quaternary'
      }
    }
  }
})

export const IconView = styled('div', {
  background: '$background',
  borderRadius: '$default',
  padding: '0.5rem'
})