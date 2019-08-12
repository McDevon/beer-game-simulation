import Player from "./Player";
import RingBuffer from "./RingBuffer";
import BarChart from "./BarChart";

class BeerGameSimulation {

    init(canvas) {
        this.canvas = canvas

        this.width = canvas.width
        this.height = canvas.height

        this.total = 0

        this.player1 = new Player(8, 12, 0)
        this.player1History = new RingBuffer(20)
        this.player1Chart = new BarChart(300, 300, 20, 10, 5, canvas)

        this.week = 0

        this.stepTime = 1
        this.timer = this.stepTime

        this.running = true

        this.deliveries = new RingBuffer(4)
        for (let i = 0; i < this.deliveries.size; i++) {
            this.deliveries.put(4)
        }
    }

    redraw() {
        const context = this.canvas.getContext('2d')
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.player1Chart.draw(0, 0, this.player1History.getAll().filter(function (el) {
            return el != null;
          }))
    }

    step() {
        this.week += 1

        let order1 = this.player1.step(this.week < 8 ? 4 : 8, this.deliveries.getTail())
        this.player1History.put(this.player1.inventory - this.player1.backlog)
        this.deliveries.put(order1)

        if (this.week >= 40) {
            this.running = false
        }

        this.redraw()
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