import React from 'react';
import { Box, Text } from '../tuir.js';
import { useSpinner } from './useSpinner.js';
export function Spinner({ label, type, speed }) {
    const { frame } = useSpinner({ type, speed });
    //const {styles} = useComponentTheme<Theme>('Spinner');
    return (React.createElement(Box, null,
        React.createElement(Text, null, frame),
        label && React.createElement(Text, null, label)));
}
//# sourceMappingURL=Spinner.js.map