import React, { useState, ReactNode } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

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
  opacity = 0.8
}) => {
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

  const handleResize = (event: any, { size }: any) => {
    setSize(size);
  };

  return (
    <Draggable 
      handle=".window-title"
      defaultPosition={{ x: initialX, y: initialY }}
    >
      <div 
        className="resizable-draggable-window"
        style={{ 
          position: 'absolute', 
          zIndex, 
          opacity,
          boxShadow: '0 0 10px rgba(57, 255, 20, 0.5)',
          border: '1px solid rgba(57, 255, 20, 0.3)'
        }}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          onResize={handleResize}
          minConstraints={[300, 200]}
          maxConstraints={[window.innerWidth - 50, window.innerHeight - 50]}
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
                alignItems: 'center',
                cursor: 'move'
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
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default ResizableDraggableWindow;
