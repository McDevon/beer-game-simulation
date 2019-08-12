import PidController from "./PidController";
import RingBuffer from "./RingBuffer";

class Player {

    constructor(inventory, target, backlog) {
        this.inventory = inventory
        this.target = target
        this.backlog = backlog
        this.deliveries = 4

        this.pid = new PidController(0.4, 2, 0, 0, 1000)
        this.history = new RingBuffer(20)

        this.log = ""
    }

    step(purchases, fill) {        
        this.inventory += fill
        let walkins = purchases
        this.deliveries = Math.min(this.backlog, this.inventory)
        this.inventory -= this.deliveries
        this.backlog -= this.deliveries

        if (this.inventory > 0) {
            const walkinDeliveries = Math.min(walkins, this.inventory)
            this.inventory -= walkinDeliveries
            walkins -= walkinDeliveries
            this.deliveries += walkinDeliveries
        }

        const orders = walkins > 0 ? Math.floor((Math.random() * walkins)) : 0
        this.backlog += orders

        this.refillOrder = Math.round(this.pid.step(this.inventory, this.target))

        this.log = `fill: ${fill} Purch: ${purchases} Inv: ${this.inventory} BL: ${this.backlog} Ord: ${this.refillOrder}`
        this.history.put(this.inventory) //this.inventory - this.backlog)

        return this.refillOrder
    }
}

export default Player