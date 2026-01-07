'use client';

import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

// import { InstitutionNode } from "./organizationTree.types"
import { convertTreeToFlow } from './organizationTreeToFlow';
import { OrganizationTreeNode } from './OrganizationTreeNode';
import { InstitutionNode } from './hierarchy.types';
// import { OrgTreeNode } from "./OrgTreeNode"

const nodeTypes = {
  orgNode: OrganizationTreeNode,
};

export function OrganizationTreeCanvas({ data }: { data: InstitutionNode }) {
  const { nodes, edges } = convertTreeToFlow(data);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      ></ReactFlow>
    </div>
  );
}
