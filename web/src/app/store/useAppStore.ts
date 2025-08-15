import { create } from "zustand";
type State = {
  layout: "cose"|"dagre"; setLayout: (l:State["layout"])=>void;
};
export const useAppStore = create<State>((set)=>({
  layout: "cose", setLayout:(layout)=>set({layout})
}));
