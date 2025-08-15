export type Evidence = {
  id?: number; url: string; title: string; source: string;
  published_at: string; text: string; visibility: "public"|"team"|"confidential";
};

export type VectorResult = { url: string; title: string; source: string; score: number };
