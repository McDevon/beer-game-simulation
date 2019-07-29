import React from 'react'
import LabelSlider from './LabelSlider'

const PidControls = ({p, i ,d, changeP, changeI, changeD}) => {

    const style = {
        border: '5px'
    }

    return <div style={style}>
        <LabelSlider
            label='P' value={p.toFixed(2)}
            min={-10} max={10} step={0.05}
            onChange={changeP}
            />
        <LabelSlider
            label='I' value={i.toFixed(2)}
            min={-10} max={10} step={0.05}
            onChange={changeI}
            />
        <LabelSlider
            label='D' value={d.toFixed(2)}
            min={-10} max={10} step={0.05}
            onChange={changeD}
            />
    </div>
}

export default PidControls