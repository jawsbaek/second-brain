import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import GraphCanvas from "@/components/GraphCanvas";
import { toElements } from "@/lib/neo4j-mappers";
import { Input, Button } from "@/components/ui";

export default function GraphExplorer() {
  const [elements, setElements] = useState({ nodes:[], edges:[] } as any);
  const [q, setQ] = useState("Technology");

  useEffect(() => { fetch(); }, []);
  const fetch = async () => {
    const { data } = await api.post("/search/vector", { query: "Keycloak OIDC", k: 5 });
    const rows = data.results.map((e: any, i: number) => ({
      n1: { id: `e${i}`, label: e.title },
      n2: { id: `t${i}`, label: "Technology" },
      rel:{ id:`r${i}`, weight: Math.min(1, Math.max(0.1, 1 - e.score)) }
    }));
    setElements(toElements(rows));
  };

  return (
    <div className="h-[calc(100vh-16px)] grid grid-cols-4 gap-4 p-4">
      <div className="col-span-1 space-y-3">
        <div className="text-xl font-semibold">Graph Explorer</div>
        <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="Label/Concept…"/>
        <Button onClick={fetch}>Search</Button>
      </div>
      <div className="col-span-3 rounded-2xl shadow p-2 border">
        <GraphCanvas elements={elements} />
      </div>
    </div>
  );
}
