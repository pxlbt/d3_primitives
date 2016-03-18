let Decorators = {
  make: (f, d) => {
    f = Decorators[d](f)
  },
  log: (f) => {
    return (...params) => {
      // console.info(JSON.stringify(params))
      console.info(params)
      var result = f.apply(null, params)
      console.warn(result)
      return result
    }
  }
}


let helper = {
  toRad: (deg) => deg*(Math.PI/180),
  // [ < func, paramsMod?(Array<params>) >, ... ]
  paramsToArray: (params) =>  {
    let isModif;
    return params.map(group => {
      let paramsMod = group.slice(-1)[0]
      isModif = typeof paramsMod === 'function'
      let params = group.slice( 1, group.length + (isModif?-1:0) )
      return [ group[0], isModif ? paramsMod(params):params ]
    })
  }
}

helper.DOM = {}
helper.DOM.attachAction = (f, btnNext) => {
  document.querySelector(btnNext).onclick = () => f()
}

// helper.paramsToArray = Decorators.log(helper.paramsToArray)

let getCircleXY = (R) => {
  let ang;
  let getX = (x0) => x0 + R*Math.cos(helper.toRad(ang))
  let getY = (y0) => y0 + R*Math.sin(helper.toRad(ang))
  let getXY = (x0,y0) => [getX(x0), getY(y0)]

  return {
    setAngle: (a) => ang = a,
    getX: getX,
    getY: getY,
    getXY: getXY
  }
}

let genericCirclePoints = (x0,y0,R) => {
  let coord = getCircleXY(R)
  let angleCount = 0
  let delta = 1
  return {
    setDelta: (d) => {
      delta = d
    },
    setNextCoords: () => {
      angleCount += delta
      coord.setAngle(angleCount)
    },
    getNextCoords: () => {
      return coord.getXY(x0,y0)
    },
    getAngel: () => angleCount
  }
}

export  {helper, getCircleXY, genericCirclePoints}
