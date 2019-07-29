import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'

const BeerGame = props => {
    console.log(props.location.search)

    const canvasElement = useRef(null)

    const canvasStyle = {
        border: ' 1px solid #aaa',
    }

    return <div>
        <canvas style={canvasStyle} ref={canvasElement} width="100" height="100" />
    </div>
}

export default BeerGame