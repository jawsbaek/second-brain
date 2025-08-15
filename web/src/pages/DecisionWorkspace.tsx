import { useState } from "react";
import { api } from "@/lib/api";
import DecisionPanel from "@/components/DecisionPanel";
import { Input, Button } from "@/components/ui";

export default function DecisionWorkspace(){
  const [reqKey,setReqKey] = useState("auth.sso");
  const [items,setItems] = useState<{technology:string, score:number}[]>([]);
  const run = async () => {
    const { data } = await api.post("/search/vector", { query: "SSO OIDC Keycloak", k: 5 });
    setItems([{ technology:"Keycloak", score:0.92 }, { technology:"Auth0", score:0.77 }]);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-3">
      <div className="text-xl font-semibold">Decision Workspace</div>
      <div className="flex gap-2">
        <Input value={reqKey} onChange={e=>setReqKey(e.target.value)} />
        <Button onClick={run}>Evaluate</Button>
      </div>
      <DecisionPanel items={items}/>
    </div>
  );
}
