const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset")
const eraserBtn = document.getElementById("eraser")
const pencilBtn = document.getElementById('pencil')
const currentSizeEl = document.getElementById("currentSize")
const colorEl = document.getElementById("color")

var size = 10;
var isPressed = false;
var color = "black"
var x = undefined;
var y = undefined;
var mode = "draw"

canvas.addEventListener("mousedown", (e) => {
    isPressed = true
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false
    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const mousePositionX = e.offsetX;
        const mousePositionY = e.offsetY;
        drawCircle(mousePositionX, mousePositionY)
        drawLine(x, y, mousePositionX, mousePositionY)
        x = mousePositionX;
        y = mousePositionY;
    }
})

increaseBtn.addEventListener('click', (e) => {
    size -= 5;
    if (size < 5) {
        size = 5;
    }
    updateCurrentSize(size)
})

decreaseBtn.addEventListener('click', (e) => {
    size += 5;
    if (size > 50) {
        size = 50;
    }
    updateCurrentSize(size)
})

colorEl.addEventListener('change', (e) => {
    if (mode === "eraser") {
        mode = "draw"
        updateMode()
    }
    color = e.target.value
})

resetBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

pencilBtn.addEventListener('click', () => {
    mode = 'draw'
    updateMode()
})

eraserBtn.addEventListener('click', () => {
    mode = "eraser"
    updateMode()
})

function updateMode() {
    if (mode === "draw") {
        canvas.style.cursor = "url('assets/pencil.png'), auto";
        color = colorEl.value
    } else if (mode === "eraser") {
        canvas.style.cursor = "url('assets/eraser.png'), auto"
        color = "white"
    }
}

function updateCurrentSize(size) {
    currentSizeEl.innerText = size;
}
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke()
}
