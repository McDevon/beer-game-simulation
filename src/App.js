import React, { useEffect } from 'react'
import Footer from './components/Footer'
import BeerGame from './components/BeerGame';

const App = props => {
  const divStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '900px'
  }

  useEffect(() => {
    console.log('app effect')
  })

  return (
    <div style={divStyle}>
        <BeerGame location={window.location} />
      <Footer />
    </div>
  )
}

export default App