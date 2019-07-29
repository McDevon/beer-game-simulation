
class BeerGameSimulation {

    init(canvas) {
        this.canvas = canvas

        this.width = canvas.width
        this.height = canvas.height

        this.total = 0
    }

    fixedUpdate(_) {

    }

    update(dt) {
        this.total += dt
        //console.log('total time', this.total)
    }

    render(_) {
        
    }
}

const beerSim = () => {
    return new BeerGameSimulation()
}

export default beerSim