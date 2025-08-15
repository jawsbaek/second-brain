import { getKC } from "./providers/KeycloakProvider";
import { ComponentType } from "react";

export function withAuth<T>(Comp: ComponentType<T>) {
  return (props: T) => {
    const kc = getKC();
    if (!kc.authenticated) return <div className="p-6">Auth required…</div>;
    return <Comp {...props} />;
  };
}
