import { CustomEvent } from '../../customevent'

export class Graph extends CustomEvent {
  constructor () {
    super()
    this._vertices = [] // 图的顶点
    this._adjacencyList = new Map() // 邻接表
  }

  addVertex (v) {
    if (!this._vertices.includes(v)) {
      this._vertices.push(v)
      this._adjacencyList.set(v, [])
      return true
    }
    return false
  }

  addEdge (v1, v2) {
    this._adjacencyList.has(v1) || this.addVertex(v1)
    this._adjacencyList.has(v2) || this.addVertex(v2)
    this._adjacencyList.get(v1).push(v2)
    this._adjacencyList.get(v2).push(v1)
  }

  getVertices () {
    return this._vertices
  }

  getAdjacencyList () {
    return this._adjacencyList
  }

  toString () {
    let s = ''
    this._vertices.forEach((v) => {
      s += `${v} -> `
      this._adjacencyList.get(v).forEach((n) => {
        s += `${n} `
      })
      s += '\n'
    })
    return s
  }
}

// 有向图
export class GraphDirected extends Graph {
  constructor () {
    super()
  }

  addEdge (vFrom, vTo) {
    this._adjacencyList.has(vFrom) || this.addVertex(vFrom)
    this._adjacencyList.has(vTo) || this.addVertex(vTo)
    this._adjacencyList.get(vFrom).push(vTo)
  }
}
