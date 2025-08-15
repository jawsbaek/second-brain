export default function ResultList({ items }:{ items:any[] }) {
  return (
    <ul className="space-y-2">
      {items.map((r,i)=>(
        <li key={i} className="p-3 border rounded-xl">
          <div className="font-medium">{r.title}</div>
          <div className="text-sm opacity-70">{r.source} • score {r.score.toFixed(4)}</div>
          <a className="text-blue-600 underline" href={r.url} target="_blank">Open</a>
        </li>
      ))}
    </ul>
  );
}
