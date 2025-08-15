import { useState } from "react";
import { api } from "@/lib/api";
import type { Evidence } from "@/lib/types";
import { Input, Textarea, Button, Card } from "@/components/ui";

const init: Evidence = {
  url:"", title:"", source:"Other", published_at:new Date().toISOString(), text:"", visibility:"team"
};

export default function EvidenceForm() {
  const [form, setForm] = useState<Evidence>(init);
  const submit = async () => {
    await api.post("/evidences", form);
    alert("Stored & embedded!");
    setForm(init);
  };
  return (
    <Card className="p-4 space-y-3">
      <Input placeholder="URL" value={form.url} onChange={e=>setForm({...form,url:e.target.value})}/>
      <Input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      <Input placeholder="Source" value={form.source} onChange={e=>setForm({...form,source:e.target.value})}/>
      <Input type="datetime-local" onChange={e=>setForm({...form,published_at:new Date(e.target.value).toISOString()})}/>
      <Textarea rows={6} placeholder="Text (content snippet)" value={form.text} onChange={e=>setForm({...form,text:e.target.value})}/>
      <Button onClick={submit}>Save Evidence</Button>
    </Card>
  );
}
