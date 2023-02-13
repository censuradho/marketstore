import { keyframes, styled } from 'stitches.config'
import * as AlertDialog from '@radix-ui/react-alert-dialog';


const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const Overlay = styled(AlertDialog.Overlay, {
  backgroundColor: '$backgroundOverlay',
  position: 'fixed',
  backdropFilter: 'blur(5px)',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 22,
});

export const Content = styled(AlertDialog.Content, {
  backgroundColor: '$background',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  height: '80vh',
  maxHeight: '85vh',
  padding: 25,
  display: 'flex',
  flexDirection: 'column',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 22,
  '&:focus': { outline: 'none' },
  a: {
    color: '$secondary'
  }
});

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  flex: 1,
})


export const {
  Trigger,
  Portal,
  Cancel,
  Root
} = AlertDialog
