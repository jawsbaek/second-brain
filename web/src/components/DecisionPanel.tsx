import { Card } from "@/components/ui";

export default function DecisionPanel({ items }:{ items: {technology:string, score:number}[] }) {
  return (
    <div className="space-y-2">
      {items.map((it,i)=>(
        <Card key={i} className="p-4 flex items-center justify-between">
          <div className="font-medium">{it.technology}</div>
          <div className="text-sm opacity-70">score: {it.score.toFixed(3)}</div>
        </Card>
      ))}
    </div>
  );
}
