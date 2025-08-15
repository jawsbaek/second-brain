CREATE CONSTRAINT evidence_url_unique IF NOT EXISTS
FOR (e:Evidence) REQUIRE e.url IS UNIQUE;

CREATE CONSTRAINT technology_name_unique IF NOT EXISTS
FOR (t:Technology) REQUIRE t.name IS UNIQUE;

CREATE CONSTRAINT decision_id_unique IF NOT EXISTS
FOR (d:Decision) REQUIRE d.id IS UNIQUE;


