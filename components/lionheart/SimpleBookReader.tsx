"use client";
import{useEffect,useMemo,useRef,useState}from"react";
import{BrowserNarrator,type NarratorState}from"@/lib/browser-narrator";
import{narrationPassages}from"@/lib/lionheart-listening";
type Book={volume:1|2;title:string;text:string;complete:boolean};
const rates=[0.75,1,1.25,1.5,1.75,2];
export function SimpleBookReader({books}:{books:Book[]}){
 const[available,setAvailable]=useState<boolean|null>(null),[selected,setSelected]=useState<1|2>(1),[state,setState]=useState<NarratorState>("ready"),[speed,setSpeed]=useState(1),[error,setError]=useState(""),[part,setPart]=useState(0),[voices,setVoices]=useState<SpeechSynthesisVoice[]>([]),[voiceURI,setVoiceURI]=useState("");
 const engine=useRef<BrowserNarrator|null>(null),active=useRef<1|2|null>(null);
 const parts=useMemo(()=>books.map(b=>({volume:b.volume,passages:narrationPassages(b.text)})),[books]);
 useEffect(()=>{
  if(!("speechSynthesis"in window)||!("SpeechSynthesisUtterance"in window)){setAvailable(false);return;}setAvailable(true);
  const speech=window.speechSynthesis;
  engine.current=new BrowserNarrator({synthesis:speech,utterance:text=>new SpeechSynthesisUtterance(text)},(s,cursor,problem)=>{setState(s);setPart(cursor.passage);if(problem)setError(problem);});
  const update=()=>setVoices(speech.getVoices().filter(v=>v.lang.toLowerCase().startsWith("en")));
  update();speech.addEventListener("voiceschanged",update);
  const exit=()=>engine.current?.dispose();
  const restore=(event:PageTransitionEvent)=>{if(event.persisted)setState("paused");};
  window.addEventListener("pagehide",exit);window.addEventListener("pageshow",restore);
  return()=>{engine.current?.dispose();engine.current=null;speech.removeEventListener("voiceschanged",update);window.removeEventListener("pagehide",exit);window.removeEventListener("pageshow",restore);};
 },[]);
 useEffect(()=>{
  const voice=voices.find(v=>v.voiceURI===voiceURI)||voices.find(v=>v.default)||voices.find(v=>v.localService)||null;
  engine.current?.configure(speed,voice);
 },[speed,voiceURI,voices]);
 function listen(volume:1|2){
  setError("");setSelected(volume);
  if(active.current!==volume){engine.current?.load(parts.find(p=>p.volume===volume)?.passages||[]);active.current=volume;}
  engine.current?.play();
 }
 const book=books.find(b=>b.volume===selected),total=parts.find(b=>b.volume===selected)?.passages.length||0;
 return <section id="read-aloud" aria-label="Listen to Lionheart" className="my-6 rounded-xl border border-[#cdbd9f] bg-[#fffdf8] p-5 text-[#34271c]">
  <h2 className="font-serif text-2xl font-bold">Listen to your books</h2>
  <p className="my-3 leading-relaxed">Free read-aloud using your phone’s voices. Reads the current studio manuscripts; the PDF downloads remain the dated October 11 editions.</p>
  {available===false?<p role="alert">Read-aloud is unavailable in this browser. Try Safari on your iPhone or Chrome on Android.</p>:<>
   <div className="my-4 flex flex-wrap gap-3">{books.map(b=><button key={b.volume} type="button" onClick={()=>listen(b.volume)} disabled={!available||!b.complete||!b.text.trim()} className="min-h-12 rounded-lg bg-[#674329] px-5 py-3 font-semibold text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{active.current===b.volume&&(state==="paused"||state==="error")?"Resume":"Listen to"} Volume {b.volume===1?"I":"II"}</button>)}
   <button type="button" onClick={()=>engine.current?.pause()} disabled={state!=="playing"} className="min-h-12 rounded-lg border border-[#a99678] px-5 py-3 disabled:opacity-50">Pause</button>
   <button type="button" onClick={()=>{engine.current?.load([]);active.current=null;setPart(0);setError("");}} disabled={!active.current} className="min-h-12 rounded-lg border border-[#a99678] px-5 py-3 disabled:opacity-50">Stop</button></div>
   <div className="my-4 flex flex-wrap gap-4"><label className="flex flex-col gap-2 font-semibold">Speed<select value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="min-h-12 rounded-md border border-[#a99678] bg-white px-3 py-2">{rates.map(r=><option key={r} value={r}>{r}×</option>)}</select></label>
   <label className="flex min-w-0 flex-col gap-2 font-semibold">Voice<select value={voiceURI} onChange={e=>setVoiceURI(e.target.value)} className="min-h-12 max-w-full rounded-md border border-[#a99678] bg-white px-3 py-2"><option value="">Recommended phone voice</option>{voices.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name}{v.localService?" · installed":""}</option>)}</select></label></div>
   {active.current&&<p role="status" aria-live="polite">{state==="playing"?"Reading":state==="paused"?"Paused":state==="finished"?"Finished":state==="error"?"Speech stopped":"Ready"} · Volume {selected===1?"I":"II"} · {book?.title}{state==="playing"||state==="paused"?" · Passage "+(part+1)+" of "+total:""}</p>}
  </>}
  {books.filter(b=>!b.complete).map(b=><p key={b.volume} role="alert">Volume {b.volume===1?"I":"II"} has missing manuscript text. Read-aloud is unavailable until its text is restored.</p>)}
  <p className="mt-4 text-sm leading-relaxed text-[#655443]">Keep this page open while listening. Your phone may pause speech when the screen locks; unlock it and tap Resume. Some voices need an internet connection. Stop or leaving this page ends the session.</p>
  {error&&<p role="alert" className="mt-3 font-semibold text-[#922e20]">{error}</p>}
 </section>;
}
