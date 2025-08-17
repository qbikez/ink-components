import React from 'react';
type AnimationStyle = 'wave' | 'pulse' | 'slide' | 'bounce';
interface AnimatedProgressBarProps {
    value: number;
    width?: number;
    style?: {
        filledChar?: string;
        emptyChar?: string;
        animationStyle?: AnimationStyle;
        animationSpeed?: number;
        showPercentage?: boolean;
        colors?: {
            filled?: string;
            empty?: string;
            text?: string;
        };
    };
}
export declare const AnimatedProgressBar: React.FC<AnimatedProgressBarProps>;
export {};
