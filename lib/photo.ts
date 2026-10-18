export function photo(id: string, width = 2000, height?: number) {
  const crop = height ? `&h=${height}` : "";
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}${crop}&q=80`;
}
