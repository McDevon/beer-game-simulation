import PidController from "./PidController";
import RingBuffer from "./RingBuffer";

class Player {

    constructor(inventory, target, backlog) {
        this.inventory = inventory
        this.target = target
        this.backlog = backlog
        this.deliveries = 4

        this.pid = new PidController(0.8, 0.4, 0, 0, 1000)
        this.history = new RingBuffer(20)
        this.week = 0
    }

    step(purchases, fill) {
        this.week += 1
        
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

        this.refillOrder = Math.round(this.pid.step(fill, purchases))

        console.log(`Week ${this.week}\nRefills ${fill} Purchases ${purchases}\nInventory ${this.inventory} Backlog ${this.backlog}\nOrders ${this.refillOrder}`)
        this.history.put(this.inventory - this.backlog)

        return this.refillOrder
    }
}

export default Player