import { createBrowserRouter } from "react-router-dom";
import GraphExplorer from "@/pages/GraphExplorer";
import EvidenceIngest from "@/pages/EvidenceIngest";
import DecisionWorkspace from "@/pages/DecisionWorkspace";
import Settings from "@/pages/Settings";

export const router = createBrowserRouter([
  { path: "/", element: <GraphExplorer/> },
  { path: "/ingest", element: <EvidenceIngest/> },
  { path: "/decision", element: <DecisionWorkspace/> },
  { path: "/settings", element: <Settings/> },
]);
