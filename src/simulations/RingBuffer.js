class RingBuffer {
    constructor(size) {
        this.size = size
        this.buffer = []
        this.buffer.length = size
        this.nextIndex = 0
    }

    put(value) {
        this.buffer[this.nextIndex] = value
        this.nextIndex = (this.nextIndex + 1) % this.size
    }

    getHead() {
        return this.buffer[(this.nextIndex - 1) % this.size]
    }

    getTail() {
        return this.buffer[this.nextIndex]
    }

    getAll() {
        let index = this.nextIndex
        let ret = []
        for (let i = 0; i < this.size; i++) {
            ret.push(this.buffer[index])
            index = (index + 1) % this.size
        }
        return ret
    }

}

export default RingBuffer