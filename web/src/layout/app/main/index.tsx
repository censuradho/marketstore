import { useState } from 'react'
import * as Styles from './styles'

import { Navigation, BottomNav } from './components'
import dynamic from "next/dynamic";


export function MainLayout ({ children }: any) {
  const [isOpenNavigation, setIsOpenNavigation] = useState(false)
  
  return (
    <Styles.Container>
      <Navigation onToggleMenu={() => setIsOpenNavigation(prevState => !prevState)} open={isOpenNavigation} />
      <BottomNav onToggleMenu={() => setIsOpenNavigation(prevState => !prevState)} />
      <Styles.Main>
        {children}
      </Styles.Main>
    </Styles.Container>
  )
}