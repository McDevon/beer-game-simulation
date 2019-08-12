import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'
import beerSim from '../simulations/BeerSim'
import PidControls from './PidControls';

const BeerGame = props => {
    console.log(props.location.search)

    const [retailer, setRetailer] = useState({
        p: 1, i: 1.2, d: 0, target: 12
    })

    const canvasElement = useRef(null)

    const canvasStyle = {
        border: ' 1px solid #aaa',
    }
    const columnStyle = {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '200px',
        marginLeft: '5px',
        marginRight: '5px'
    }

    const changeRetailer = input => {
        //const { p, i, d, target } = input
        setRetailer(input)
    }

    const startHook = () => {
        console.log('start hook')

        startRender(canvasElement.current, beerSim())
    }

    useEffect(startHook, [])

    return <div>
        <canvas style={canvasStyle} ref={canvasElement} width="400" height="400" />
        <div style={columnStyle}>
            <PidControls
                p={retailer.p} i={retailer.i} d={retailer.d}
                changeP={() => ({ x }) => changeRetailer({ ...retailer, p: x })}
                changeI={() => ({ x }) => changeRetailer({ ...retailer, i: x })}
                changeD={() => ({ x }) => changeRetailer({ ...retailer, d: x })} />
        </div>
    </div>
}

export default BeerGame