import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {createHmac,randomBytes} from "node:crypto";
import {writeFile,mkdtemp,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import path from "node:path";
const folder=await mkdtemp(path.join(tmpdir(),"lionheart-http-")),fixture=path.join(folder,"fetch-fixture.mjs");
await writeFile(fixture,[
'const original=globalThis.fetch;',
'globalThis.fetch=async(input,init)=>{const url=typeof input==="string"?input:input instanceof URL?input.href:input.url;',
'if(url.startsWith("https://api.airtable.com/")){let records=[];',
'if(url.includes("tblmZH0nSF2Vb3d6O"))records=[1,2].map(v=>({id:"chapter-"+v,fields:{"Chapter Title":"A fixture chapter",Volume:v,Chapter:1,"Draft Text":"fixture-volume-"+v+"-private-narrative.","Editorial Notes":"not-for-narration"}}));',
'if(url.includes("tbluo0P6klxKBta6p"))records=[1,2].flatMap(v=>["Prologue","Epilogue"].map(t=>({id:t+v,fields:{Section:t+" fixture",Type:t,Volume:v,"Draft Text":t+" narrative for volume "+v}})));',
'return Response.json({records});}return original(input,init);};'
].join("\n"));
const secret=randomBytes(32).toString("hex"),port=3092,origin="http://127.0.0.1:"+port;
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p",String(port)],{env:{...process.env,NODE_OPTIONS:"--import="+fixture,LIONHEART_ACCESS_KEY:"fixture-access",LIONHEART_SESSION_SECRET:secret,LIONHEART_AIRTABLE_TOKEN:"fixture-token"},stdio:["ignore","pipe","pipe"]});
let output="";child.stdout.on("data",x=>output+=x);child.stderr.on("data",x=>output+=x);
try{
 let ready=false;for(let i=0;i<60;i++){if(child.exitCode!==null)throw Error("Fixture server exited: "+output);try{const r=await fetch(origin+"/api/version");if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,500));}
 assert(ready,"Server did not start");
 const anonymous=await fetch(origin+"/lionheart"),locked=await anonymous.text();
 assert.equal(anonymous.status,200);assert(!locked.includes("fixture-volume-1-private-narrative"));assert(!locked.includes("Listen to your books"));
 const expires=String(Date.now()+3600000),signature=createHmac("sha256",secret).update(expires).digest("hex");
 const response=await fetch(origin+"/lionheart",{headers:{Cookie:"lionheart_session="+expires+"."+signature}});
 const html=await response.text();assert.equal(response.status,200);assert.match(response.headers.get("cache-control"),/private/);assert.match(response.headers.get("cache-control"),/no-store/);
 for(const text of ["Listen to your books","fixture-volume-1-private-narrative","fixture-volume-2-private-narrative","/lionheart/books/one","/lionheart/books/two"])assert(html.includes(text),"Missing "+text);
 assert(!html.includes("not-for-narration"));
 const tampered=await(await fetch(origin+"/lionheart",{headers:{Cookie:"lionheart_session="+expires+".invalid"}})).text();assert(!tampered.includes("fixture-volume-1-private-narrative"));
 console.log("HTTP flow passed: anonymous and tampered sessions hide narrative; authorized page includes both book texts, original PDF downloads and reader; response is private/no-store.");
}finally{child.kill("SIGTERM");await new Promise(resolve=>{if(child.exitCode!==null)resolve();else child.once("exit",resolve);});await rm(folder,{recursive:true,force:true});}
