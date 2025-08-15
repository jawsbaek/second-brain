import type { ElementsDefinition } from "cytoscape";

export function toElements(rows: any[]): ElementsDefinition {
  const nodes = new Map<string, any>();
  const edges: any[] = [];
  rows.forEach(r => {
    const n1 = r.n1, n2 = r.n2, rel = r.rel;
    if (n1 && !nodes.has(n1.id)) nodes.set(n1.id, { data:{ id:String(n1.id), label:n1.label || n1.name }});
    if (n2 && !nodes.has(n2.id)) nodes.set(n2.id, { data:{ id:String(n2.id), label:n2.label || n2.name }});
    if (rel) edges.push({ data: { id: String(rel.id), source:String(n1.id), target:String(n2.id), weight: rel.weight ?? 0.5 }});
  });
  return { nodes: Array.from(nodes.values()), edges };
}
