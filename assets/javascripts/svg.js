let svg = (w,h, appendTo = 'body') => {
  return d3
  .select(appendTo)
  .append('svg')
  .attr('width', w)
  .attr('height', h)
}

export default svg
