import d3 from "d3"
import {helper, getCircleXY, getCirclePoints} from "./helper"
import svgFabric from "./svg"
import { drawPrimitive, Primitives } from './Draw'

///Config///
const a360 = 360;
let config = {
  w:500, h:300, r: 100
}
config.centralPoints = {
  x: config.w/2,
  y: config.h/2,
}
config.centralPoints.xy = [config.centralPoints.x, config.centralPoints.y]

///Setup///
let points = (
  (xyCoords) => {
    let coords = new Array(a360)
    let normalizeAngel = (a) => a > a360 ? (a - Math.floor(a/a360)*a360) : ( a < 1 ? a360 : a )
    return {
      getNextData: () => {
        xyCoords.setNextCoords()
        let angel = normalizeAngel (xyCoords.getAngel())
        coords[angel] = coords[angel] !== undefined ? coords[angel] : xyCoords.getNextCoords()
        return coords.filter(angel => angel !== undefined)
      },
      getLast: () => coords[normalizeAngel(xyCoords.getAngel())],
      setDirection: (d) => xyCoords.setDelta(d)
    }
  }
)(getCirclePoints(config.centralPoints.x, config.centralPoints.y, config.r))

let svg = svgFabric(config.w, config.h)
let circleDotsGroup = svg.append('g') //dots of circle group
let lineGroup = svg.append('g')       //radius line group
drawPrimitive.Points([ config.centralPoints.xy ], svg); //center of circle

var demoPrimitives = new Primitives()
demoPrimitives
  .addConnection(['Points', circleDotsGroup])
  .addConnection(['Line', lineGroup])

///Logic///
let DrawCircleAnimate = (circle, points, config, delay) => {

  return function DrawNextStep (count)  {
    if (count == 0) return;
    let c = points.getNextData()
    setTimeout(() => {
      // <Primitive, params1,...,paramsN, mod? >
      circle.draw (
        [ 'Points', c, (d) => d[0] ],
        [ 'Line', config.centralPoints.xy, points.getLast(), (d) => [d] ]
      )
      DrawNextStep(count-1)
    }, delay)
  }
}

let CircleRadiusControls = (circle, points, config) => {
  let api = {}

  let drawStep = () =>  {
    let c = points.getNextData()
    circle.draw (
      ['Line', config.centralPoints.xy, points.getLast(), (d) => [d] ]
    )
  }

  api.drawStepForward = () => {
    points.setDirection(1)
    drawStep()
  }

  api.drawStepBack = () => {
    points.setDirection(-1)
    drawStep()
  }

  return api
}

export default {
  run: () => {
    DrawCircleAnimate(demoPrimitives, points, config, 1)(a360)
    let apiControls = CircleRadiusControls(demoPrimitives, points, config)

    helper.DOM.attachAction(apiControls.drawStepForward, '.btn')
    helper.DOM.attachAction(apiControls.drawStepBack, '.prevbtn')
  }
}
