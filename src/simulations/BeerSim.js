import Player from "./Player";

class BeerGameSimulation {

    init(canvas) {
        this.canvas = canvas

        this.width = canvas.width
        this.height = canvas.height

        this.total = 0

        this.player1 = new Player(8, 12, 0)

        this.week = 0

        this.stepTime = 1
        this.timer = this.stepTime

        this.running = true
    }

    step() {
        this.week += 1

        this.player1.step(this.week < 8 ? 4 : 8, 4)

        if (this.week >= 40) {
            this.running = false
        }
    }

    fixedUpdate(_) {

    }

    update(dt) {
        if (!this.running) {
            return
        }

        this.timer -= dt

        if (this.timer <= 0) {
            this.timer += this.stepTime
            this.step()
        }
        //console.log('total time', this.total)
    }

    render(_) {
        
    }
}

const beerSim = () => {
    return new BeerGameSimulation()
}

export default beerSim