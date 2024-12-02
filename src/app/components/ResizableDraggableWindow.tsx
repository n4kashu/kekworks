import React, { ReactNode } from 'react';

interface ResizableDraggableWindowProps {
  title: string;
  children: ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  onClose?: () => void;
  zIndex?: number;
  opacity?: number;
  style?: React.CSSProperties;
}

const ResizableDraggableWindow: React.FC<ResizableDraggableWindowProps> = ({
  title,
  children,
  initialWidth = 400,
  initialHeight = 300,
  initialX = 100,
  initialY = 100,
  onClose,
  zIndex = 10,
  opacity = 0.8,
  style = {}
}) => {
  return (
    <div 
      className="resizable-draggable-window"
      style={{ 
        position: 'absolute', 
        top: initialY,
        left: initialX,
        width: '100%', // Full width of parent
        maxWidth: initialWidth,
        height: initialHeight,
        zIndex, 
        opacity,
        boxShadow: '0 0 10px rgba(57, 255, 20, 0.5)',
        border: '1px solid rgba(57, 255, 20, 0.3)',
        margin: '0 auto', // Center the window
        '@media (max-width: 768px)': {
          position: 'static',
          maxWidth: '100%',
          margin: '10px 0'
        },
        ...style
      }}
    >
      <div 
        className="window-content" 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        <div 
          className="window-title" 
          style={{
            backgroundColor: 'rgba(57, 255, 20, 0.2)',
            color: 'rgba(57, 255, 20, 0.8)',
            padding: '5px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{title}</span>
          {onClose && (
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(57, 255, 20, 0.8)',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          )}
        </div>
        <div 
          className="window-body" 
          style={{ 
            flex: 1, 
            overflow: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.7)' 
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResizableDraggableWindow;
