// Unscoped chapter numbers cannot identify a chapter across two volumes.
export function mentionsChapter(reference: string | undefined, volume: number, chapter: number) {
  if (!reference) return false;
  const value = reference.toLowerCase().replace(/[–—]/g, "-");
  const sections = [...value.matchAll(/(?:volume|vol\.?|v)\s*(one|two|ii|i|1|2)\b([\s\S]*?)(?=(?:volume|vol\.?|v)\s*(?:one|two|ii|i|1|2)\b|$)/g)];
  return sections.some(section => {
    const number = ["one", "i"].includes(section[1]) ? 1 : ["two", "ii"].includes(section[1]) ? 2 : Number(section[1]);
    if (number !== volume) return false;
    const chapters = section[2].match(/chapters?\s*([0-9\s,\-&and]+)/)?.[1];
    if (!chapters) return false;
    const ranges = [...chapters.matchAll(/(\d+)\s*-\s*(\d+)/g)];
    if (ranges.some(range => chapter >= Number(range[1]) && chapter <= Number(range[2]))) return true;
    const singles = chapters.replace(/\d+\s*-\s*\d+/g, "").match(/\d+/g) || [];
    return singles.some(value => Number(value) === chapter);
  });
}
