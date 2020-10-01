import React from 'react'
import ResizeableDiv from './ResizeableDiv'

export default function FlexParent({ children, flexDirection, justifyContent, alignItems, flexWrap, alignContent }) {
    return <ResizeableDiv
        initWidth={window.screen.width - 30}
        initHeight={400}
        otherStyles={{
            userSelect: 'none',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection,
            justifyContent,
            alignItems,
            flexWrap,
            alignContent
        }}
    >
        {children}
    </ResizeableDiv>
}
