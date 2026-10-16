export function narrationText(value:string):string{
 return value.replace(/\r\n/g,"\n").replace(/!\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1")
 .replace(/^\s{0,3}#{1,6}\s+/gm,"").replace(/^\s*(?:[-*+] |\d+\. )/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/__([^_]+)__/g,"$1")
 .replace(/\*([^*\n]+)\*/g,"$1").replace(/^\s*(?:---+|\*\*\*+)\s*$/gm,"").replace(/\s+/g," ").trim();
}
export function narrationPassages(value:string,limit=320):string[]{
 if(!Number.isInteger(limit)||limit<40)throw Error("Invalid passage limit");
 let text=narrationText(value);const parts:string[]=[];
 while(text.length>limit){
  const head=text.slice(0,limit+1),stop=[...head.matchAll(/[.!?][”’"')]*(?=\s)/g)].filter(m=>m.index!>=limit/2).pop();
  let end=stop?stop.index!+stop[0].length:head.lastIndexOf(" ");if(end<=0)end=limit;
  parts.push(text.slice(0,end).trim());text=text.slice(end).trimStart();
 }
 if(text)parts.push(text);return parts;
}
