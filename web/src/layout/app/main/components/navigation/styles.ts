import { styled, keyframes  } from 'stitches.config'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Header = styled('header', {
  width: '100%',
  zIndex: 10,
  padding: '1rem',
})

export const Username = styled('strong', {
})

export const Navigation = styled('nav', {
  width: '100%',
  maxWidth: '80vw',
  height: '100%',
  background: '$background',
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translateX(-100%)',
  transition: '0.2s ease',
  '@smartphone-min': {
    maxWidth: '16.875rem'
  },
  zIndex: 10,

  borderRight: '$border 1px solid',
  '@laptops-min': {
    maxWidth: '20rem',
  },

  variants: {
    open: {
      true: {
        transform: 'translateX(0)'
      }
    }
  }
})

export const Overlay = styled('div', {
  width: '100%',
  height: '100%',
  transform: 'translateX(-100%)',
  position: 'absolute',
  top: 0,
  left: 0,
  transition: '0.2s ease',
  zIndex: 11,
  
  variants: {
    open: {
      true: {
        transform: 'translateX(0)',
        backdropFilter: 'blur(5px)',

        [`${Navigation}`]: {
          transform: 'translateX(0)',
        },
      },
      
    }
  },
    
  '@laptops-min': {
    transform: 'translateX(0)',
    position: 'static',
    width: 'max-content',

    [`${Navigation}`]: {
      transform: 'translateX(0)',
      position: 'static',
      width: '20rem',
    }
  }
})

export const List = styled('ul', {
  width: '100%',
})

export const Item = styled('li', {
  width: '100%',
  fontSize: '.875rem',

  a: {
    width: '100%',
    display: 'flex',
    gap: '0.5rem',
    fontSize: '.875rem',
    padding: '1rem 32px 1rem 39px',
    '&.active': {
      background: '$primary',
      color: '$heading'
    }
  },

  '@laptops-min': {
    a: {
      fontWeight: 400,
      color: '$highlight',
      gap: '1rem',
      outline: 'none',
      
      '&:hover, &:focus': {
        background: '$background'
      },
      '&.active': {
        background: 'unset',
        '&:hover, &:focus': {
          background: '$background'
        },
        color: '$heading',
        fontWeight: 700
      }
    },
  }
})

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});


const contentStyles = {
  minWidth: 220,
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
  zIndex: 11,
};

export const DropdownMenuContent = styled(DropdownMenu.Content, contentStyles);

export  const DropdownMenuArrow = styled(DropdownMenu.Arrow, { fill: 'white' });

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  padding: '0.3rem',
  color: '$heading',
  display: 'flex',
  alignItems: 'center',
  height: 25,
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',
  cursor: 'pointer',

  '&[data-disabled]': {
    color: '$ancesst7',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: '$ancesst7',
    color: '$heading',
  },
}

export  const DropdownMenuItem = styled(DropdownMenu.Item, itemStyles);


export  const DropdownMenuLabel = styled(DropdownMenu.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: '25px',
});

export const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: '$border',
  margin: 5,
});


export const DropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});


export const Trigger = styled(DropdownMenu.Trigger, {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  outline: 'none',
  padding: '1rem',
  borderRadius: '$default',

  '&:hover, &:focus': {
    background: '$foreground'
  }
})

export const {
  Root,
  Portal,
} = DropdownMenu