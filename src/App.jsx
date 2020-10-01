import React, { useRef, useState } from 'react'
import FlexParent from './components/FlexParent'
import FlexChild from './components/FlexChild'
import Select from './components/Select'

import { flexDirectionValues, justifyContentValues, alignItemsValues, flexWrapValues, alignContentValues, colorArray } from './constants'

export default function App() {
    const [flexDirection, setFlexDirection] = useState('row')
    const [justifyContent, setJustifyContent] = useState('normal')
    const [alignItems, setAlignItems] = useState('normal')
    const [flexWrap, setFlexWrap] = useState('nowrap')
    const [alignContent, setAlignContent] = useState('normal')

    const [childs, setChilds] = useState([])

    const nextColor = useRef(0)
    const nextOrder = useRef(0)


    const handleAddClick = e => {
        nextColor.current = nextColor.current + 1
        if (nextColor.current === colorArray.length) nextColor.current = 0

        nextOrder.current = nextOrder.current + 1
        setChilds(c => [...c, { color: colorArray[nextColor.current], order: nextOrder.current }])
    }

    const handleRemoveChild = o => {
        setChilds(childs => childs.filter(({ order }) => o !== order))
    }
    return <div>
        <FlexParent
            flexDirection={flexDirection}
            justifyContent={justifyContent}
            alignItems={alignItems}
            flexWrap={flexWrap}
            alignContent={alignContent}
        >
            {childs.map(({ color, order }) => <FlexChild key={order} index={order} color={color} onRemove={() => handleRemoveChild(order)} />)}
        </FlexParent>
        <button onClick={handleAddClick}>Add Child</button>
        <div>
            <Select label='flexDirection' value={flexDirection} values={flexDirectionValues} onChange={setFlexDirection} />
            <Select label='justifyContent' value={justifyContent} values={justifyContentValues} onChange={setJustifyContent} />
            <Select label='alignItems' value={alignItems} values={alignItemsValues} onChange={setAlignItems} />
            <Select label='flexWrap' value={flexWrap} values={flexWrapValues} onChange={setFlexWrap} />
            <Select label='alignContent' value={alignContent} values={alignContentValues} onChange={setAlignContent} />
        </div>
    </div>
}