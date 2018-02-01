import React from 'react'
import { Theme } from 'rmwc/Theme'
import './PopupPage.css'

const PopupPage = (props) => {
  let className = 'PopupPage'
  if (props.open) className += ' PopupPage--open'

  return (
    <div className={className} style={{top: props.top, height: `calc(100% - ${props.top}px)`}}>
      <div className="PopupPage__inner">
        {props.children}
      </div>
    </div>
  )
}

export default PopupPage
