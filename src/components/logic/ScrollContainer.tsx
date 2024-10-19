// ScrollContainer.tsx

import React from 'react';

interface ScrollContainerProps {
    children: React.ReactNode;
    maxHeight: string;
}

export const ScrollContainer: React.FC<ScrollContainerProps> = ({ children, maxHeight }) => {
    return (
        <div
            style={{ maxHeight: maxHeight, overflowY: 'auto', overflowX: 'auto' }}
        >
            {children}
        </div>
    );
};
