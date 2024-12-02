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
  const windowStyle: React.CSSProperties = {
    position: 'absolute',
    top: initialY,
    left: initialX,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    border: '1px solid rgba(57, 255, 20, 0.3)',
    margin: '0 auto', // Center the window
    boxShadow: '0 0 10px rgba(57, 255, 20, 0.3)',
    color: 'rgba(57, 255, 20, 0.56)',
    width: initialWidth,
    height: initialHeight,
    maxWidth: '100%',
    zIndex, 
    opacity,
    ...style
  };

  return (
    <div 
      className="resizable-draggable-window"
      style={windowStyle}
    >
      <div 
        className="window-content" 
        style={{ 
          width: '100%', 
          height: '100%', 
          overflow: 'auto',
          padding: '10px'
        }}
      >
        {/* Window header */}
        <div 
          className="window-header" 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          <h3 style={{ margin: 0, color: 'rgba(57, 255, 20, 0.56)' }}>{title}</h3>
          {onClose && (
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: '1px solid rgba(57, 255, 20, 0.3)',
                color: 'rgba(57, 255, 20, 0.56)',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          )}
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default ResizableDraggableWindow;
