import React from 'react'


export default function Select({ label, value, values, onChange }) {
    return <div>
        <label>{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {values.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
    </div>
}
