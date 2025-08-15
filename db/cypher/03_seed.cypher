MERGE (t:Technology {name:"Keycloak"});
MERGE (t2:Technology {name:"PostgreSQL"});
MERGE (c:Concept {name:"OIDC"});
MERGE (req:Requirement {key:"auth.sso", name:"SSO 지원"});
MERGE (t)-[:IMPLEMENTS]->(c);
MERGE (t)-[:ADDRESSES {weight:0.9, timestamp:date()}]->(req);


