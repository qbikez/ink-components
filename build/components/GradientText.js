import React from 'react';
import { Text } from '../tuir.js';
import chalk from 'chalk';
const interpolateColor = (color1, color2, factor) => {
    const hex1 = color1.startsWith('#') ? color1.slice(1) : color1;
    const hex2 = color2.startsWith('#') ? color2.slice(1) : color2;
    const r1 = parseInt(hex1.slice(0, 2), 16);
    const g1 = parseInt(hex1.slice(2, 4), 16);
    const b1 = parseInt(hex1.slice(4, 6), 16);
    const r2 = parseInt(hex2.slice(0, 2), 16);
    const g2 = parseInt(hex2.slice(2, 4), 16);
    const b2 = parseInt(hex2.slice(4, 6), 16);
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
export const GradientText = ({ children, startColor = '#ff0000', endColor = '#0000ff', numberOfSegments = 10 }) => {
    if (typeof children !== 'string') {
        return React.createElement(Text, null, children);
    }
    const characters = children.split('');
    let result = '';
    for (let i = 0; i < characters.length; i++) {
        const factor = i / (characters.length - 1);
        const color = interpolateColor(startColor, endColor, factor);
        result += chalk.hex(color)(characters[i]);
        //result += characters[i];
    }
    return React.createElement(Text, null, result);
};
//# sourceMappingURL=GradientText.js.map