import test from "node:test";
import assert from "node:assert/strict";
import { BrowserNarrator } from "../lib/browser-narrator.ts";
import { narrationPassages,narrationText } from "../lib/lionheart-listening.ts";
function fixture(){
 const spoken=[],changes=[];let cancels=0;
 const player=new BrowserNarrator({utterance:text=>({text,rate:1}),synthesis:{speak(u){spoken.push(u);},cancel(){cancels++;},resume(){}}},(state,cursor,error)=>changes.push({state,cursor,error}));
 return{player,spoken,changes,get cancels(){return cancels;}};
}
test("long manuscripts preserve every word in order across mobile-sized passages",()=>{
 const source="# The Making of Lionheart\n\n"+("Apartment 4J was never truly quiet. “A little faster?” he asked. At 1.25 times speed, every word matters. ".repeat(3000));
 const parts=narrationPassages(source);assert(parts.length>500);assert(parts.every(p=>p.length<=320));assert.equal(parts.join(" "),narrationText(source));
 assert.deepEqual(narrationPassages("   \n "),[]);assert.throws(()=>narrationPassages("text",0));assert.equal(narrationText("**Hello** [Joel](https://example.com)."),"Hello Joel.");
});
test("pause/resume preserves the unspoken text and automatically continues",()=>{
 const f=fixture();f.player.load(["One two three.","Next passage."]);f.player.play();const first=f.spoken[0];first.onboundary({charIndex:4});f.player.pause();
 assert.equal(f.changes.at(-1).state,"paused");f.player.play();assert.equal(f.spoken.at(-1).text,"two three.");f.spoken.at(-1).onend();assert.equal(f.spoken.at(-1).text,"Next passage.");f.spoken.at(-1).onend();assert.equal(f.changes.at(-1).state,"finished");
});
test("switching books invalidates late callbacks from the previous book",()=>{
 const f=fixture();f.player.load(["Old book."]);f.player.play();const old=f.spoken[0];f.player.load(["New book."]);old.onend();old.onerror({error:"interrupted"});old.onboundary({charIndex:8});
 assert.equal(f.spoken.length,1);assert.equal(f.changes.at(-1).state,"ready");f.player.play();assert.equal(f.spoken.at(-1).text,"New book.");
});
test("changing speed and voice restarts only the remaining text",()=>{
 const f=fixture();f.player.load(["One two three."]);f.player.play();const old=f.spoken[0];old.onboundary({charIndex:4});const voice={name:"Phone",voiceURI:"phone",lang:"en-US"};
 f.player.configure(1.75,voice);const latest=f.spoken.at(-1);assert.equal(latest.text,"two three.");assert.equal(latest.rate,1.75);assert.equal(latest.voice,voice);old.onend();assert.equal(f.spoken.length,2);
});
test("stop and page exit cancel speech; a restored tab can resume",()=>{
 const f=fixture();f.player.load(["Read me."]);f.player.play();const old=f.spoken[0];f.player.dispose();old.onend();assert.equal(f.spoken.length,1);f.player.play();assert.equal(f.spoken.length,2);
 f.player.load([]);f.player.play();assert.equal(f.spoken.length,2);
});
test("speech errors stop and allow an explicit retry; finishing permits replay",()=>{
 const f=fixture();f.player.load(["Try again."]);f.player.play();f.spoken[0].onerror({error:"not-allowed"});assert.equal(f.changes.at(-1).state,"error");f.player.play();f.spoken.at(-1).onend();assert.equal(f.changes.at(-1).state,"finished");f.player.play();assert.equal(f.spoken.at(-1).text,"Try again.");
});
