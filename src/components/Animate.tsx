import React from 'react'
import Lottie from 'react-lottie'

interface Props {
    animationData: {};
    height?: number;
    width?: number;
}

export const Animate = ({ animationData, height, width, ...props }: Props) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        animationData,
        ...props,
    }
    return (
        <Lottie
            options={defaultOptions}
            height={height || 200}
            width={width || 200}
        />
    )
}