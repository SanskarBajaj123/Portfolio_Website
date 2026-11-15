(function(){
'use strict';
var HASH_KEY='sb_adm_hash', DATA_KEY='sb_adm_data';

function getAdmData(){try{return JSON.parse(localStorage.getItem(DATA_KEY)||'null');}catch(e){return null;}}
function saveAdmData(d){localStorage.setItem(DATA_KEY,JSON.stringify(d));}

async function hashPwd(p){
  var buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(p));
  return Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
}

function el(tag,css){var e=document.createElement(tag);if(css)e.style.cssText=css;return e;}

function inp(val,placeholder,multiline){
  var s='width:100%;padding:9px 11px;background:#141414;border:1px solid #2a2a2c;border-radius:7px;color:#f2f2f2;font-size:13px;box-sizing:border-box;outline:none;font-family:inherit;';
  if(multiline){
    var a=document.createElement('textarea');
    a.style.cssText=s+'resize:vertical;min-height:70px;';
    a.placeholder=placeholder||''; a.value=val||''; return a;
  }
  var i=document.createElement('input');
  i.style.cssText=s; i.type='text';
  i.placeholder=placeholder||''; i.value=val||''; return i;
}

function lbl(text){
  var l=el('div','color:#8a8a8d;font-size:11px;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px;');
  l.textContent=text; return l;
}

function fldWrap(labelText,inputEl){
  var w=el('div','margin-bottom:14px;');
  w.appendChild(lbl(labelText)); w.appendChild(inputEl); return w;
}

function mkBtn(text,style,onClick){
  var b=el('button',style);
  b.textContent=text;
  b.addEventListener('click',onClick);
  return b;
}

function waitForData(cb){
  if(window.__SB_EXP)cb();
  else setTimeout(function(){waitForData(cb);},150);
}

var triggered=false;

document.addEventListener('keydown',function(e){
  if(e.ctrlKey&&e.shiftKey&&(e.key==='A'||e.key==='a')){
    e.preventDefault();
    if(!triggered){triggered=true;waitForData(showLogin);}
  }
});

if(location.search.includes('admin')){
  document.addEventListener('DOMContentLoaded',function(){
    setTimeout(function(){if(!triggered){triggered=true;waitForData(showLogin);}},500);
  });
}

function showLogin(){
  var backdrop=el('div','position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:100000;display:flex;align-items:center;justify-content:center;');
  var card=el('div','background:#1e1e20;border:1px solid #2a2a2c;border-radius:16px;padding:32px;width:340px;font-family:Inter,system-ui,sans-serif;');
  var isFirst=!localStorage.getItem(HASH_KEY);

  var header=el('div','display:flex;align-items:center;gap:12px;margin-bottom:24px;');
  var logo=el('div','width:40px;height:40px;background:#ff6d5a;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;color:#1a0a08;font-size:16px;');
  logo.textContent='SB';
  var hdinfo=el('div','');
  var hdtitle=el('div','color:#f2f2f2;font-weight:600;font-size:15px;'); hdtitle.textContent='Admin Panel';
  var hdsub=el('div','color:#8a8a8d;font-size:12px;'); hdsub.textContent=isFirst?'Set a password to begin':'Enter your password';
  hdinfo.appendChild(hdtitle); hdinfo.appendChild(hdsub);
  header.appendChild(logo); header.appendChild(hdinfo);
  card.appendChild(header);

  var pwdInp=inp('','Password');
  pwdInp.type='password';
  card.appendChild(fldWrap('Password',pwdInp));

  var errMsg=el('div','color:#ff6060;font-size:12px;margin-bottom:8px;display:none;');
  errMsg.textContent='Incorrect password';
  card.appendChild(errMsg);

  var loginBtn=mkBtn(isFirst?'Set Password':'Login','width:100%;padding:11px;background:#ff6d5a;border:none;border-radius:8px;color:#1a0a08;font-weight:700;font-size:14px;cursor:pointer;margin-bottom:8px;',doLogin);
  card.appendChild(loginBtn);
  card.appendChild(mkBtn('Cancel','width:100%;padding:9px;background:transparent;border:1px solid #2a2a2c;border-radius:8px;color:#8a8a8d;font-size:13px;cursor:pointer;',function(){backdrop.remove();triggered=false;}));

  backdrop.appendChild(card);
  document.body.appendChild(backdrop);
  setTimeout(function(){pwdInp.focus();},100);
  pwdInp.addEventListener('keydown',function(e){if(e.key==='Enter')doLogin();});
  backdrop.addEventListener('click',function(e){if(e.target===backdrop){backdrop.remove();triggered=false;}});

  async function doLogin(){
    var pwd=pwdInp.value;
    if(!pwd)return;
    var hash=await hashPwd(pwd);
    var stored=localStorage.getItem(HASH_KEY);
    if(!stored){localStorage.setItem(HASH_KEY,hash);backdrop.remove();showPanel();}
    else if(hash===stored){backdrop.remove();showPanel();}
    else{errMsg.style.display='block';}
  }
}

function showPanel(){
  var adm=getAdmData()||{};
  var expData=JSON.parse(JSON.stringify(window.__SB_EXP||[]));
  var projData=JSON.parse(JSON.stringify(window.__SB_PROJ||[]));
  var siteData=JSON.parse(JSON.stringify(window.__SB_SITE_INFO||{}));
  var achieveData=JSON.parse(JSON.stringify(window.__SB_ACHIEVEMENTS||[]));
  if(adm.experience&&adm.experience.length)expData=JSON.parse(JSON.stringify(adm.experience));
  if(adm.projects&&adm.projects.length)projData=JSON.parse(JSON.stringify(adm.projects));
  if(adm.siteInfo)Object.assign(siteData,adm.siteInfo);
  if(adm.achievements&&adm.achievements.length)achieveData=JSON.parse(JSON.stringify(adm.achievements));

  var panel=el('div','position:fixed;top:0;right:0;width:420px;height:100vh;background:#1a1a1c;border-left:1px solid #2a2a2c;z-index:100000;display:flex;flex-direction:column;font-family:Inter,system-ui,sans-serif;box-shadow:-4px 0 24px rgba(0,0,0,.5);');

  var hdr=el('div','padding:16px 20px;border-bottom:1px solid #2a2a2c;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;');
  var hdrLeft=el('div','display:flex;align-items:center;gap:10px;');
  var hdrLogo=el('div','width:32px;height:32px;background:#ff6d5a;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;color:#1a0a08;font-size:13px;');
  hdrLogo.textContent='SB';
  var hdrTitle=el('div','color:#f2f2f2;font-weight:600;font-size:14px;'); hdrTitle.textContent='Admin Panel';
  hdrLeft.appendChild(hdrLogo); hdrLeft.appendChild(hdrTitle);
  hdr.appendChild(hdrLeft);
  var btnRow=el('div','display:flex;gap:6px;');
  btnRow.appendChild(mkBtn('Save & Reload','padding:6px 14px;background:#ff6d5a;border:none;border-radius:6px;color:#1a0a08;font-weight:600;font-size:13px;cursor:pointer;',doSave));
  btnRow.appendChild(mkBtn('\xd7','padding:4px 10px;background:#232325;border:none;border-radius:6px;color:#8a8a8d;font-size:18px;cursor:pointer;',function(){panel.remove();triggered=false;}));
  hdr.appendChild(btnRow);
  panel.appendChild(hdr);

  var tabs=el('div','display:flex;border-bottom:1px solid #2a2a2c;padding:0 10px;flex-shrink:0;overflow-x:auto;');
  var activeTab='exp';

  function makeTab(label,active){
    var t=el('button','padding:10px 12px;background:none;border:none;border-bottom:2px solid '+(active?'#ff6d5a':'transparent')+';color:'+(active?'#ff6d5a':'#8a8a8d')+';font-size:12px;cursor:pointer;margin-bottom:-1px;font-family:inherit;white-space:nowrap;flex-shrink:0;');
    t.textContent=label; return t;
  }

  var tabExp=makeTab('Experience',true);
  var tabProj=makeTab('Projects',false);
  var tabAchieve=makeTab('Achievements',false);
  var tabSite=makeTab('Site Info',false);
  var allTabs=[tabExp,tabProj,tabAchieve,tabSite];

  function setActive(active){
    allTabs.forEach(function(t){t.style.color='#8a8a8d';t.style.borderBottom='2px solid transparent';});
    active.style.color='#ff6d5a';active.style.borderBottom='2px solid #ff6d5a';
  }

  tabExp.addEventListener('click',function(){activeTab='exp';setActive(tabExp);renderTab();});
  tabProj.addEventListener('click',function(){activeTab='proj';setActive(tabProj);renderTab();});
  tabAchieve.addEventListener('click',function(){activeTab='achieve';setActive(tabAchieve);renderTab();});
  tabSite.addEventListener('click',function(){activeTab='site';setActive(tabSite);renderTab();});
  allTabs.forEach(function(t){tabs.appendChild(t);});
  panel.appendChild(tabs);

  var content=el('div','flex:1;overflow-y:auto;padding:16px 20px;');
  panel.appendChild(content);

  var footer=el('div','padding:12px 20px;border-top:1px solid #2a2a2c;flex-shrink:0;');
  footer.appendChild(mkBtn('Reset Password','padding:6px 12px;background:transparent;border:1px solid #2a2a2c;border-radius:6px;color:#8a8a8d;font-size:12px;cursor:pointer;',function(){
    if(confirm('Reset admin password? You will need to set a new one next time.')){
      localStorage.removeItem(HASH_KEY);
      panel.remove(); triggered=false;
      alert('Password reset. Use Ctrl+Shift+A or ?admin to set a new one.');
    }
  }));
  panel.appendChild(footer);
  document.body.appendChild(panel);
  renderTab();

  function renderTab(){
    content.innerHTML='';
    if(activeTab==='exp')renderExpTab();
    else if(activeTab==='proj')renderProjTab();
    else if(activeTab==='achieve')renderAchieveTab();
    else renderSiteTab();
  }

  // ── Experience tab ──
  function renderExpTab(){
    expData.forEach(function(exp,i){
      var item=el('div','background:#1e1e20;border:1px solid #2a2a2c;border-radius:10px;padding:14px;margin-bottom:10px;');
      var row=el('div','display:flex;justify-content:space-between;align-items:flex-start;');
      var info=el('div','flex:1;min-width:0;');
      var title=el('div','color:#f2f2f2;font-weight:600;font-size:13px;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;');
      title.textContent=(exp.role||'')+' @ '+(exp.company||'');
      var sub=el('div','color:#8a8a8d;font-size:11px;');
      sub.textContent=(exp.period||'')+' · '+(exp.bullets?exp.bullets.length:0)+' bullets';
      info.appendChild(title); info.appendChild(sub);
      var btns=el('div','display:flex;gap:6px;flex-shrink:0;margin-left:8px;');
      btns.appendChild(mkBtn('Edit','padding:3px 9px;background:#232325;border:1px solid #2a2a2c;border-radius:5px;color:#f2f2f2;font-size:11px;cursor:pointer;',function(){editExp(i);}));
      btns.appendChild(mkBtn('Del','padding:3px 9px;background:#232325;border:1px solid #3a1a1a;border-radius:5px;color:#ff6060;font-size:11px;cursor:pointer;',function(){if(confirm('Delete this experience?')){expData.splice(i,1);renderTab();}}));
      row.appendChild(info); row.appendChild(btns);
      item.appendChild(row); content.appendChild(item);
    });
    content.appendChild(mkBtn('+ Add Experience','width:100%;padding:11px;background:none;border:2px dashed #2a2a2c;border-radius:10px;color:#8a8a8d;font-size:13px;cursor:pointer;font-family:inherit;',function(){editExp(null);}));
  }

  // ── Projects tab ──
  function renderProjTab(){
    projData.forEach(function(proj,i){
      var item=el('div','background:#1e1e20;border:1px solid #2a2a2c;border-radius:10px;padding:14px;margin-bottom:10px;');
      var row=el('div','display:flex;justify-content:space-between;align-items:center;');
      var info=el('div','flex:1;min-width:0;');
      var title=el('div','color:#f2f2f2;font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;');
      title.textContent=proj.title||'';
      var sub=el('div','color:#8a8a8d;font-size:11px;');
      sub.textContent=(proj.links||[]).map(function(l){return l.name||l.label||'';}).join(' · ');
      info.appendChild(title); info.appendChild(sub);
      var btns=el('div','display:flex;gap:6px;flex-shrink:0;margin-left:8px;');
      btns.appendChild(mkBtn('Edit','padding:3px 9px;background:#232325;border:1px solid #2a2a2c;border-radius:5px;color:#f2f2f2;font-size:11px;cursor:pointer;',function(){editProj(i);}));
      btns.appendChild(mkBtn('Del','padding:3px 9px;background:#232325;border:1px solid #3a1a1a;border-radius:5px;color:#ff6060;font-size:11px;cursor:pointer;',function(){if(confirm('Delete this project?')){projData.splice(i,1);renderTab();}}));
      row.appendChild(info); row.appendChild(btns);
      item.appendChild(row); content.appendChild(item);
    });
    content.appendChild(mkBtn('+ Add Project','width:100%;padding:11px;background:none;border:2px dashed #2a2a2c;border-radius:10px;color:#8a8a8d;font-size:13px;cursor:pointer;font-family:inherit;',function(){editProj(null);}));
  }

  // ── Achievements tab ──
  function renderAchieveTab(){
    achieveData.forEach(function(a,i){
      var item=el('div','background:#1e1e20;border:1px solid #2a2a2c;border-radius:10px;padding:14px;margin-bottom:10px;');
      var row=el('div','display:flex;justify-content:space-between;align-items:flex-start;');
      var info=el('div','flex:1;min-width:0;');
      var title=el('div','color:#f2f2f2;font-weight:600;font-size:13px;margin-bottom:2px;line-height:1.4;');
      title.textContent=a.title||'';
      var sub=el('div','color:#8a8a8d;font-size:11px;');
      sub.textContent=a.organization||'';
      info.appendChild(title); info.appendChild(sub);
      var btns=el('div','display:flex;gap:6px;flex-shrink:0;margin-left:8px;');
      btns.appendChild(mkBtn('Edit','padding:3px 9px;background:#232325;border:1px solid #2a2a2c;border-radius:5px;color:#f2f2f2;font-size:11px;cursor:pointer;',function(){editAchieve(i);}));
      btns.appendChild(mkBtn('Del','padding:3px 9px;background:#232325;border:1px solid #3a1a1a;border-radius:5px;color:#ff6060;font-size:11px;cursor:pointer;',function(){if(confirm('Delete this achievement?')){achieveData.splice(i,1);renderTab();}}));
      row.appendChild(info); row.appendChild(btns);
      item.appendChild(row); content.appendChild(item);
    });
    content.appendChild(mkBtn('+ Add Achievement','width:100%;padding:11px;background:none;border:2px dashed #2a2a2c;border-radius:10px;color:#8a8a8d;font-size:13px;cursor:pointer;font-family:inherit;',function(){editAchieve(null);}));
  }

  // ── Site Info tab ──
  function renderSiteTab(){
    function sec(title){
      var d=el('div','color:#8a8a8d;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;margin:18px 0 10px;padding-top:14px;border-top:1px solid #2a2a2c;');
      d.textContent=title; return d;
    }
    function sField(key,label,placeholder,multi){
      var i=inp(siteData[key]||'',placeholder,multi);
      i.addEventListener('input',function(){siteData[key]=this.value;});
      return fldWrap(label,i);
    }
    function aField(key,idx,label,placeholder,multi){
      var arr=siteData[key]||[];
      var i=inp(arr[idx]||'',placeholder,multi);
      i.addEventListener('input',function(){
        if(!siteData[key])siteData[key]=[];
        while(siteData[key].length<=idx)siteData[key].push('');
        siteData[key][idx]=this.value;
      });
      return fldWrap(label,i);
    }

    content.appendChild(sec('Identity'));
    content.appendChild(sField('name','Full Name','Sanskar Bajaj'));

    content.appendChild(sec('Taglines (shown in About mini-view)'));
    content.appendChild(aField('taglines',0,'Tagline 1','e.g. IIIT Nagpur, CS & Engineering, CGPA 9.28'));
    content.appendChild(aField('taglines',1,'Tagline 2','e.g. Built orchestration agents at Kookar AI'));
    content.appendChild(aField('taglines',2,'Tagline 3','e.g. Shipping projects across full-stack and ML'));

    content.appendChild(sec('Bio Paragraphs'));
    content.appendChild(aField('bio',0,'Paragraph 1','First paragraph...',true));
    content.appendChild(aField('bio',1,'Paragraph 2','Second paragraph...',true));
    content.appendChild(aField('bio',2,'Paragraph 3','Third paragraph...',true));

    content.appendChild(sec('Stats'));
    content.appendChild(sField('cgpa','CGPA','9.28'));
    content.appendChild(sField('gradYear','Graduation Year Range','2022-26'));

    content.appendChild(sec('Social Links'));
    content.appendChild(sField('github','GitHub URL','https://github.com/...'));
    content.appendChild(sField('linkedin','LinkedIn URL','https://linkedin.com/in/...'));

    content.appendChild(sec('Contact'));
    content.appendChild(sField('email','Email','email@example.com'));
    content.appendChild(sField('phone','Phone','+91 9000000000'));
    content.appendChild(sField('location','Location','City, Country'));
  }

  // ── Shared save ──
  function doSave(){
    var cur=getAdmData()||{};
    cur.experience=expData;
    cur.projects=projData;
    cur.siteInfo=siteData;
    cur.achievements=achieveData;
    saveAdmData(cur);
    location.reload();
  }

  // ── Experience modal ──
  function editExp(idx){
    var isNew=idx===null;
    var d=isNew?{id:'exp_'+Date.now(),role:'',company:'',period:'',logo:'',bullets:[['','']]}:JSON.parse(JSON.stringify(expData[idx]));
    var bullets=(d.bullets&&d.bullets.length)?d.bullets:[['','']];
    var modal=el('div','position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:100001;display:flex;align-items:center;justify-content:center;padding:16px;');
    var card=el('div','background:#1a1a1c;border:1px solid #2a2a2c;border-radius:14px;width:100%;max-width:520px;max-height:88vh;overflow-y:auto;padding:24px;font-family:Inter,system-ui,sans-serif;');
    var h=el('div','color:#f2f2f2;font-weight:700;font-size:15px;margin-bottom:18px;');
    h.textContent=isNew?'Add Experience':'Edit Experience';
    card.appendChild(h);
    var roleInp=inp(d.role,'e.g. Software Engineer Intern');
    var compInp=inp(d.company,'e.g. Google');
    var periodInp=inp(d.period,'e.g. Jun 2025 - Aug 2025');
    var logoInp=inp(d.logo||'','Logo URL (optional)');
    card.appendChild(fldWrap('Role',roleInp));
    card.appendChild(fldWrap('Company',compInp));
    card.appendChild(fldWrap('Period',periodInp));
    card.appendChild(fldWrap('Logo URL',logoInp));
    var bulletsWrap=el('div','margin-bottom:14px;');
    bulletsWrap.appendChild(lbl('Bullets (bold keyword | rest of sentence)'));
    var bulletsList=el('div','display:flex;flex-direction:column;gap:8px;');
    bulletsWrap.appendChild(bulletsList);
    bulletsWrap.appendChild(mkBtn('+ Add Bullet','margin-top:8px;padding:5px 12px;background:#232325;border:1px dashed #2a2a2c;border-radius:6px;color:#8a8a8d;font-size:12px;cursor:pointer;',function(){bullets.push(['','']);renderBullets();}));
    card.appendChild(bulletsWrap);
    function renderBullets(){
      bulletsList.innerHTML='';
      bullets.forEach(function(b,bi){
        var row=el('div','display:flex;gap:6px;align-items:flex-start;');
        var cols=el('div','flex:1;display:flex;flex-direction:column;gap:4px;');
        var boldI=inp(b[0],'Bold keyword (e.g. 500+ users)');
        boldI.addEventListener('input',function(){bullets[bi][0]=this.value;});
        var restI=inp(b[1],': rest of sentence...');
        restI.addEventListener('input',function(){bullets[bi][1]=this.value;});
        cols.appendChild(boldI); cols.appendChild(restI);
        var delB=mkBtn('x','padding:8px;background:#232325;border:1px solid #3a1a1a;border-radius:6px;color:#ff6060;font-size:14px;cursor:pointer;flex-shrink:0;line-height:1;',function(){bullets.splice(bi,1);renderBullets();});
        row.appendChild(cols); row.appendChild(delB);
        bulletsList.appendChild(row);
      });
    }
    renderBullets();
    var rowBtns=el('div','display:flex;gap:8px;margin-top:18px;');
    rowBtns.appendChild(mkBtn(isNew?'Add':'Save','flex:1;padding:11px;background:#ff6d5a;border:none;border-radius:8px;color:#1a0a08;font-weight:700;font-size:14px;cursor:pointer;',function(){
      d.role=roleInp.value; d.company=compInp.value; d.period=periodInp.value;
      d.logo=logoInp.value||null;
      d.bullets=bullets.filter(function(b){return b[0]||b[1];});
      if(!d.bullets.length)d.bullets=[['','']];
      if(isNew)expData.push(d); else expData[idx]=d;
      modal.remove(); renderTab();
    }));
    rowBtns.appendChild(mkBtn('Cancel','padding:11px 18px;background:#232325;border:1px solid #2a2a2c;border-radius:8px;color:#8a8a8d;font-size:14px;cursor:pointer;',function(){modal.remove();}));
    card.appendChild(rowBtns);
    modal.appendChild(card); document.body.appendChild(modal);
    modal.addEventListener('click',function(e){if(e.target===modal)modal.remove();});
  }

  // ── Project modal ──
  function editProj(idx){
    var isNew=idx===null;
    var d=isNew?{id:'proj_'+Date.now(),title:'',problem:[],design:[],built:[],technologies:[],links:[]}:JSON.parse(JSON.stringify(projData[idx]));
    var modal=el('div','position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:100001;display:flex;align-items:center;justify-content:center;padding:16px;');
    var card=el('div','background:#1a1a1c;border:1px solid #2a2a2c;border-radius:14px;width:100%;max-width:560px;max-height:88vh;overflow-y:auto;padding:24px;font-family:Inter,system-ui,sans-serif;');
    var h=el('div','color:#f2f2f2;font-weight:700;font-size:15px;margin-bottom:18px;');
    h.textContent=isNew?'Add Project':'Edit Project';
    card.appendChild(h);
    var titleInp=inp(d.title,'Project title');
    card.appendChild(fldWrap('Title',titleInp));
    var problemTA=inp((d.problem||[]).join('\n'),'One line per problem statement',true);
    card.appendChild(fldWrap('Problem (one per line)',problemTA));
    var designTA=inp((d.design||[]).join('\n'),'One line per design decision',true);
    card.appendChild(fldWrap('Design / Approach (one per line)',designTA));
    var builtTA=inp((d.built||[]).join('\n'),'One line per thing you built',true);
    card.appendChild(fldWrap('What I Built (one per line)',builtTA));
    var techInp=inp((d.technologies||[]).join(', '),'React, Python, FastAPI, ...');
    card.appendChild(fldWrap('Technologies (comma-separated)',techInp));
    var linksTA=inp((d.links||[]).map(function(l){return (l.name||l.label||'')+'|'+(l.url||'');}).join('\n'),'GitHub|https://github.com/...',true);
    card.appendChild(fldWrap('Links - Name|URL (one per line)',linksTA));
    var rowBtns=el('div','display:flex;gap:8px;margin-top:18px;');
    rowBtns.appendChild(mkBtn(isNew?'Add':'Save','flex:1;padding:11px;background:#ff6d5a;border:none;border-radius:8px;color:#1a0a08;font-weight:700;font-size:14px;cursor:pointer;',function(){
      d.title=titleInp.value;
      d.problem=problemTA.value.split('\n').map(function(s){return s.trim();}).filter(Boolean);
      d.design=designTA.value.split('\n').map(function(s){return s.trim();}).filter(Boolean);
      d.built=builtTA.value.split('\n').map(function(s){return s.trim();}).filter(Boolean);
      d.technologies=techInp.value.split(',').map(function(s){return s.trim();}).filter(Boolean);
      d.links=linksTA.value.split('\n').filter(Boolean).map(function(line){
        var parts=line.split('|'); return {name:parts[0].trim(),url:parts.slice(1).join('|').trim()};
      });
      if(isNew)projData.push(d); else projData[idx]=d;
      modal.remove(); renderTab();
    }));
    rowBtns.appendChild(mkBtn('Cancel','padding:11px 18px;background:#232325;border:1px solid #2a2a2c;border-radius:8px;color:#8a8a8d;font-size:14px;cursor:pointer;',function(){modal.remove();}));
    card.appendChild(rowBtns);
    modal.appendChild(card); document.body.appendChild(modal);
    modal.addEventListener('click',function(e){if(e.target===modal)modal.remove();});
  }

  // ── Achievement modal ──
  function editAchieve(idx){
    var isNew=idx===null;
    var d=isNew?{title:'',organization:''}:JSON.parse(JSON.stringify(achieveData[idx]));
    var modal=el('div','position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:100001;display:flex;align-items:center;justify-content:center;padding:16px;');
    var card=el('div','background:#1a1a1c;border:1px solid #2a2a2c;border-radius:14px;width:100%;max-width:480px;padding:24px;font-family:Inter,system-ui,sans-serif;');
    var h=el('div','color:#f2f2f2;font-weight:700;font-size:15px;margin-bottom:18px;');
    h.textContent=isNew?'Add Achievement':'Edit Achievement';
    card.appendChild(h);
    var titleTA=inp(d.title,'e.g. Google Cloud Computing Foundations Certification',true);
    titleTA.style.minHeight='60px';
    card.appendChild(fldWrap('Title',titleTA));
    var orgInp=inp(d.organization,'e.g. Google');
    card.appendChild(fldWrap('Organization',orgInp));
    var rowBtns=el('div','display:flex;gap:8px;margin-top:18px;');
    rowBtns.appendChild(mkBtn(isNew?'Add':'Save','flex:1;padding:11px;background:#ff6d5a;border:none;border-radius:8px;color:#1a0a08;font-weight:700;font-size:14px;cursor:pointer;',function(){
      d.title=titleTA.value.trim();
      d.organization=orgInp.value.trim();
      if(!d.title)return;
      if(isNew)achieveData.push(d); else achieveData[idx]=d;
      modal.remove(); renderTab();
    }));
    rowBtns.appendChild(mkBtn('Cancel','padding:11px 18px;background:#232325;border:1px solid #2a2a2c;border-radius:8px;color:#8a8a8d;font-size:14px;cursor:pointer;',function(){modal.remove();}));
    card.appendChild(rowBtns);
    modal.appendChild(card); document.body.appendChild(modal);
    modal.addEventListener('click',function(e){if(e.target===modal)modal.remove();});
  }
}
})();

// Remove pre-render cover overlay once the canvas is ready
(function(){
  function removeRc(){
    var c=document.getElementById('__rc');
    if(!c)return;
    if(document.querySelector('svg[width],canvas,[data-node-id],[class*="node"]')){
      c.style.transition='opacity .25s';c.style.opacity='0';
      setTimeout(function(){if(c&&c.parentNode)c.parentNode.removeChild(c);},280);
    } else {
      setTimeout(removeRc,60);
    }
  }
  setTimeout(removeRc,200);
})();
