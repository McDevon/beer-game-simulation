class PidController {
    constructor(p, i, d, minU, maxU, antiWindup = true) {
        this.e = 0
        this.lastE = 0
        this.p = p
        this.i = i
        this.d = d
        this.minU = minU
        this.maxU = maxU
        this.iTerm = 0
        this.antiWindup = antiWindup
    }

    step(current, target) {
        const e = target - current
        const newI = this.iTerm + e
        const d = e - this.lastE

        let u = this.p * e + this.i * newI + this.d * d

        let enableAntiWindup = false

        if (u > this.maxU) {
            u = this.maxU
            if (this.antiWindup && e > 0) {
                enableAntiWindup = true
            }
        } else if (u < this.minU) {
            u = this.minU
            if (this.antiWindup && e < 0) {
                enableAntiWindup = true
            }
        }

        if (!enableAntiWindup) {
            this.iTerm = newI
        }

        this.lastE = e

        return u
    }
}

export default PidController