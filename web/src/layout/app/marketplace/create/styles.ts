import { styled } from 'stitches.config'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  minHeight: '100vh'
})

export const Category = styled('a', {
  background: '$foreground',
  borderRadius: '$default',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '11.875rem',
  height: '250px',
  padding: '2rem 1rem',
  alignItems: 'center'
})

export const List = styled('ul', {
  display: 'flex',
  gap: '2rem',
  justifyContent: 'center',
  width: '100%'
})

export const IconBox = styled('div', {
  borderRadius: '50%',
  padding: '1rem',
  background: '$primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})