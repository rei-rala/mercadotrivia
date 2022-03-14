import React from "react";
import styles from './floatingButton.module.scss';

interface IFloatingButtonProps {
  click: (args: any) => any,
  children?: any,
  variant?: 'primary' | 'secondary' | 'tertiary',
  positionX?: 'top' | 'bottom',
  positionY?: 'left' | 'right',
}

const FloatingButton: React.FC<IFloatingButtonProps> = ({children, click, variant, positionX='bottom', positionY='right'}) => {

  return (
    <button className={`${styles.float} ${variant ? styles[variant] : ''} ${styles[positionX]} ${styles[positionY]}`} onClick={click}>
      {children}
    </button>
  )
}

export default FloatingButton;