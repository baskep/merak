const _canvas = document.getElementById('canvas')
const _ctx = _canvas.getContext('2d')
let _stars = []
let _dots = []
let _width = 0
let _height = 0
let _mouseMoving = false
let _mouseMoveChecker
let _mouseX
let _mouseY
let _initStarsPopulation = 80
let _dotsMinDist = 2
let _maxDistFromCursor = 50

function getPreviousDot(id, stepback) {
  if (id === 0 || id - stepback < 0) return false
  if (typeof _dots[id - stepback] != 'undefined') return _dots[id - stepback]
  return false
}

function degToRad(deg) {
  return deg * (Math.PI / 180)
}

function setCanvasSize() {
  _width = document.documentElement.clientWidth
  _height = 450
  _canvas.setAttribute('width', _width)
  _canvas.setAttribute('height', _height)
}

class Star {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.r = Math.floor(Math.random() * 2) + 1
    let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2
    this.color = `rgba(255,255,255,${alpha})`
  }
  draw() {
    _ctx.fillStyle = this.color
    _ctx.shadowBlur = this.r * 2
    _ctx.beginPath()
    _ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    _ctx.closePath()
    _ctx.fill()
  }
  move() {
    this.y -= .15
    if (this.y <= -10) this.y = _height + 10
    this.draw()
  }
  die() {
    _stars[this.id] = null
    delete _stars[this.id]
  }
}

class Dot {
  constructor(id, x, y, r) {
    this.id = id
    this.x = x
    this.y = y
    this.r = Math.floor(Math.random() * 5) + 1
    this.maxLinks = 2
    this.speed = .5
    this.a = .5
    this.aReduction = .005
    this.color = `rgba(255,255,255,${ this.a })`
    this.linkColor = `rgba(255,255,255,${ this.a / 4 })`
    this.dir = Math.floor(Math.random() * 140) + 200
  }
  draw() {
    _ctx.fillStyle = this.color
    _ctx.shadowBlur = this.r * 2
    _ctx.beginPath()
    _ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    _ctx.closePath()
    _ctx.fill()
  }
  link() {
    if (this.id === 0) return
    let previousDot1 = getPreviousDot(this.id, 1)
    let previousDot2 = getPreviousDot(this.id, 2)
    let previousDot3 = getPreviousDot(this.id, 3)
    if (!previousDot1) return
    _ctx.strokeStyle = this.linkColor
    _ctx.moveTo(previousDot1.x, previousDot1.y)
    _ctx.beginPath()
    _ctx.lineTo(this.x, this.y)
    if (previousDot2 !== false) _ctx.lineTo(previousDot2.x, previousDot2.y)
    if (previousDot3 !== false) _ctx.lineTo(previousDot3.x, previousDot3.y)
    _ctx.stroke()
    _ctx.closePath()
  }
  move() {
    this.a -= this.aReduction
    if (this.a <= 0) {
      this.die()
      return
    }
    this.color = `rgba(255,255,255,${ this.a })`
    this.linkColor = `rgba(255,255,255,${ this.a / 4 })`
    this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed
    this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed
    this.draw()
    this.link()
  }
  die() {
    _dots[this.id] = null
    delete _dots[this.id]
  }
}

function drawIfMouseMoving() {
  if (!_mouseMoving) return

  if (_dots.length === 0) {
    _dots[0] = new Dot(0, _mouseX, _mouseY)
    _dots[0].draw()
    return
  }

  let previousDot = getPreviousDot(_dots.length, 1)
  let prevX = previousDot.x
  let prevY = previousDot.y

  let diffX = Math.abs(prevX - _mouseX)
  let diffY = Math.abs(prevY - _mouseY)

  if (diffX < _dotsMinDist || diffY < _dotsMinDist) return

  let xVariation = Math.random() > .5 ? -1 : 1
  xVariation = xVariation * Math.floor(Math.random() * _maxDistFromCursor) + 1
  let yVariation = Math.random() > .5 ? -1 : 1
  yVariation = yVariation * Math.floor(Math.random() * _maxDistFromCursor) + 1
  _dots[_dots.length] = new Dot(_dots.length, _mouseX + xVariation, _mouseY + yVariation)
  _dots[_dots.length - 1].draw()
  _dots[_dots.length - 1].link()
}

function animate() {
  _ctx.clearRect(0, 0, _width, _height)

  for (const i in _stars) {
    _stars[i].move()
  }
  for (const i in _dots) {
    _dots[i].move()
  }
  drawIfMouseMoving()
  requestAnimationFrame(animate)
}

function initBg() {
  _ctx.strokeStyle = 'white'
  _ctx.shadowColor = 'white'
  for (let i = 0; i < _initStarsPopulation; i++) {
    _stars[i] = new Star(i, Math.floor(Math.random() * _width), Math.floor(Math.random() * _height))
  }
  _ctx.shadowBlur = 0
  animate()
}

function initEvent() {
  const _headerSearch = document.querySelector('.header-search')
  _headerSearch.onmousemove = (e) => {
    _mouseMoving = true
    _mouseX = e.clientX
    _mouseY = e.clientY
    clearInterval(_mouseMoveChecker)
    _mouseMoveChecker = setTimeout(function () {
      _mouseMoving = false
    }, 100)
  }

  window.onresize = () => {
    setCanvasSize()
  }

}

(() => {
  setCanvasSize()
  initBg()
  initEvent()
})()