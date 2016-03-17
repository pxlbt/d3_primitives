import d3 from "d3"
import {helper, getCircleXY, getCirclePoints} from "./helper"
import { Primitives } from './Draw'

const a360 = 360;
let config = {w:500, h:300, r: 100}

let points = (
  (xyCoords) => {
    let coords = []
    return {
      getNextData: () => { coords.push(xyCoords.getNextCoords()); return coords },
      getLast: () => coords[coords.length - 1],
      setDirection: (d) => xyCoords.setDelta(d)
    }
  }
)(getCirclePoints(config.w/2, config.h/2, config.r))

let svg =
  d3
  .select('body')
  .append('svg')
  .attr('width',config.w)
  .attr('height',config.h)

let centralDot = svg.append('circle').attr('cx',config.w/2).attr('cy',config.h/2).attr('r',3).attr('fill', 'red')
let circleDotsGroup = svg.append('g')
let lineGroup = svg.append('g')

var demoPrimitives = new Primitives()
demoPrimitives
  .addConnection(['Points', circleDotsGroup])
  .addConnection(['Line', lineGroup])

let drawCircleTimeout = (count, delay) => {
  if (count == 0) return;
  let c = points.getNextData()
  setTimeout(() => {
    // <Primitive, params1,...,paramsN, mod? >
    demoPrimitives.draw (
      [ 'Points', c, (d) => d[0] ],
      [ 'Line', [config.w/2, config.h/2], points.getLast(), (d) => [d] ]
    )
    drawCircleTimeout(count-1)
  }, delay)
}

let drawStepForwardCircle = ((count) => {
  return () => {
    points.setDirection(1)
    if (count == 0) return;
    count--
    let c = points.getNextData()
    demoPrimitives.draw (
      ['Points', c, (d) => d[0]],
      ['Line', [config.w/2, config.h/2], points.getLast(), (d) => [d] ]
    )
  }
})(a360)

let drawStepBackCircle = ((count) => {

  return () => {
    points.setDirection(-1)
    if (count == 0) return;
    count--
    let c = points.getNextData()
    demoPrimitives.draw (
      ['Points', c, (d) => d[0]],
      ['Line', [config.w/2, config.h/2], points.getLast(), (d) => [d]  ]
    )
  }
})(a360)


helper.stepByStep(drawStepForwardCircle, '.btn')
helper.stepByStep(drawStepBackCircle, '.prevbtn')


drawCircleTimeout(a360, 1)
