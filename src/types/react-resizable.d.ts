declare module 'react-resizable' {
  import React from 'react';

  export interface ResizableProps {
    width: number;
    height: number;
    onResize?: (e: React.SyntheticEvent, data: { size: { width: number, height: number } }) => any;
    onResizeStart?: (e: React.SyntheticEvent, data: { size: { width: number, height: number } }) => any;
    onResizeStop?: (e: React.SyntheticEvent, data: { size: { width: number, height: number } }) => any;
    children?: React.ReactNode;
    className?: string;
    minConstraints?: [number, number];
    maxConstraints?: [number, number];
    lockAspectRatio?: boolean;
    axis?: 'both' | 'x' | 'y';
  }

  export class ResizableBox extends React.Component<ResizableProps> {}
  export class Resizable extends React.Component<ResizableProps> {}
}
