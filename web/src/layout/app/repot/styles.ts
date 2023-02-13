import { styled } from 'stitches.config'

export const Container = styled('div', {
  padding: '2rem 1rem'
})

export const Header = styled('header', {
  marginBottom: '1.3rem',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '0.5rem',

  '@table-min': {
    flexDirection: 'row'
  }
})

export const Section = styled('section', {

})