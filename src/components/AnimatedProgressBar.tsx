import React, { useEffect, useState } from 'react';
import { Box, Text } from '../tuir.js';
import figures from 'figures';

type AnimationStyle = 'wave' | 'pulse' | 'slide' | 'bounce';

interface AnimatedProgressBarProps {
    value: number;
    width?: number;
    style?: {
        filledChar?: string;
        emptyChar?: string;
        animationStyle?: AnimationStyle;
        animationSpeed?: number; // in milliseconds
        showPercentage?: boolean;
        colors?: {
            filled?: string;
            empty?: string;
            text?: string;
        };
    };
}

const defaultProps = {
    width: 20,
    style: {
        filledChar: figures.square,
        emptyChar: figures.squareLightShade,
        waveChar: figures.squareSmallFilled,
        animationStyle: 'wave' as AnimationStyle,
        animationSpeed: 100,
        showPercentage: true,
        colors: {
            filled: 'green',
            empty: 'gray',
            text: 'white'
        }
    }
};

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = (props) => {
    const { value, width = defaultProps.width, style = {} } = props;
    const mergedStyle = { ...defaultProps.style, ...style };
    const {
        filledChar,
        emptyChar,
        waveChar,
        animationStyle,
        animationSpeed,
        showPercentage,
        colors
    } = mergedStyle;

    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setFrame(f => (f + 1) % 1000); // Large number to avoid quick resets
        }, animationSpeed);

        return () => clearInterval(timer);
    }, [animationSpeed]);

    const getProgressChars = () => {
        const progress = Math.min(100, Math.max(0, value));
        const filledCount = Math.round((progress / 100) * width);
        const chars = new Array(width).fill(emptyChar);

        // Fill the progress bar
        for (let i = 0; i < filledCount; i++) {
            chars[i] = filledChar;
        }

        // Apply animation effects
        switch (animationStyle) {
            case 'wave': {
                if (filledCount > 0) {
                    // Create a wave pattern that moves from left to right
                    const waveWidth = 3; // Width of the wave
                    const totalCycles = width + waveWidth; // Total distance to travel
                    const currentPos = frame % totalCycles;
                    
                    // Only draw wave if it's within the filled area
                    if (currentPos < filledCount + waveWidth) {
                        // Draw multiple wave segments for a more visible effect
                        for (let i = 0; i < waveWidth; i++) {
                            const pos = currentPos - i;
                            if (pos >= 0 && pos < filledCount) {
                                chars[pos] = waveChar;
                            }
                        }
                    }
                }
                break;
            }

            case 'pulse': {
                if (filledCount > 0) {
                    const isPulse = frame % 2 === 0;
                    for (let i = 0; i < filledCount; i++) {
                        chars[i] = isPulse ? waveChar : filledChar;
                    }
                }
                break;
            }

            case 'slide': {
                if (filledCount > 0) {
                    // Create a sliding pattern within the filled area
                    const slidePos = frame % filledCount;
                    chars[slidePos] = waveChar;
                }
                break;
            }

            case 'bounce': {
                if (filledCount > 1) {
                    // Create a bouncing effect within the filled area
                    const cycle = frame % (2 * (filledCount - 1));
                    const bouncePos = cycle < filledCount ? cycle : 2 * (filledCount - 1) - cycle;
                    chars[bouncePos] = waveChar;
                }
                break;
            }
        }

        return chars;
    };

    const progressChars = getProgressChars();
    const percentage = Math.min(100, Math.max(0, value));

    return (
        <Box>
            <Text color={colors.filled}>
                {progressChars.slice(0, Math.round((value / 100) * width)).join('')}
            </Text>
            <Text color={colors.empty}>
                {progressChars.slice(Math.round((value / 100) * width)).join('')}
            </Text>
            {showPercentage && (
                <Text color={colors.text}> {percentage}%</Text>
            )}
        </Box>
    );
}; 