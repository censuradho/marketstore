import { styled } from 'stitches.config'

export const Container = styled('div', {
  width: '100%',
})

export const Figure = styled('figure', {
  width: '100%',
  height: '300px',
  position: 'relative',
  marginBottom: '1rem',

  img: {
    borderRadius: '$default'
  }
})