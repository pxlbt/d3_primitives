//TODO add style config
//TODO drawPrimitive -> container?

import {helper} from "./helper"

let drawPrimitive = {
  Points: (xy, container) => {
    // console.log(xy)
    container
      .selectAll('circle')
      .data(xy)
      .enter()
      .append('circle')
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1])
      .attr('r',1)
      .attr('fill', 'blue')
  },
  Line: (d, container) => {
    let line = container
      .selectAll('.line')
      .data(d)

      line
      .enter()
      .append('line')
      .classed('line', true)
      .attr('x1', (d) => d[0][0])
      .attr('y1', (d) => d[0][1])
      .style({stroke: 'rgb(255,0,0)', strokeWidth: 2})

      line
      .attr('x2', (d) => d[1][0])
      .attr('y2', (d) => d[1][1])

  },
  Triangle: (d) => {
  }
}


// let drawPrimitives_ = (p) => p.forEach
// let drawPrimitives = (...params) => drawPrimitives_( helper.paramsToArray(params) )

class Primitives {
  constructor() {
    this.connections = []
  }
  //
  addConnection(d) { //<primitive, d3Container>
    this.connections.push(d)
    return this
  }
  getConnection(shape) {
    return this.connections.filter(c => c[0] === shape)[0][1]
  }
  draw (...d) {
    helper.paramsToArray(d)
      .forEach(
        shape =>
          drawPrimitive[shape[0]].apply(null, [ shape[1], this.getConnection(shape[0]) ] )
      )
  }
}

export {drawPrimitive, Primitives}
