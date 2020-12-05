import { Queue } from '.'

export function breadthFirstSearch (graph, startVertex, callback) {
  const COLOR = {
    WHITE: 0, GREY: 1, BLACK: 2
  }
  const initColor = vertices => {
    const color = new Map()
    vertices.forEach(v => color.set(v, COLOR.WHITE))
    return color
  }
  const vertices = graph.getVertices()
  const adjacencyList = graph.getAdjacencyList()
  const color = initColor(vertices)
  const queue = new Queue()
  const result = [] // 顶点集
  queue.enqueue(startVertex)
  while (!queue.isEmpty()) {
    let u = queue.dequeue()
    adjacencyList.get(u).forEach(n => {
      if (color.get(n) === COLOR.WHITE) {
        color.set(n, COLOR.GREY)
        queue.enqueue(n)
      }
    })
    color.set(u, COLOR.BLACK)
    result.push(u)
    callback && callback(u) // callback?.()
  }
  return result
}
