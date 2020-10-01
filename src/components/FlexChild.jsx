import React, { useState } from 'react'
import ResizeableDiv from './ResizeableDiv'
import Modal from './Modal'
import Input from './Input'
import Select from './Select'

import { alignSelfValues } from '../constants'

export default function FlexChild({ index, onRemove, color }) {
    const [order, setOrder] = useState(0)
    const [flexGrow, setFlexGrow] = useState(0)
    const [flexShrink, setFlexShrink] = useState(0)
    const [flexBasis, setFlexBasis] = useState('auto')
    const [alignSelf, setAlignSelf] = useState('stretch')

    const [modalOpen, setModalOpen] = useState(false)

    const handleDivClick = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false)

    return <>
        <ResizeableDiv
            onClick={handleDivClick}
            onDoubleClick={onRemove}
            initWidth={150}
            initHeight={150}
            otherStyles={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                backgroundColor: color,
                order,
                flexGrow,
                flexShrink,
                flexBasis,
                alignSelf

            }}
        >
            <h1>{index}</h1>
        </ResizeableDiv>
        <Modal open={modalOpen} onClose={handleModalClose}>
            <div>
                <Input type='number' value={order} onChange={setOrder} label='order' />
                <Input type='text' value={flexGrow} onChange={setFlexGrow} label='flexGrow' />
                <Input type='text' value={flexShrink} onChange={setFlexShrink} label='flexShrink' />
                <Input type='text' value={flexBasis} onChange={setFlexBasis} label='flexBasis' />
                <Select label='alignSelf' value={alignSelf} values={alignSelfValues} onChange={setAlignSelf} />
            </div>
        </Modal>
    </>
}
