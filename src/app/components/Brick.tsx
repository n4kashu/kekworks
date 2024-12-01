import React from 'react';
import styles from './Brick.module.css';

interface BrickProps {
  color?: string;
  size?: number;
}

const Brick: React.FC<BrickProps> = ({ 
  color = '#bb86fc', 
  size = 20 
}) => {
  return (
    <div 
      className={styles.brick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color
      }}
    />
  );
};

export default Brick;
