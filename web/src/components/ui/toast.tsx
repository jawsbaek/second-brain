import * as React from "react";
import { cn } from "@/lib/utils";

type ToastMsg = { id:number; title:string; description?:string };

const ToastContext = React.createContext<{ toast: (msg:Omit<ToastMsg,"id">)=>void }>({ toast: () => {} });

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [items, setItems] = React.useState<ToastMsg[]>([]);
  const toast = (msg:Omit<ToastMsg,"id">) => {
    const id = Date.now();
    setItems((arr)=>[...arr,{ id, ...msg }]);
    setTimeout(()=>setItems((arr)=>arr.filter(i=>i.id!==id)),3000);
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {items.map(i=>(
          <div key={i.id} className={cn("rounded-md bg-gray-800 text-white px-4 py-2 shadow", i.description && "space-y-1") }>
            <div className="font-medium">{i.title}</div>
            {i.description && <div className="text-sm opacity-80">{i.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => React.useContext(ToastContext);
