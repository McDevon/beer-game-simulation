import Player from "./Player";
import RingBuffer from "./RingBuffer";
import BarChart from "./BarChart";

class BeerGameSimulation {

    init(canvas) {
        this.canvas = canvas

        this.width = canvas.width
        this.height = canvas.height

        this.total = 0

        this.players = [
            new Player(8, 12, 0),
            new Player(1, 5, 0),
            new Player(1, 5, 0)
        ]
        this.charts = [
            new BarChart(230, 300, 20, 10, 5, canvas),
            new BarChart(230, 300, 20, 10, 5, canvas),
            new BarChart(230, 300, 20, 10, 5, canvas)
        ]

        this.week = 0

        this.stepTime = 1
        this.timer = this.stepTime

        this.running = true

        this.brewery = new RingBuffer(2)
        for (let i = 0; i < this.brewery.size; i++) {
            this.brewery.put(4)
        }
    }

    redraw() {
        const context = this.canvas.getContext('2d')
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (let i = 0; i < this.charts.length; i++) {
            this.charts[i].draw(10 + i * 240, 10, this.players[i].history.getAll().filter(function (el) {
                return el != null;
              }))
        }
    }

    step() {
        this.week += 1

        let orders = this.week < 8 ? 4 : 8

        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i]
            const fill = i < this.players.length - 1 ? this.players[i + 1].deliveries : this.brewery.getTail()
            orders = player.step(orders, fill)
        }
        this.brewery.put(orders)

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