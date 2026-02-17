import type { Representative } from '../types';

export function searchByName(
  representatives: Representative[],
  query: string
): Representative[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];
  return representatives.filter(
    (r) =>
      r.name.toLowerCase().includes(lower) ||
      r.constituency.toLowerCase().includes(lower)
  );
}

export function filterByField(
  representatives: Representative[],
  field: keyof Representative,
  value: string
): Representative[] {
  return representatives.filter((r) => r[field] === value);
}

export function getUniqueValues(
  representatives: Representative[],
  field: keyof Representative
): string[] {
  const values = new Set<string>();
  for (const r of representatives) {
    const v = r[field];
    if (typeof v === 'string') values.add(v);
  }
  return Array.from(values).sort();
}

export function findByConstituency(
  representatives: Representative[],
  constituency: string
): Representative | undefined {
  const lower = constituency.toLowerCase().trim();
  return representatives.find(
    (r) => r.constituency.toLowerCase() === lower
  );
}
