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

// ResizableDraggableWindow component removed as part of draggable window feature cleanup.
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

  const windowTitleStyle = {
    fontWeight: 'bold',
    color: 'rgba(57, 255, 20, 1)',
    textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
    letterSpacing: '1px',
    fontSize: '1em'
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
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
          boxSizing: 'border-box'
        }}
      >
        {/* Window header */}
        <div 
          className="window-header" 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            flexShrink: 0
          }}
        >
          <h3 style={windowTitleStyle}>{title}</h3>
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
        
        {/* Content area */}
        <div 
          style={{ 
            flex: 1, 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResizableDraggableWindow;
