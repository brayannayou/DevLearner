import React from 'react'

interface Props {
    children : React.ReactNode;
    onClick: React.MouseEventHandler;
}

export const StyledButton = ({ children, onClick }: Props) => <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={onClick}>{children}</button>
