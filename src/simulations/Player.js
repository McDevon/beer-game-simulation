import PidController from "./PidController";

class Player {

    constructor(inventory, target, backlog) {
        this.inventory = inventory
        this.target = target
        this.backlog = backlog

        this.pid = new PidController(0.8, 0.4, 0, 0, 1000)
        this.week = 0
    }

    step(purchases, fill) {
        this.week += 1
        
        this.inventory += fill
        let walkins = purchases
        const backlogDeliveries = Math.min(this.backlog, this.inventory)
        this.inventory -= backlogDeliveries
        this.backlog -= backlogDeliveries

        if (this.inventory > 0) {
            const walkinDeliveries = Math.min(walkins, this.inventory)
            this.inventory -= walkinDeliveries
            walkins -= walkinDeliveries
        }

        const orders = walkins > 0 ? Math.floor((Math.random() * walkins)) : 0
        this.backlog += orders

        const refillOrder = Math.round(this.pid.step(fill, purchases))

        console.log(`Week ${this.week}\nRefills ${fill} Purchases ${purchases}\nInventory ${this.inventory} Backlog ${this.backlog}\nOrders ${refillOrder}`)

        return refillOrder
    }
}

export default Player