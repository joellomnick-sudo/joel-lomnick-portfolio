export type NarratorState="ready"|"playing"|"paused"|"finished"|"error";
export type NarratorCursor={passage:number;offset:number};
export type NarratorHost={synthesis:Pick<SpeechSynthesis,"speak"|"cancel"|"resume">;utterance:(text:string)=>SpeechSynthesisUtterance};
export class BrowserNarrator{
 private generation=0;private passages:string[]=[];private current:SpeechSynthesisUtterance|null=null;
 private rate=1;private voice:SpeechSynthesisVoice|null=null;private cursor:NarratorCursor={passage:0,offset:0};private state:NarratorState="ready";
 private host:NarratorHost;private change:(state:NarratorState,cursor:NarratorCursor,error?:string)=>void;
 constructor(host:NarratorHost,change:(state:NarratorState,cursor:NarratorCursor,error?:string)=>void){this.host=host;this.change=change;}
 private emit(error?:string){this.change(this.state,{...this.cursor},error);}
 private cancel(){this.generation++;this.current=null;this.host.synthesis.cancel();}
 load(passages:string[],cursor:NarratorCursor={passage:0,offset:0}){
  this.cancel();this.passages=[...passages];const passage=Math.max(0,Math.min(passages.length-1,Number.isFinite(cursor.passage)?Math.floor(cursor.passage):0));
  this.cursor={passage,offset:Math.max(0,Math.min(passages[passage]?.length||0,Number.isFinite(cursor.offset)?Math.floor(cursor.offset):0))};this.state="ready";this.emit();
 }
 configure(rate:number,voice:SpeechSynthesisVoice|null){const playing=this.state==="playing";this.rate=Math.max(.5,Math.min(2,rate));this.voice=voice;if(playing){this.cancel();this.speak();}}
 play(){if(!this.passages.length)return;if(this.state==="finished")this.cursor={passage:0,offset:0};if(this.state==="playing")return;this.cancel();this.speak();}
 pause(){if(this.state!=="playing")return;this.cancel();this.state="paused";this.emit();}
 seek(passage:number){const playing=this.state==="playing";this.cancel();this.cursor={passage:Math.max(0,Math.min(this.passages.length-1,Math.floor(passage))),offset:0};this.state="paused";this.emit();if(playing)this.speak();}
 dispose(){this.cancel();this.state="paused";}
 private speak(){
  if(this.cursor.passage<this.passages.length&&this.cursor.offset>=this.passages[this.cursor.passage].length){this.cursor.passage++;this.cursor.offset=0;}
  if(this.cursor.passage>=this.passages.length){this.cursor={passage:Math.max(0,this.passages.length-1),offset:0};this.state="finished";this.emit();return;}
  const token=this.generation,start=this.cursor.offset,u=this.host.utterance(this.passages[this.cursor.passage].slice(start));
  this.current=u;u.rate=this.rate;if(this.voice){u.voice=this.voice;u.lang=this.voice.lang;}else u.lang="en-US";
  const valid=()=>token===this.generation&&this.current===u;
  u.onboundary=e=>{if(!valid())return;this.cursor.offset=start+e.charIndex;this.emit();};
  u.onend=()=>{if(!valid())return;this.current=null;this.cursor.passage++;this.cursor.offset=0;this.speak();};
  u.onerror=e=>{if(!valid())return;this.current=null;this.state="error";this.emit(e.error==="not-allowed"?"Your phone paused speech. Tap Resume to continue.":"Speech stopped. Choose another voice and tap Resume.");};
  this.state="playing";this.emit();
  try{this.host.synthesis.resume();this.host.synthesis.speak(u);}catch{if(valid()){this.current=null;this.state="error";this.emit("This voice could not start. Choose another voice and tap Resume.");}}
 }
}
