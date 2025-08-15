import { useState } from "react";
import { api } from "@/lib/api";
import { Input, Button } from "@/components/ui";
import ResultList from "./ResultList";

export default function VectorSearchBox(){
  const [q,setQ] = useState("");
  const [res,setRes] = useState<any[]>([]);
  const go = async () => {
    const { data } = await api.post("/search/vector", { query:q, k:8 });
    setRes(data.results);
  };
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input placeholder="Search evidence…" value={q} onChange={e=>setQ(e.target.value)}/>
        <Button onClick={go}>Search</Button>
      </div>
      <ResultList items={res}/>
    </div>
  );
}
