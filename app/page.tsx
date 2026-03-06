'use client'
import { useState, useEffect } from 'react'

const CREDS = [
  { u: 'admin',  s: 'Klem@c/2022', n: 'Administrador' },
  { u: 'klemac', s: 'Klem@c/2022', n: 'Klemac' },
]
const SW = ['Antivirus','Microsoft Office','Primavera','SICA','Zoom','Adobe Creative Cloud']
const SWE: Record<string,string> = {'Antivirus':'🛡️','Microsoft Office':'💼','Primavera':'🌿','SICA':'⚙️','Zoom':'📹','Adobe Creative Cloud':'🎨'}
const SWC: Record<string,string> = {'Antivirus':'#00c8f0','Microsoft Office':'#fbbf24','Primavera':'#34d399','SICA':'#a78bfa','Zoom':'#60a5fa','Adobe Creative Cloud':'#f87171'}
const DEPT = ['Formação','Finanças','Administração','Recursos Humanos','Operações','Gestão de Tripulantes','TIC','Direcção Geral']
const SEED = [
  {id:1,usuario:'Carlos Mendonça',email:'carlos@empresa.ao',departamento:'Tecnologia de Informação',software:'Antivirus',data_instalacao:'2024-01-15',data_expiracao:'2025-04-15',numero_licenca:'AV-2024-001',observacoes:''},
  {id:2,usuario:'Ana Silva',email:'ana@empresa.ao',departamento:'Recursos Humanos',software:'Microsoft Office',data_instalacao:'2024-03-01',data_expiracao:'2025-03-01',numero_licenca:'OFF-2024-002',observacoes:''},
  {id:3,usuario:'João Baptista',email:'joao@empresa.ao',departamento:'Financeiro',software:'Primavera',data_instalacao:'2024-02-10',data_expiracao:'2025-04-06',numero_licenca:'PRI-2024-003',observacoes:'Licença Enterprise'},
  {id:4,usuario:'Maria Luísa',email:'maria@empresa.ao',departamento:'Contabilidade',software:'SICA',data_instalacao:'2024-04-01',data_expiracao:'2025-04-10',numero_licenca:'SIC-2024-004',observacoes:''},
  {id:5,usuario:'Pedro Neto',email:'pedro@empresa.ao',departamento:'Marketing',software:'Zoom',data_instalacao:'2024-05-20',data_expiracao:'2025-05-20',numero_licenca:'ZOM-2024-005',observacoes:''},
  {id:6,usuario:'Sofia Costa',email:'sofia@empresa.ao',departamento:'Marketing',software:'Adobe Creative Cloud',data_instalacao:'2024-01-01',data_expiracao:'2025-03-20',numero_licenca:'ADO-2024-006',observacoes:''},
  {id:7,usuario:'Luís Ferreira',email:'luis@empresa.ao',departamento:'Tecnologia de Informação',software:'Microsoft Office',data_instalacao:'2024-06-01',data_expiracao:'2025-06-01',numero_licenca:'OFF-2024-007',observacoes:''},
  {id:8,usuario:'Teresa Gomes',email:'teresa@empresa.ao',departamento:'Administração',software:'Antivirus',data_instalacao:'2024-07-15',data_expiracao:'2025-07-15',numero_licenca:'AV-2024-008',observacoes:''},
  {id:9,usuario:'António Dias',email:'antonio@empresa.ao',departamento:'Direcção Geral',software:'Zoom',data_instalacao:'2024-08-01',data_expiracao:'2025-04-20',numero_licenca:'ZOM-2024-009',observacoes:''},
  {id:10,usuario:'Beatriz Lopes',email:'beatriz@empresa.ao',departamento:'Jurídico',software:'Microsoft Office',data_instalacao:'2024-09-01',data_expiracao:'2025-09-01',numero_licenca:'OFF-2024-010',observacoes:''},
]
type L = typeof SEED[0]
function dd(e:string){const h=new Date();h.setHours(0,0,0,0);return Math.round((new Date(e+'T00:00:00').getTime()-h.getTime())/86400000)}
function gs(e:string){const d=dd(e);if(d<0)return'expirada';if(d<=30)return'alerta';if(d<=60)return'atencao';return'ativa'}
function fd(s:string){if(!s)return'—';const[y,m,d]=s.split('-');return`${d}/${m}/${y}`}
function ini(n:string){return n.split(' ').slice(0,2).map((w:string)=>w[0]).join('').toUpperCase()}
const SL:Record<string,string>={ativa:'Activa',atencao:'Atenção',alerta:'⚠️ Alerta',expirada:'❌ Expirada'}
const SC:Record<string,string>={ativa:'#10b981',atencao:'#f97316',alerta:'#f59e0b',expirada:'#ef4444'}
const SB:Record<string,string>={ativa:'rgba(16,185,129,0.12)',atencao:'rgba(249,115,22,0.12)',alerta:'rgba(245,158,11,0.12)',expirada:'rgba(239,68,68,0.12)'}
const EF={usuario:'',email:'',departamento:'',software:'',data_instalacao:'',data_expiracao:'',numero_licenca:'',observacoes:''}

function Login({onLogin}:{onLogin:(n:string)=>void}){
  const[u,setU]=useState('')
  const[p,setP]=useState('')
  const[show,setShow]=useState(false)
  const[err,setErr]=useState('')
  const[load,setLoad]=useState(false)
  const[shake,setShake]=useState(false)
  const go=()=>{
    if(!u||!p){setErr('Preencha utilizador e senha.');return}
    setLoad(true)
    setTimeout(()=>{
      const f=CREDS.find(c=>c.u===u&&c.s===p)
      if(f){sessionStorage.setItem('ks',JSON.stringify({n:f.n,u:f.u}));onLogin(f.n)}
      else{setErr('Utilizador ou senha incorrectos.');setShake(true);setTimeout(()=>setShake(false),600)}
      setLoad(false)
    },700)
  }
  const K=(e:React.KeyboardEvent)=>{if(e.key==='Enter')go()}
  const I:React.CSSProperties={width:'100%',background:'#162035',border:`1px solid ${err?'rgba(239,68,68,0.4)':'#1e3050'}`,color:'#dde8f5',padding:'12px 14px 12px 44px',borderRadius:12,fontFamily:'DM Sans,sans-serif',fontSize:'0.9rem',outline:'none'}
  return(
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#07101f',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <div style={{position:'absolute',top:'-20%',left:'-10%',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,200,240,0.07) 0%,transparent 70%)'}}/>
        <div style={{position:'absolute',bottom:'-20%',right:'-10%',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(109,40,217,0.07) 0%,transparent 70%)'}}/>
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.025}} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00c8f0" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>
      </div>
      <div style={{background:'rgba(15,28,46,0.97)',border:'1px solid #1e3050',borderRadius:24,padding:'2.5rem',width:'100%',maxWidth:420,boxShadow:'0 40px 100px rgba(0,0,0,0.6)',position:'relative',zIndex:10,animation:shake?'shake 0.5s':'fadeUp 0.5s'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{width:72,height:72,borderRadius:20,background:'linear-gradient(135deg,#00c8f0,#6d28d9)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem',boxShadow:'0 0 40px rgba(0,200,240,0.35)',fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:34,color:'#fff'}}>K</div>
          <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.6rem',color:'#dde8f5'}}>Klemac Licença</div>
          <div style={{fontSize:'0.68rem',color:'#526480',letterSpacing:3,textTransform:'uppercase',marginTop:4}}>Sistema de Controlo de Licenças</div>
        </div>
        <div style={{height:1,background:'linear-gradient(90deg,transparent,#1e3050,transparent)',marginBottom:'1.75rem'}}/>
        <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'1.05rem',color:'#dde8f5',marginBottom:6}}>Iniciar Sessão</div>
        <div style={{fontSize:'0.8rem',color:'#526480',marginBottom:'1.5rem'}}>Introduza as suas credenciais de acesso ao sistema.</div>
        <div style={{marginBottom:'1rem'}}>
          <label style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase' as const,letterSpacing:'1.5px',color:'#526480',display:'block',marginBottom:6}}>Utilizador</label>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:17,color:'#526480'}}>👤</span>
            <input type="text" placeholder="Utilizador" value={u} onChange={e=>{setU(e.target.value);setErr('')}} onKeyDown={K} style={I} autoFocus/>
          </div>
        </div>
        <div style={{marginBottom:'1.5rem'}}>
          <label style={{fontSize:'0.7rem',fontWeight:600,textTransform:'uppercase' as const,letterSpacing:'1.5px',color:'#526480',display:'block',marginBottom:6}}>Senha</label>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:17,color:'#526480'}}>🔒</span>
            <input type={show?'text':'password'} placeholder="••••••••••" value={p} onChange={e=>{setP(e.target.value);setErr('')}} onKeyDown={K} style={{...I,paddingRight:44}}/>
            <button onClick={()=>setShow(s=>!s)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:17,color:'#526480',padding:4}}>{show?'🙈':'👁️'}</button>
          </div>
        </div>
        {err&&<div style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.25)',borderRadius:10,padding:'10px 14px',marginBottom:'1rem',color:'#f87171',fontSize:'0.82rem'}}>⚠️ {err}</div>}
        <button onClick={go} disabled={load} style={{width:'100%',padding:'13px',borderRadius:12,border:'none',cursor:load?'not-allowed':'pointer',background:load?'#1c2940':'linear-gradient(135deg,#00c8f0,#0090c8)',color:load?'#526480':'#021020',fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'0.95rem',letterSpacing:0.5,boxShadow:load?'none':'0 4px 20px rgba(0,200,240,0.3)',transition:'all 0.2s'}}>
          {load?'⏳ A verificar...':'🔐 Entrar no Sistema'}
        </button>
        <div style={{textAlign:'center',marginTop:'1.5rem',fontSize:'0.7rem',color:'#3a4f6a'}}>Klemac Licença © 2025</div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
    </div>
  )
}

export default function Home(){
  const[auth,setAuth]=useState(false)
  const[nome,setNome]=useState('')
  const[lic,setLic]=useState<L[]>([])
  const[nid,setNid]=useState(11)
  const[srch,setSrch]=useState('')
  const[fsw,setFsw]=useState('')
  const[fdp,setFdp]=useState('')
  const[fst,setFst]=useState('')
  const[sfm,setSfm]=useState(false)
  const[sdl,setSdl]=useState(false)
  const[eid,setEid]=useState<number|null>(null)
  const[did,setDid]=useState<number|null>(null)
  const[form,setForm]=useState({...EF})
  const[toast,setToast]=useState<{m:string,t:string}|null>(null)
  const[sc,setSc]=useState('data_expiracao')
  const[sd,setSd]=useState(1)
  useEffect(()=>{
    const s=sessionStorage.getItem('ks')
    if(s){const p=JSON.parse(s);setAuth(true);setNome(p.n)}
    const saved=localStorage.getItem('klem_lic')
    if(saved){const d=JSON.parse(saved);setLic(d);setNid(Math.max(...d.map((l:L)=>l.id),0)+1)}
    else setLic(SEED)
  },[])
  const sv=(d:L[])=>{localStorage.setItem('klem_lic',JSON.stringify(d));setLic(d)}
  const t=(m:string,tp:string)=>{setToast({m,t:tp});setTimeout(()=>setToast(null),3000)}
  const logout=()=>{sessionStorage.removeItem('ks');setAuth(false);setNome('')}
  const fil=lic.filter(l=>{
    if(srch&&!l.usuario.toLowerCase().includes(srch.toLowerCase()))return false
    if(fsw&&l.software!==fsw)return false
    if(fdp&&l.departamento!==fdp)return false
    if(fst&&gs(l.data_expiracao)!==fst)return false
    return true
  }).sort((a,b)=>{
    const av=sc==='dias'?dd(a.data_expiracao):(a[sc as keyof L]||'').toString()
    const bv=sc==='dias'?dd(b.data_expiracao):(b[sc as keyof L]||'').toString()
    return av<bv?-sd:av>bv?sd:0
  })
  const tot=lic.length
  const atv=lic.filter(l=>dd(l.data_expiracao)>60).length
  const alt=lic.filter(l=>{const d=dd(l.data_expiracao);return d>=0&&d<=30}).length
  const exp=lic.filter(l=>dd(l.data_expiracao)<0).length
  const oa=()=>{setEid(null);setForm({...EF,data_instalacao:new Date().toISOString().slice(0,10)});setSfm(true)}
  const oe=(l:L)=>{setEid(l.id);setForm({usuario:l.usuario,email:l.email,departamento:l.departamento,software:l.software,data_instalacao:l.data_instalacao,data_expiracao:l.data_expiracao,numero_licenca:l.numero_licenca,observacoes:l.observacoes});setSfm(true)}
  const sub=()=>{
    if(!form.usuario||!form.departamento||!form.software||!form.data_instalacao||!form.data_expiracao){t('Preencha todos os campos obrigatórios.','e');return}
    if(form.data_expiracao<form.data_instalacao){t('Data de expiração não pode ser anterior à instalação.','e');return}
    if(eid){sv(lic.map(l=>l.id===eid?{...l,...form}:l));t('Licença actualizada!','s')}
    else{sv([...lic,{id:nid,...form}]);setNid(n=>n+1);t('Licença adicionada!','s')}
    setSfm(false)
  }
  const del=()=>{sv(lic.filter(l=>l.id!==did));setSdl(false);t('Licença eliminada.','e')}
  const hs=(col:string)=>{if(sc===col)setSd(d=>d*-1);else{setSc(col);setSd(1)}}
  if(!auth)return <Login onLogin={(n)=>{setAuth(true);setNome(n)}}/>
  const s:Record<string,React.CSSProperties>={
    hd:{background:'linear-gradient(180deg,#0a1628,#0f1c2e)',borderBottom:'1px solid #1e3050',padding:'0 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',height:'68px',position:'sticky',top:0,zIndex:200,boxShadow:'0 4px 40px rgba(0,0,0,0.4)'},
    li:{width:42,height:42,borderRadius:12,background:'linear-gradient(135deg,#00c8f0,#6d28d9)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:20,color:'#fff'},
    btn:{padding:'9px 20px',borderRadius:10,border:'none',cursor:'pointer',fontFamily:'DM Sans,sans-serif',fontWeight:600,fontSize:'0.85rem',transition:'all 0.2s',display:'inline-flex',alignItems:'center',gap:7},
    bp:{background:'linear-gradient(135deg,#00c8f0,#008fc4)',color:'#021020',boxShadow:'0 2px 12px rgba(0,200,240,0.25)'},
    bs:{background:'#162035',color:'#dde8f5',border:'1px solid #1e3050'},
    bd:{background:'rgba(239,68,68,0.12)',color:'#f87171',border:'1px solid rgba(239,68,68,0.25)'},
    cd:{background:'#0f1c2e',border:'1px solid #1e3050',borderRadius:16,padding:'1.5rem',position:'relative',overflow:'hidden'},
    ip:{background:'#162035',border:'1px solid #1e3050',color:'#dde8f5',padding:'10px 14px',borderRadius:10,fontFamily:'DM Sans,sans-serif',fontSize:'0.9rem',outline:'none',width:'100%'},
    sl:{background:'#162035',border:'1px solid #1e3050',color:'#dde8f5',padding:'9px 14px',borderRadius:10,fontFamily:'DM Sans,sans-serif',fontSize:'0.875rem',outline:'none',cursor:'pointer'},
    ov:{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(6px)'},
    md:{background:'#0f1c2e',border:'1px solid #1e3050',borderRadius:22,padding:'2rem',width:'100%',maxWidth:560,boxShadow:'0 30px 80px rgba(0,0,0,0.6)',maxHeight:'90vh',overflowY:'auto'},
    lb:{fontSize:'0.72rem',fontWeight:600,textTransform:'uppercase' as const,letterSpacing:'1.5px',color:'#526480',display:'block',marginBottom:5},
    th:{padding:'11px 16px',textAlign:'left' as const,fontSize:'0.68rem',textTransform:'uppercase' as const,letterSpacing:'1.8px',color:'#526480',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap' as const,background:'#162035'},
    td:{padding:'13px 16px',fontSize:'0.875rem',verticalAlign:'middle' as const,borderBottom:'1px solid rgba(30,48,80,0.5)'},
  }
  return(
    <div style={{minHeight:'100vh'}}>
      {toast&&<div style={{position:'fixed',top:80,right:20,zIndex:999,padding:'12px 18px',borderRadius:12,fontSize:'0.875rem',fontWeight:500,boxShadow:'0 8px 30px rgba(0,0,0,0.4)',background:toast.t==='s'?'#052e16':'#2d0a0a',border:`1px solid ${toast.t==='s'?'#14532d':'#7f1d1d'}`,color:toast.t==='s'?'#4ade80':'#f87171'}}>{toast.m}</div>}
      <header style={s.hd}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <div style={s.li}>K</div>
          <div>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.15rem'}}>Klemac Licença</div>
            <div style={{fontSize:'0.65rem',color:'#526480',letterSpacing:3,textTransform:'uppercase'}}>Sistema de Controlo</div>
          </div>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <div style={{fontSize:'0.75rem',color:'#526480',background:'#162035',border:'1px solid #1e3050',borderRadius:8,padding:'5px 12px'}}>{new Date().toLocaleDateString('pt-AO',{weekday:'short',day:'2-digit',month:'short',year:'numeric'})}</div>
          <div style={{display:'flex',alignItems:'center',gap:8,background:'#162035',border:'1px solid #1e3050',borderRadius:10,padding:'6px 12px'}}>
            <div style={{width:28,height:28,borderRadius:8,background:'linear-gradient(135deg,#6d28d9,#00c8f0)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',fontWeight:700,color:'#fff'}}>{nome.charAt(0)}</div>
            <span style={{fontSize:'0.82rem',color:'#dde8f5',fontWeight:500}}>{nome}</span>
          </div>
          <button style={{...s.btn,...s.bp}} onClick={oa}>＋ Nova Licença</button>
          <button style={{...s.btn,...s.bs}} onClick={logout}>🚪 Sair</button>
        </div>
      </header>
      <div style={{padding:'2rem',maxWidth:1700,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1.75rem'}}>
          {[{l:'Total de Licenças',v:tot,c:'#00c8f0',i:'📋',b:'linear-gradient(90deg,#00c8f0,#6d28d9)'},{l:'Activas',v:atv,c:'#10b981',i:'✅',b:'#10b981'},{l:'Expiram em 30 dias',v:alt,c:'#f59e0b',i:'⚠️',b:'#f59e0b'},{l:'Expiradas',v:exp,c:'#ef4444',i:'❌',b:'#ef4444'}].map(({l,v,c,i,b})=>(
            <div key={l} style={{...s.cd,paddingBottom:'1.75rem'}}>
              <div style={{position:'absolute',bottom:0,left:0,right:0,height:3,background:b,borderRadius:'0 0 16px 16px'}}/>
              <div style={{position:'absolute',right:20,top:20,fontSize:'2.5rem',opacity:0.07}}>{i}</div>
              <div style={{fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:2,color:'#526480',marginBottom:'0.6rem'}}>{l}</div>
              <div style={{fontFamily:'Syne,sans-serif',fontSize:'2.8rem',fontWeight:800,color:c,lineHeight:1}}>{v}</div>
            </div>
          ))}
        </div>
        {(alt>0||exp>0)&&<div style={{background:'linear-gradient(135deg,rgba(245,158,11,0.08),rgba(239,68,68,0.08))',border:'1px solid rgba(245,158,11,0.25)',borderRadius:14,padding:'14px 20px',marginBottom:'1.75rem',display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:10,height:10,borderRadius:'50%',background:'#f59e0b',flexShrink:0}}/>
          <div style={{fontSize:'0.875rem',lineHeight:1.5}}><strong style={{color:'#f59e0b'}}>⚠️ Atenção! </strong>{exp>0&&<span style={{color:'#f87171',fontWeight:600}}>{exp} licença(s) já expiraram. </span>}{alt>0&&<span>{alt} licença(s) expiram nos próximos 30 dias. </span>}Renove com urgência.</div>
        </div>}
        <div style={{marginBottom:'1.75rem'}}>
          <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'2.5px',color:'#526480',marginBottom:'1rem'}}>Mapa de Licenças por Software</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'0.875rem'}}>
            {SW.map(sw=>{const cnt=lic.filter(l=>l.software===sw).length;const mx=Math.max(...SW.map(s=>lic.filter(l=>l.software===s).length),1);return(
              <div key={sw} onClick={()=>setFsw(fsw===sw?'':sw)} style={{background:fsw===sw?'rgba(0,200,240,0.05)':'#0f1c2e',border:`1px solid ${fsw===sw?'#00c8f0':'#1e3050'}`,borderRadius:14,padding:'1.1rem',cursor:'pointer',transition:'all 0.2s'}}>
                <div style={{fontSize:'1.5rem',marginBottom:6}}>{SWE[sw]}</div>
                <div style={{fontSize:'0.7rem',color:'#526480',marginBottom:4,fontWeight:600,lineHeight:1.3}}>{sw}</div>
                <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.6rem',color:'#dde8f5'}}>{cnt}</div>
                <div style={{height:3,background:'#1e3050',borderRadius:2,marginTop:8,overflow:'hidden'}}><div style={{height:'100%',borderRadius:2,background:'linear-gradient(90deg,#00c8f0,#6d28d9)',width:`${cnt/mx*100}%`,transition:'width 0.8s ease'}}/></div>
              </div>
            )})}
          </div>
        </div>
        <div style={{display:'flex',gap:10,marginBottom:'1.25rem',flexWrap:'wrap',alignItems:'center'}}>
          <div style={{position:'relative',flex:1,minWidth:200,maxWidth:300}}>
            <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#526480',fontSize:14}}>🔍</span>
            <input style={{...s.ip,paddingLeft:36}} placeholder="Pesquisar utilizador..." value={srch} onChange={e=>setSrch(e.target.value)}/>
          </div>
          <select style={s.sl} value={fsw} onChange={e=>setFsw(e.target.value)}><option value="">Todos os Softwares</option>{SW.map(sw=><option key={sw} value={sw}>{sw}</option>)}</select>
          <select style={s.sl} value={fdp} onChange={e=>setFdp(e.target.value)}><option value="">Todos os Departamentos</option>{DEPT.map(d=><option key={d} value={d}>{d}</option>)}</select>
          <select style={s.sl} value={fst} onChange={e=>setFst(e.target.value)}><option value="">Todos os Estados</option><option value="ativa">Activa</option><option value="atencao">Atenção (60 dias)</option><option value="alerta">Alerta (30 dias)</option><option value="expirada">Expirada</option></select>
          <span style={{color:'#526480',fontSize:'0.8rem',cursor:'pointer',textDecoration:'underline'}} onClick={()=>{setSrch('');setFsw('');setFdp('');setFst('')}}>Limpar filtros</span>
        </div>
        <div style={{background:'#0f1c2e',border:'1px solid #1e3050',borderRadius:18,overflow:'hidden'}}>
          <div style={{padding:'1.2rem 1.5rem',borderBottom:'1px solid #1e3050',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'0.95rem'}}>Registo de Licenças</div>
            <div style={{fontSize:'0.8rem',color:'#526480'}}>{fil.length} de {tot} registos</div>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',whiteSpace:'nowrap'}}>
              <thead><tr>{[['usuario','Utilizador'],['departamento','Departamento'],['software','Software'],['','Nº Licença'],['data_instalacao','Instalação'],['data_expiracao','Expiração'],['','Estado'],['dias','Dias Rest.'],['','Acções']].map(([col,lbl])=>(
                <th key={lbl} style={s.th} onClick={()=>col&&hs(col)}>{lbl}{col&&sc===col?(sd===1?' ↑':' ↓'):col?' ↕':''}</th>
              ))}</tr></thead>
              <tbody>
                {fil.length===0?<tr><td colSpan={9} style={{...s.td,textAlign:'center',padding:'4rem',color:'#526480',borderBottom:'none'}}>
                  <div style={{fontSize:'3rem',marginBottom:'1rem',opacity:0.3}}>📭</div>
                  <div>Nenhuma licença encontrada.</div>
                  <button style={{...s.btn,...s.bp,marginTop:'1rem'}} onClick={oa}>Adicionar Licença</button>
                </td></tr>:fil.map(l=>{
                  const st=gs(l.data_expiracao);const dias=dd(l.data_expiracao)
                  return(<tr key={l.id} style={{transition:'background 0.15s'}} onMouseEnter={e=>(e.currentTarget.style.background='rgba(0,200,240,0.03)')} onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                    <td style={s.td}><div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#6d28d9,#00c8f0)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem',fontWeight:700,color:'#fff',flexShrink:0}}>{ini(l.usuario)}</div>
                      <div><div style={{fontWeight:500}}>{l.usuario}</div>{l.email&&<div style={{fontSize:'0.72rem',color:'#526480'}}>{l.email}</div>}</div>
                    </div></td>
                    <td style={{...s.td,fontSize:'0.82rem',color:'#526480'}}>{l.departamento}</td>
                    <td style={s.td}><span style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 10px',borderRadius:7,fontSize:'0.78rem',fontWeight:500,background:`${SWC[l.software]}20`,color:SWC[l.software]}}>{SWE[l.software]} {l.software}</span></td>
                    <td style={{...s.td,fontFamily:'monospace',fontSize:'0.78rem',color:'#526480'}}>{l.numero_licenca||'—'}</td>
                    <td style={{...s.td,fontSize:'0.82rem'}}>{fd(l.data_instalacao)}</td>
                    <td style={{...s.td,fontSize:'0.82rem'}}>{fd(l.data_expiracao)}</td>
                    <td style={s.td}><span style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 11px',borderRadius:20,fontSize:'0.73rem',fontWeight:600,background:SB[st],color:SC[st],border:`1px solid ${SC[st]}30`}}><span style={{width:5,height:5,borderRadius:'50%',background:'currentColor',display:'inline-block'}}/>{SL[st]}</span></td>
                    <td style={s.td}><span style={{color:SC[st],fontWeight:600}}>{dias<0?`${Math.abs(dias)}d atrás`:dias===0?'Hoje!':`${dias} dias`}</span></td>
                    <td style={s.td}><div style={{display:'flex',gap:6}}>
                      <button style={{...s.btn,padding:'6px 10px',fontSize:'0.85rem',borderRadius:8,background:'rgba(109,40,217,0.15)',color:'#a78bfa',border:'none'}} onClick={()=>oe(l)}>✏️</button>
                      <button style={{...s.btn,padding:'6px 10px',fontSize:'0.85rem',borderRadius:8,background:'rgba(239,68,68,0.1)',color:'#f87171',border:'none'}} onClick={()=>{setDid(l.id);setSdl(true)}}>🗑️</button>
                    </div></td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{textAlign:'center',padding:'2.5rem',color:'#3a4f6a',fontSize:'0.75rem',letterSpacing:1}}>Klemac Licença © 2025 — Sistema de Controlo de Licenças de Software</div>
      </div>
      {sfm&&<div style={s.ov} onClick={e=>{if(e.target===e.currentTarget)setSfm(false)}}>
        <div style={s.md}>
          <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.25rem',marginBottom:'1.5rem',display:'flex',alignItems:'center',gap:10}}>{eid?'✏️ Editar':'➕ Adicionar'} Licença</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.1rem'}}>
            {[{l:'Nome do Utilizador *',k:'usuario',t:'text',p:'Ex: João Silva'},{l:'Email',k:'email',t:'email',p:'joao@empresa.ao'}].map(({l,k,t,p})=>(
              <div key={k}><label style={s.lb}>{l}</label><input style={s.ip} type={t} placeholder={p} value={form[k as keyof typeof form]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/></div>
            ))}
            <div><label style={s.lb}>Departamento *</label><select style={{...s.ip,cursor:'pointer'}} value={form.departamento} onChange={e=>setForm(f=>({...f,departamento:e.target.value}))}><option value="">Seleccionar...</option>{DEPT.map(d=><option key={d} value={d}>{d}</option>)}</select></div>
            <div><label style={s.lb}>Software *</label><select style={{...s.ip,cursor:'pointer'}} value={form.software} onChange={e=>setForm(f=>({...f,software:e.target.value}))}><option value="">Seleccionar...</option>{SW.map(sw=><option key={sw} value={sw}>{sw}</option>)}</select></div>
            <div><label style={s.lb}>Data de Instalação *</label><input style={s.ip} type="date" value={form.data_instalacao} onChange={e=>setForm(f=>({...f,data_instalacao:e.target.value}))}/></div>
            <div><label style={s.lb}>Data de Expiração *</label><input style={s.ip} type="date" value={form.data_expiracao} onChange={e=>setForm(f=>({...f,data_expiracao:e.target.value}))}/></div>
            <div style={{gridColumn:'1/-1'}}><label style={s.lb}>Número de Licença</label><input style={s.ip} type="text" placeholder="Ex: OFF-2024-001" value={form.numero_licenca} onChange={e=>setForm(f=>({...f,numero_licenca:e.target.value}))}/></div>
            <div style={{gridColumn:'1/-1'}}><label style={s.lb}>Observações</label><textarea style={{...s.ip,resize:'vertical',minHeight:75}} placeholder="Notas adicionais..." value={form.observacoes} onChange={e=>setForm(f=>({...f,observacoes:e.target.value}))}/></div>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:'1.5rem'}}>
            <button style={{...s.btn,...s.bs}} onClick={()=>setSfm(false)}>Cancelar</button>
            <button style={{...s.btn,...s.bp}} onClick={sub}>💾 Guardar Licença</button>
          </div>
        </div>
      </div>}
      {sdl&&<div style={s.ov} onClick={e=>{if(e.target===e.currentTarget)setSdl(false)}}>
        <div style={{...s.md,maxWidth:420,textAlign:'center'}}>
          <div style={{fontSize:'2.5rem',marginBottom:'1rem'}}>🗑️</div>
          <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.25rem',marginBottom:'1rem'}}>Confirmar Eliminação</div>
          <div style={{color:'#526480',fontSize:'0.9rem',lineHeight:1.6,marginBottom:'0.5rem'}}>Tem a certeza que pretende eliminar a licença de<br/><strong style={{color:'#dde8f5'}}>{lic.find(l=>l.id===did)?.usuario}</strong> — {lic.find(l=>l.id===did)?.software}?</div>
          <div style={{color:'#f87171',fontSize:'0.8rem',marginBottom:'1.5rem'}}>Esta acção é irreversível.</div>
          <div style={{display:'flex',gap:12,justifyContent:'center'}}>
            <button style={{...s.btn,...s.bs}} onClick={()=>setSdl(false)}>Cancelar</button>
            <button style={{...s.btn,...s.bd}} onClick={del}>Eliminar</button>
          </div>
        </div>
      </div>}
    </div>
  )
}
