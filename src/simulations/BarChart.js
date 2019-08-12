
class BarChart {

    constructor(width, height, barWidth, barOffset, scale, canvas) {
        this.width = width
        this.height = height
        this.barWidth = barWidth
        this.barOffset = barOffset
        this.scale = scale
        this.cx = canvas.getContext('2d')

    }

    draw(x, y, data) {
        
        this.cx.strokeStyle = '#FFAA00'
        this.cx.fillStyle = '#FFFFFF'
        for (let i = 0, count = data.length; i < count; i++) {
            const value = data[i]
            this.cx.beginPath()
            const x0 = x + this.barOffset * (i + 1)
            const y0 = y + this.height / 2
            this.cx.moveTo(x0, y0)
            this.cx.lineTo(x0, y0 - value * this.scale)
            this.cx.lineTo(x0 + this.barWidth, y0 - value * this.scale)
            this.cx.lineTo(x0 + this.barWidth, y0)
            this.cx.fill()
            this.cx.stroke()
        }
        
    }
}

export default BarChart