import dagre from "dagre"
import { Node, Edge } from "reactflow"
import { InstitutionNode } from "./hierarchy.types"
// import { InstitutionNode } from "./organizationTree.types"

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 280
const nodeHeight = 150 // Increased to accommodate user list

export function convertTreeToFlow(root: InstitutionNode) {
  const nodes: Node[] = []
  const edges: Edge[] = []

  dagreGraph.setGraph({
    rankdir: "TB", // TOP → BOTTOM (org chart)
    nodesep: 80,
    ranksep: 100,
  })

  function walk(node: any, parentId?: string) {
    nodes.push({
      id: node.id,
      type: "orgNode",
      data: node,
      position: { x: 0, y: 0 }, // dagre will override
    })

    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    })

    if (parentId) {
      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        type: "smoothstep",
      })

      dagreGraph.setEdge(parentId, node.id)
    }

    node.children?.forEach((child: any) =>
      walk(child, node.id)
    )
  }

  walk(root)
  dagre.layout(dagreGraph)

  nodes.forEach((node) => {
    const pos = dagreGraph.node(node.id)
    node.position = {
      x: pos.x - nodeWidth / 2,
      y: pos.y - nodeHeight / 2,
    }
  })

  return { nodes, edges }
}
