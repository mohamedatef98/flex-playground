import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../constants'

export default function ResizeableDiv({ children, otherStyles = {}, initWidth = 300, initHeight = 300, onDoubleClick, onClick }) {
    const [width, setWidth] = useState(initWidth)
    const [height, setHeight] = useState(initHeight)

    const startCoords = useRef([null, null])

    const hListener = useRef(null)
    const vListener = useRef(null)
    const hvListener = useRef(null)

    useEffect(() => {
        const listener = e => {
            if (hListener.current) window.removeEventListener('mousemove', hListener.current)
            if (vListener.current) window.removeEventListener('mousemove', vListener.current)
            if (hvListener.current) window.removeEventListener('mousemove', hvListener.current)
        }
        window.addEventListener('mouseup', listener)

        return () => window.removeEventListener('mouseup', listener)
    }, [])

    const handleHorizontialMouseDown = (e) => {
        startCoords.current[0] = e.clientX
        hListener.current = (e) => {
            const deltaX = e.clientX - startCoords.current[0]
            setWidth(w => w + deltaX)
            startCoords.current[0] = e.clientX
        }
        window.addEventListener('mousemove', hListener.current)
    }

    const handleVerticalMouseDown = (e) => {
        startCoords.current[1] = e.clientY
        vListener.current = (e) => {
            const deltaY = e.clientY - startCoords.current[1]
            setHeight(h => h + deltaY)
            startCoords.current[1] = e.clientY
        }
        window.addEventListener('mousemove', vListener.current)
    }

    const handleHorizontialVerticalMouseDown = (e) => {
        startCoords.current[0] = e.clientX
        startCoords.current[1] = e.clientY
        vListener.current = (e) => {
            const deltaX = e.clientX - startCoords.current[0]
            const deltaY = e.clientY - startCoords.current[1]
            setWidth(w => w + deltaX)
            setHeight(h => h + deltaY)
            startCoords.current[0] = e.clientX
            startCoords.current[1] = e.clientY
        }
        window.addEventListener('mousemove', vListener.current)
    }

    return <div
        onDoubleClick={onDoubleClick}
        onClick={onClick}
        style={{
            width,
            height,
            position: 'relative',
            ...otherStyles
        }}>
        <div
            style={{
                position: 'absolute',
                width: '5px',
                height: '100%',
                top: 0,
                left: '100%',
                background: `linear-gradient(to right, ${COLORS.edgeInner}, ${COLORS.edgeOuter})`,
                cursor: 'e-resize'
            }}
            onMouseDown={handleHorizontialMouseDown}
        >
        </div>
        <div
            style={{
                position: 'absolute',
                width: '100%',
                height: '5px',
                top: '100%',
                left: 0,
                background: `linear-gradient(${COLORS.edgeInner}, ${COLORS.edgeOuter})`,
                cursor: 'n-resize'
            }}
            onMouseDown={handleVerticalMouseDown}
        >
        </div>
        <div
            style={{
                position: 'absolute',
                width: '5px',
                height: '5px',
                top: '100%',
                left: '100%',
                background: `radial-gradient(circle at top left, ${COLORS.edgeInner} 0%, ${COLORS.edgeOuter} 70%)`,
                cursor: 'se-resize'
            }}
            onMouseDown={handleHorizontialVerticalMouseDown}
        >
        </div>
        {children}
    </div>
}