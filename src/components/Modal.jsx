import React from 'react'
import classes from './Modal.module.css'

export default function Modal({ open, children, onClose }) {
    if (!open) return null
    else return <div className={classes.background} onClick={onClose}>
        <div className={classes.childContainer} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
}