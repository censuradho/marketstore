import { styled } from 'stitches.config'

export const Navigation = styled('nav', {
  width: '100%',
  position: 'fixed',
  bottom: 0,
  right: 0,
  background: '$background',
  borderTop: '$border 1px solid',
  zIndex: 10,

  
  '@laptops-min': {
    display: 'none'
  }
})

export const List = styled('ul', {
  display: 'flex',
})

export const Item = styled('li', {
  flex: 1,
  fontSize: '.75rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  fontWeight: 400,
  padding: '4px',

  a: {
    borderRadius: '$default',
    padding: '10px 10px 5px',
    width: '100%',
    height: '100%',
    fontSize: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 'inherit',
    flex: 1,
    
    '&.active': {
      color: '$heading',
    }
  },

})