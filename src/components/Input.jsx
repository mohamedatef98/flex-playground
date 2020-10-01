import React from 'react'


export default function Input({ label, value, onChange, type }) {
    return <div>
        <label>{label}</label>
        <input value={value} type={type} onChange={(e) => onChange(e.target.value)} />
    </div>
}
