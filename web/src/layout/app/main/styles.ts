import { styled } from 'stitches.config'

export const Container = styled('div', {
  height: '100vh',
  width: '100%',
  display: 'flex',
  overflow: 'hidden',
})

export const Main = styled('main', {
  flex: 1,
  padding: '0 4vw 4vw',
  maxWidth: '1600px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  background: '$foreground',
  paddingBottom: '10rem',
  '@laptops-min': {
    padding: '0 48px 48px'
  }
})


export const Title = styled('h2', {
  zIndex: 1,
  textTransform: 'capitalize',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  margin: '-3px 0 0',
  padding: '0',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '2rem',
  lineHeight: '1.3em',
  fontWeight: 700,
  letterSpacing: '-.021em',
  minHeight: '35px',
})

