const $=s=>document.querySelector(s), game=$("#game"), content=$("#roomContent"), map=$("#map");
$("#enterBtn").onclick=()=>map.classList.remove("hidden");$("#back").onclick=()=>{game.classList.add("hidden");map.classList.remove("hidden")};
document.querySelectorAll("[data-room]").forEach(b=>b.onclick=()=>openRoom(b.dataset.room));
function shell(title,sub,body){return `<div class="room-card"><h2>${title}</h2><p>${sub}</p>${body}</div>`}
function openRoom(r){map.classList.add("hidden");game.classList.remove("hidden");content.innerHTML=rooms[r]();bind(r); if(Math.random()<.28&&r!=="pager"&&r!=="exit")setTimeout(randomPage,1600)}
const rooms={
button:()=>shell("EMERGENCY BUTTON","No therapeutic indication. No educational value. Extremely pressable.",`<button id="red" class="big-red">DO NOT PRESS</button><div id="out" class="screen">SYSTEM IDLE.</div>`),
waste:()=>shell("BIOHAZARD DISPOSAL","A finite post-shift sorting ritual. Sixteen items. No urgency. Unlike clerkship.",`<div class="sort-progress">TODAY'S DEBRIS: <b>16 ITEMS</b><span id="sortCount">ITEM 1 / 16</span></div><div id="sortStage" class="sort-stage"><div class="sort-card"><small>SHIFT DEBRIS · REVIEW REQUIRED</small><p id="sortText">Preparing today's questionable experiences…</p><div class="sort-actions"><button id="disposeBtn">☣ DISPOSE</button><button id="keepBtn">✦ KEEP</button></div></div></div><div id="confirmPositive" class="positive-confirm hidden"><b>⚠ POSITIVE MEMORY DETECTED</b><p>This appears to be non-hazardous material.</p><div><button id="disposeAnyway">dispose anyway</button><button id="keepActually">oh wait no</button></div></div><div id="sortOut" class="screen">Please sort responsibly. This is a finite task.</div><div class="sort-bins"><div class="final-bin waste-final"><h3>☣ CLINICAL NONSENSE <span id="disposedCount">0</span></h3><div id="disposedList"></div></div><div class="final-bin keep-final"><h3>✦ NOT ACTUALLY TRASH <span id="keptCount">0</span></h3><div id="keptList"></div></div></div><div id="receipt" class="receipt hidden"></div>`),
stand:()=>shell("WHERE SHOULD I STAND™","A validated simulation of the clerk's most enduring spatial dilemma. The team may move without warning.",`<div class="scoreline">SPATIAL COMPETENCE TIMER: <span id="standTimer">0</span> sec</div><div id="ward" class="ward"><div class="bed">PATIENT</div><div class="staff a">A</div><div class="staff r">R</div><div class="staff n">N</div><div id="you" class="you">YOU</div><button class="w1 pos" data-p="foot">foot of bed</button><button class="w2 pos" data-p="attending">here?</button><button class="w3 pos" data-p="computer">here?</button><button class="w4 pos" data-p="corner">corner</button><button class="w5 pos" data-p="hall">hallway</button></div><div id="out" class="screen">Choose a position. Confidence is neither required nor recommended.</div>`),
pager:()=>shell("CALL ROOM","This pager is not connected to anything. Your autonomic nervous system has not been informed.",`<div class="pager"><div id="pd" class="pager-display">12:47<br>NO NEW MESSAGES</div><button id="pg">ACKNOWLEDGE</button></div><div id="out" class="screen">QUIET. SUSPICIOUSLY QUIET.</div>`),
spot:()=>shell("SPOT QUESTION ME™","Select an educationally appropriate level of suffering.",`<div class="choices" id="difficulty"><button data-d="0">reasonable</button><button data-d="1">attending</button><button data-d="2">subspecialist who forgot what year you are</button></div><div id="quiz"></div><div id="out" class="screen">AWAITING VOLUNTARY EXPOSURE.</div>`),
note:()=>shell("DOCUMENTATION SERVICES","Patient slept well. No new complaints. Stable. Your task: add words until it sounds medically expensive.",`<div class="note-box" id="noteText">Patient slept well. No new complaints. Stable.</div><div class="words" id="words"></div><button id="submitNote" class="action">SIGN NOTE</button><div id="out" class="screen">CHARACTER COUNT INFLATION: 0%</div>`),
elevator:()=>shell("ELEVATOR","There is an attending inside. The doors are open. This is now a decision.",`<div class="elevator"><div class="elevator-person">ATTENDING<br>🙂</div><div class="elevator-panel">8</div></div><div class="choices"><button id="getIn">get in</button><button id="wait">wait for the next elevator</button></div><div id="out" class="screen">DOORS CLOSING IN: emotionally, immediately.</div>`),
exit:()=>{setTimeout(()=>$("#after").classList.remove("hidden"),200);return shell("EXIT","Badge access accepted.",`<div class="screen">CLOCKING OUT…</div>`)}
};
function bind(r){
 if(r==="button"){let n=0,lines=["One unnecessary presentation detail deleted.","Your attending has temporarily forgotten you exist.","You have been excused to “go check something.”","One awkward hallway interaction administratively voided.","Someone else answered first. You are free.","ROUNDING PRIVILEGES TEMPORARILY SUSPENDED.","You have exceeded the recommended dose.","Nothing happened. Pressing it still felt correct."];$("#red").onclick=()=>{n++;$("#out").textContent="> "+lines[(n-1)%lines.length];if(n===6)$("#red").textContent="SERIOUSLY, STOP";if(n===8){$("#red").style.transform="translateX(70px)";$("#out").textContent="> Button has initiated avoidance behavior."}}}
 if(r==="waste"){
 const nonsense=[
 "got spot-questioned on yesterday's reading","laughed because everyone else laughed","forgot the potassium",
 "held the door for eleven people","didn't hear what the attending said","stood somewhere incorrectly",
 "said 'you too' at the wrong time","forgot why you opened the chart","presented the wrong patient for 4.5 seconds",
 "couldn't find the team after using the bathroom","said “I think” before an answer you absolutely knew",
 "spent three minutes deciding whether you were allowed to sit","carried a clipboard around with no clear purpose",
 "forgot the exact dose immediately after looking it up","entered the workroom and forgot what you needed",
 "got trapped holding the elevator door","nodded thoughtfully at an acronym you planned to google later",
 "answered a question that was directed at someone else","had your stomach growl during a very quiet presentation",
 "couldn't tell whether rounds were over","walked briskly to look like you had somewhere to be",
 "opened the patient's chart and briefly forgot the patient's name","said 'sorry' to an automatic door",
 "was told 'you can go' and still waited three seconds to make sure","realized your pen had been uncapped in your pocket",
 "asked a question that had been answered approximately two seconds earlier","forgot which pocket contains your phone",
 "stood up because everyone else stood up","sat down because everyone else sat down","followed the wrong white coat"
 ];
 const positives=[
 "resident said “good job” ✦","patient thanked you :)","you actually knew the answer ✦",
 "someone remembered your name ✦","you found the team on the first try ✦","your presentation was called “concise” ✦",
 "you got to sit down for seven consecutive minutes ✦","a nurse showed you something cool ✦",
 "you answered before the panic arrived ✦","you made a patient laugh :)"
 ];
 const shuffle=a=>[...a].sort(()=>Math.random()-.5);
 let deck=[...shuffle(nonsense).slice(0,12).map(text=>({text,good:false})),...shuffle(positives).slice(0,4).map(text=>({text,good:true}))];
 deck=shuffle(deck); let i=0,disposed=[],kept=[],questionable=0;
 const reactions=["WASTE ACCEPTED. DIGNITY PARTIALLY RESTORED.","INCIDENT SEALED. WE WILL NEVER SPEAK OF THIS AGAIN.","REMOVED FROM ACTIVE CORTICAL STORAGE.","DISPOSED. OFFICIAL RECORD: WHAT INCIDENT?"];
 function render(){
   if(i>=deck.length){finish();return}
   $("#sortCount").textContent=`ITEM ${i+1} / 16`;$("#sortText").textContent=deck[i].text;
   $("#confirmPositive").classList.add("hidden");$(".sort-card").classList.remove("hidden");
 }
 function addTo(listId,item,label){let d=document.createElement("div");d.className="sorted-slip";d.textContent=item.text;$(listId).appendChild(d);label.textContent=+label.textContent+1}
 function dispose(force=false){
   let item=deck[i];
   if(item.good&&!force){$("#confirmPositive").classList.remove("hidden");$(".sort-card").classList.add("hidden");$("#sortOut").textContent="This appears to be non-hazardous material.";return}
   if(item.good)questionable++;
   disposed.push(item);addTo("#disposedList",item,$("#disposedCount"));$("#sortOut").textContent=item.good?"POSITIVE MATERIAL DISCARDED. DECISION DOCUMENTED.":reactions[Math.floor(Math.random()*reactions.length)];i++;setTimeout(render,260)
 }
 function keep(){
   let item=deck[i];if(!item.good)questionable++;
   kept.push(item);addTo("#keptList",item,$("#keptCount"));$("#sortOut").textContent=item.good?"NON-HAZARDOUS MATERIAL RETAINED. GOOD CALL.":"Unusual choice. We respect patient autonomy.";i++;setTimeout(render,260)
 }
 function finish(){
   $(".sort-card").classList.add("hidden");$("#confirmPositive").classList.add("hidden");$("#sortCount").textContent="SORTING COMPLETE";
   $("#sortOut").textContent="CLUNK. Bin sealed. No further action required.";
   let r=$("#receipt");r.classList.remove("hidden");r.innerHTML=`<b>SHIFT DEBRIS DISPOSAL RECORD</b><hr>ITEMS REVIEWED ........ 16<br>DISPOSED .............. ${String(disposed.length).padStart(2,"0")}<br>KEPT ................... ${String(kept.length).padStart(2,"0")}<br>QUESTIONABLE DECISIONS . ${String(questionable).padStart(2,"0")}<hr>STATUS: SORTED<br><br>No further action required.<br>Please stop thinking about it.<br><br><button id="receiptBack">RETURN TO FACILITY DIRECTORY</button>`;
   $("#receiptBack").onclick=()=>{$("#back").click()}
 }
 $("#disposeBtn").onclick=()=>dispose(false);$("#keepBtn").onclick=keep;
 $("#disposeAnyway").onclick=()=>dispose(true);$("#keepActually").onclick=()=>{kept.push(deck[i]);addTo("#keptList",deck[i],$("#keptCount"));$("#sortOut").textContent="NON-HAZARDOUS MATERIAL RETURNED TO SAFE STORAGE.";i++;setTimeout(render,260)};
 render()
}
if(r==="stand"){let sec=0;let t=setInterval(()=>{if(!document.body.contains($("#ward"))){clearInterval(t);return}sec++;$("#standTimer").textContent=sec;if(sec===8){document.querySelector(".a").style.left="37%";$("#out").textContent="TEAM MOVING. Your safe zone has expired."}if(sec===14){document.querySelector(".r").style.right="40%";$("#out").textContent="The herd is migrating."}},1000);document.querySelectorAll(".pos").forEach(x=>x.onclick=()=>{let p=x.dataset.p,msg={foot:"❌ Too visible. You may be asked something.",attending:"❌ Ambitious positioning. Dangerous.",computer:"❌ You are obstructing a workflow you do not understand.",corner:"❌ Suspicious. You now look lost.",hall:"✓ Excellent situational awareness."}[p];let y=$("#you");y.style.left=x.offsetLeft+"px";y.style.top=x.offsetTop+"px";$("#out").textContent=msg})}
 if(r==="pager"){let n=0;$("#pg").onclick=()=>{n++;let seq=[["*** BEEP ***<br>CALL EXT. 4821","You acknowledged a pager connected to absolutely nothing."],["MESSAGE:<br>pls call when free","You are free. They will now not answer."],["MESSAGE:<br>nvm","The issue resolved itself. A rare and beautiful event."],["NO NEW MESSAGES","QUIET RESTORED. TRUST NOT RESTORED."]];let a=seq[Math.min(n-1,3)];$("#pd").innerHTML=a[0];$("#out").textContent=a[1]}}
 if(r==="spot"){document.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>startQuiz(+b.dataset.d))}
 if(r==="note"){
  const extras=[
    {label:"overnight",slot:"sleep",text:" overnight"},
    {label:"currently",slot:"status",text:" currently"},
    {label:"remains",slot:"status",text:" remains"},
    {label:"otherwise",slot:"complaint",text:" Otherwise,"},
    {label:"acute",slot:"events",text:" acute"},
    {label:"noted",slot:"events",text:" noted"},
    {label:"at this time",slot:"statusEnd",text:" at this time"},
    {label:"denies",slot:"complaintVerb",text:"denies"},
    {label:"clinically",slot:"status",text:" clinically"},
    {label:"without interval change",slot:"statusEnd",text:" without significant interval change"}
  ];
  let chosen=[];
  function renderNote(){
    const has=x=>chosen.includes(x);
    let sentences=[];
    sentences.push(`Patient slept well${has("overnight")?" overnight":""}.`);
    if(has("acute")||has("noted")) sentences.push(`No${has("acute")?" acute":""} events were${has("noted")?" noted":" reported"} overnight.`);
    let complaint=`${has("otherwise")?"Otherwise, ":""}${has("denies")?"patient denies":"Patient reports"} no new complaints.`;
    sentences.push(complaint);
    let status="Patient";
    if(has("currently")) status+=" currently";
    status+=" remains";
    if(has("clinically")) status+=" clinically";
    status+=" stable";
    if(has("without interval change")) status+=" without significant interval change";
    if(has("at this time")) status+=" at this time";
    status+=".";
    sentences.push(status);
    $("#noteText").textContent=sentences.join(" ");
    $("#out").textContent=`CHARACTER COUNT INFLATION: ${chosen.length*17}%`;
  }
  extras.forEach(({label})=>{
    let b=document.createElement("button");b.className="word";b.textContent=label;
    b.onclick=()=>{b.classList.toggle("selected");chosen.includes(label)?chosen.splice(chosen.indexOf(label),1):chosen.push(label);renderNote()};
    $("#words").appendChild(b)
  });
  $("#submitNote").onclick=()=>$("#out").textContent="MAGNIFICENT. Additional words added. New information: negligible. Grammar: defensible.";
}
 if(r==="elevator"){$("#getIn").onclick=()=>{$("#out").textContent="8 seconds of silence… Attending: “So, what rotation are you on?”";setTimeout(()=>$("#out").textContent+="  You have forgotten every rotation.",2200)};$("#wait").onclick=()=>$("#out").textContent="Doors close. Cowardly but defensible decision."}
}
function startQuiz(d){let qs=[
 [{q:"What is the purpose of a differential diagnosis?",a:["To rank plausible causes","To maximize note length","To impress radiology"],c:0},{q:"A patient is hypotensive. Your first priority is:",a:["Assess ABCs and stability","Perfect the assessment wording","Find a chair"],c:0}],
 [{q:"Your answer was correct. What happens next?",a:["You are released","A follow-up question","Applause"],c:1},{q:"You don't know the follow-up. Best response?",a:["Invent confidently","Say what you know and acknowledge uncertainty","Become furniture"],c:1}],
 [{q:"The attending asks for the molecular mechanism of a drug you have never heard of.",a:["Know it somehow","Reason from what you know","Feign pager activity"],c:1},{q:"Correct. Now name the paper that established it in 1987.",a:["Of course","I don't know","Recite Harrison's backwards"],c:1}]
 ];let i=0,set=qs[d],box=$("#quiz");function render(){if(i>=set.length){box.innerHTML="";$("#out").textContent="Excellent. We have successfully located the boundary of your knowledge. Educational objective achieved.";return}let q=set[i];box.innerHTML=`<div class="note-box"><b>${q.q}</b><div class="choices">${q.a.map((x,j)=>`<button data-a="${j}">${x}</button>`).join("")}</div></div>`;box.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{let ok=+b.dataset.a===q.c;$("#out").textContent=ok?"Correct. Unfortunately, success has consequences. Follow-up unlocked.":"Noted. The ceiling did not collapse.";i++;setTimeout(render,650)})}render()}
function randomPage(){let p=$("#pagerFloat");p.hidden=false;$("#pagerMsg").textContent=Math.random()<.5?"CALL EXT. 4821":"pls call when free";$("#ackFloat").onclick=()=>{p.hidden=true}}
$("#return").onclick=()=>{$("#after").classList.add("hidden");game.classList.add("hidden");map.classList.remove("hidden")};