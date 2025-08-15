import cytoscape, { ElementsDefinition } from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import dagre from "cytoscape-dagre";
import { useEffect, useRef } from "react";

cytoscape.use(coseBilkent);
cytoscape.use(dagre);

type Props = { elements: ElementsDefinition; layout?: "cose"|"dagre"; onSelect?: (id:string)=>void };

export default function GraphCanvas({ elements, layout="cose", onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const cy = cytoscape({
      container: ref.current,
      elements,
      style: [
        { selector: "node", style: { "label": "data(label)", "background-color": "#8ab4f8", "font-size": 12 } },
        { selector: "edge", style: { "width": "mapData(weight, 0, 1, 1, 6)", "curve-style":"bezier", "target-arrow-shape":"triangle" } },
        { selector: ":selected", style: { "border-color": "#000", "border-width": 2 } },
      ],
      layout: layout === "dagre" ? { name: "dagre", rankDir: "LR" } : { name: "cose-bilkent", randomize: true }
    });
    cy.on("select", "node", (e) => onSelect?.(e.target.id()));
    return () => { cy.destroy(); };
  }, [elements, layout]);
  return <div className="w-full h-full" ref={ref} />;
}
