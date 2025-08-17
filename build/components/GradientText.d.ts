import React from 'react';
interface GradientTextProps {
    children: React.ReactNode;
    startColor?: string;
    endColor?: string;
    numberOfSegments?: number;
}
export declare const GradientText: React.FC<GradientTextProps>;
export {};
