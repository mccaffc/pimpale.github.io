import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import"./modulepreload-polyfill-P2Xu9kJm.js";import{n as t,r as n,t as r}from"./client-DyL1ZotQ.js";import{t as i}from"./bootstrap-sMF1ce4T.js";import{t as a}from"./ArticleLayout-Chegvux2.js";var o=e(n()),s=t();i();var c=e(r()),l={"'":`𐤀`,b:`𐤁`,g:`𐤂`,d:`𐤃`,h:`𐤄`,w:`𐤅`,z:`𐤆`,x:`𐤇`,T:`𐤈`,y:`𐤉`,k:`𐤊`,l:`𐤋`,m:`𐤌`,n:`𐤍`,s:`𐤎`,A:`𐤏`,p:`𐤐`,S:`𐤑`,q:`𐤒`,r:`𐤓`,j:`𐤔`,t:`𐤕`,a:`𐤖`,i:`𐤗`,u:`𐤘`,o:`𐤙`,0:`̣`,1:`̇`,2:`̈`,3:`᪴`,"1a":`َ`,"2a":`ِ`,"3a":`ُ`,"1h":`ַ`,"2h":`ִ`,"3h":`ֻ`,v:`̌`,"^":`̂`,_:`̱`,"|":`𐤟`,"-":`̄`},u=Math.max(...Object.keys(l).map(e=>e.length));function d(e){let t=Array.from(e),n=``,r=0;for(;r<t.length;){let e=!1;for(let i=u;i>=1;i--){let a=t.slice(r,r+i).join(``);if(a in l){n+=l[a],r+=i,e=!0;break}}e||(n+=t[r],r++)}return n}var f=[{label:`Segoe UI Historic`,family:`"Segoe UI Historic"`},{label:`Noto Sans Phoenician (system)`,family:`"Noto Sans Phoenician"`},{label:`Noto Sans Phoenician (bundled)`,family:`"Noto Sans Phoenician Local"`},{label:`inherit`,family:`inherit`}],p=[{value:`ltr`,label:`LTR`},{value:`default`,label:`Default`},{value:`rtl`,label:`RTL`}];function m(){let[e,t]=(0,o.useState)(``),[n,r]=(0,o.useState)(48),[i,a]=(0,o.useState)(`default`),[c,l]=(0,o.useState)({}),u=e=>l(t=>({...t,[e]:!t[e]})),m=(0,o.useMemo)(()=>d(e),[e]),h=i==="default"?{}:{direction:i,unicodeBidi:`bidi-override`};return(0,s.jsxs)(`div`,{className:`container py-4`,children:[(0,s.jsx)(`h4`,{className:`mb-3`,children:`Phoenician/Paleo Hebrew Font Renderer`}),(0,s.jsxs)(`div`,{className:`mb-3`,children:[(0,s.jsx)(`label`,{className:`form-label`,children:`Latin transliteration`}),(0,s.jsx)(`textarea`,{className:`form-control font-monospace`,placeholder:`e.g.  'bgdhw`,rows:3,value:e,onChange:e=>t(e.target.value),autoFocus:!0})]}),(0,s.jsxs)(`div`,{className:`mb-3 d-flex align-items-center gap-3 flex-wrap`,children:[(0,s.jsxs)(`label`,{className:`form-label mb-0 text-nowrap`,children:[`Font size: `,n,`px`]}),(0,s.jsx)(`input`,{type:`range`,className:`form-range flex-grow-1`,min:12,max:128,value:n,onChange:e=>r(Number(e.target.value))})]}),(0,s.jsxs)(`div`,{className:`mb-4 d-flex align-items-center gap-3`,children:[(0,s.jsx)(`span`,{className:`form-label mb-0`,children:`Direction:`}),(0,s.jsx)(`div`,{className:`btn-group`,role:`group`,children:p.map(({value:e,label:t})=>(0,s.jsxs)(`label`,{className:`btn btn-sm ${i===e?`btn-primary`:`btn-outline-secondary`}`,children:[(0,s.jsx)(`input`,{type:`radio`,className:`btn-check`,name:`direction`,checked:i===e,onChange:()=>a(e)}),t]},e))})]}),(0,s.jsx)(`div`,{className:`row g-3`,children:f.map(({label:e,family:t})=>{let r=c[e];return(0,s.jsx)(`div`,{className:`col-12`,children:(0,s.jsxs)(`div`,{className:`card`,children:[(0,s.jsxs)(`button`,{type:`button`,className:`card-header d-flex justify-content-between align-items-center w-100 border-0 bg-transparent text-start`,onClick:()=>u(e),"aria-expanded":!r,children:[(0,s.jsx)(`code`,{children:e}),(0,s.jsx)(`span`,{className:`text-muted`,children:r?`▸`:`▾`})]}),!r&&(0,s.jsx)(`div`,{className:`card-body`,style:{fontFamily:t,fontSize:`${n}px`,lineHeight:1.6,overflowX:`auto`,minHeight:`4rem`,wordBreak:`break-all`,whiteSpace:`pre-wrap`,...h},children:m||(0,s.jsx)(`span`,{className:`text-muted`,style:{fontSize:`1rem`},children:`type something above…`})})]})},e)})}),(0,s.jsx)(`h3`,{children:`Transliteration reference`}),(0,s.jsxs)(`div`,{className:`row mt-2 font-monospace`,style:{fontSize:`0.85rem`},children:[(0,s.jsxs)(`div`,{className:`col-md-6`,children:[(0,s.jsx)(`h6`,{children:`Consonants`}),(0,s.jsx)(`pre`,{className:`mb-0`,children:`'  → 𐤀 ALF       b → 𐤁 BET       g → 𐤂 GAML
d  → 𐤃 DELT      h → 𐤄 HE        w → 𐤅 WAU
z  → 𐤆 ZAYIN     x → 𐤇 HET       T → 𐤈 TET
y  → 𐤉 YOD       k → 𐤊 KAF       l → 𐤋 LAMD
m  → 𐤌 MEM       n → 𐤍 NUN       s → 𐤎 SEMK
A  → 𐤏 AIN       p → 𐤐 PE        S → 𐤑 SADE
q  → 𐤒 QOF       r → 𐤓 ROSH      j → 𐤔 SHIN
t  → 𐤕 TAW`})]}),(0,s.jsxs)(`div`,{className:`col-md-3`,children:[(0,s.jsx)(`h6`,{children:`Numbers`}),(0,s.jsx)(`pre`,{className:`mb-0`,children:`a → 𐤖 ONE
i → 𐤗 TEN
u → 𐤘 TWENTY
o → 𐤙 HUNDRED`})]}),(0,s.jsxs)(`div`,{className:`col-md-3`,children:[(0,s.jsx)(`h6`,{children:`Diacritics`}),(0,s.jsx)(`pre`,{className:`mb-0`,children:`0  → ◌̣  DOT BELOW
1  → ◌̇  DOT ABOVE
2  → ◌̈  DIAERESIS
3  → ◌᪴  TRIPLE DOT
-  → ◌̄  MACRON
_  → ◌̱  UNDERMACRON
v  → ◌̌  CARON
^  → ◌̂  CIRCUMFLEX
1a → ◌َ  FATHA
2a → ◌ِ  KASRA
3a → ◌ُ  DAMMA
1h → ◌ַ  PATACH
2h → ◌ִ  HIRIQ
3h → ◌ֻ  QUBUTS
|  → 𐤟  WORD SEP`})]})]})]})}(0,c.createRoot)(document.getElementById(`root`)).render((0,s.jsx)(o.StrictMode,{children:(0,s.jsx)(()=>(0,s.jsx)(a,{children:(0,s.jsx)(m,{})}),{})}));