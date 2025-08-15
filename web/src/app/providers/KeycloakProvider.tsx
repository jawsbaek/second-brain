import { PropsWithChildren, useEffect, useState } from "react";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export function getKC() { return keycloak; }

export default function KeycloakProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    keycloak.init({
      onLoad: "login-required",
      pkceMethod: "S256",
      checkLoginIframe: false,
    }).then(() => setReady(true));
  }, []);
  if (!ready) return <div className="p-6">Signing in…</div>;
  return children;
}
