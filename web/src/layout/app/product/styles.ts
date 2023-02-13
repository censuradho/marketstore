import { styled } from 'stitches.config'

export const Container = styled('div', {
  padding: '2rem 1rem'
})

export const Header = styled('header', {
  marginBottom: '1.3rem',
  display: 'flex',
  justifyContent: 'space-between'
})

export const Section = styled('section', {
  background: '$background',
  borderRadius: '$default',
  maxHeight: '32.25rem',
  overflowY: 'auto',
  padding: 0,

  table: {
    border: '1px solid $border',
    borderRadius: '$default',
    th: {
      cursor: 'pointer',
      userSelect: 'none'
    }
  }
})

export const SectionHeader = styled('header', {
  padding: '1.3rem',
  position: 'sticky',
  left: 0,
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
})

export const SectionFooter = styled('footer', {
  padding: '1.3rem',
  position: 'sticky',
  bottom: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '$background'
})