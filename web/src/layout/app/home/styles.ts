import { styled } from 'stitches.config'

export const Container = styled('div', {
  padding: '2rem'
})

export const List = styled('ul', {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',

  li: {
    width: '100%',
    maxWidth: '300px',
  }
})
