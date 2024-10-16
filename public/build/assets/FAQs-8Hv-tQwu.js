import{j as e,r as l}from"./app-DluYvmMS.js";import{H as c,u as x,g as n,S as d,a as p}from"./NavBar-6jLtu9tu.js";import{C as h}from"./chevron-down-DY3uFSBh.js";const g=({rating:o})=>{const t=Array.from({length:o},(r,s)=>e.jsx("div",{className:"inline-block bg-background-secondary border border-border rounded-full p-[9px]",children:e.jsx("svg",{className:"",width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M8.15861 1.30996C8.55219 0.697193 9.44781 0.697195 9.84139 1.30996L12.1986 4.97987C12.334 5.19071 12.5436 5.34302 12.786 5.40666L17.0047 6.51442C17.7091 6.69938 17.9859 7.55117 17.5247 8.11484L14.7628 11.4907C14.6042 11.6847 14.5241 11.9311 14.5385 12.1813L14.7886 16.5358C14.8303 17.2629 14.1058 17.7893 13.4272 17.5249L9.36304 15.9415C9.12956 15.8505 8.87044 15.8505 8.63696 15.9415L4.57282 17.5249C3.89423 17.7893 3.16966 17.2629 3.21142 16.5358L3.46153 12.1813C3.4759 11.9311 3.39582 11.6847 3.23716 11.4907L0.475274 8.11484C0.0141247 7.55117 0.290888 6.69938 0.995283 6.51442L5.21399 5.40666C5.45636 5.34302 5.66599 5.19071 5.80141 4.97987L8.15861 1.30996Z",fill:"#FFE600"})})},s));return e.jsx("div",{className:"flex gap-2",children:t})},f=({name:o,location:t,title:r,description:s,rating:a,image:i})=>e.jsxs("div",{className:"flex flex-col gap-6 border border-border p-7 rounded-lg max-w-[413px] lg:p-10 hover:scale-105 hover:bg-background-secondary/30 transition-all",children:[e.jsx(g,{rating:a}),e.jsxs("div",{className:"flex flex-col gap-[6px]",children:[e.jsx("h3",{className:"text-lg font-semibold lg:text-xl",children:r}),e.jsx("p",{className:"text-sm font-medium lg:text-lg",children:s})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("img",{loading:"lazy",src:i,alt:o,className:"rounded-full w-12 h-12 object-cover"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-base font-medium lg:text-lg",children:o}),e.jsx("p",{className:"text-txt text-sm font-medium lg:text-base",children:t})]})]})]}),u=x,b=()=>{const[o,t]=l.useState([]),r=()=>{const s=window.innerWidth;let a;s<640?a=1:s<800?a=2:s>=1024&&(a=3),t(u.slice(0,a))};return l.useEffect(()=>(r(),window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}),[]),e.jsx("div",{children:e.jsxs("section",{className:"container py-20 pt-10",children:[e.jsx(c,{title:"What Our Clients Say",description:"Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose IsaacBestProperties for their real estate needs.",showAbstract:!0}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 mt-10",children:o.map(s=>l.createElement(f,{...s,key:s.name}))})]})})},j=({title:o,content:t,className:r})=>{const[s,a]=l.useState(!1),i=()=>{a(m=>!m)};return e.jsxs("div",{className:`${r} parent md:max-w-[360px] w-full`,children:[e.jsxs("div",{className:"flex items-center pt-3 gap-5 border-b border-gray-600 cursor-pointer",onClick:i,children:[e.jsx("h1",{className:"text-lg font-semibold pb-2",children:o}),e.jsx("div",{className:"w-[24px] h-[24px]",children:e.jsx(h,{className:`transform transition-transform ${s?"rotate-180":""}`})})]}),e.jsx("div",{className:`accord pt-1 ${s?"":"hidden"}`,children:e.jsx("p",{className:"text-sm mt-2",children:t})})]})};n.registerPlugin(d);const N=()=>{const o=l.useRef(null);return l.useEffect(()=>{const t=o.current;return t&&(n.fromTo(t.querySelector(".header"),{opacity:0,y:20},{opacity:1,y:0,duration:1,scrollTrigger:{trigger:t.querySelector(".header"),start:"top 80%",toggleActions:"play none none reverse"}}),t.querySelectorAll(".accordion").forEach((s,a)=>{n.fromTo(s,{opacity:0,y:20},{opacity:1,y:0,duration:.5,delay:a*.1,scrollTrigger:{trigger:s,start:"top 80%",toggleActions:"play none none reverse"}})})),()=>{d.getAll().forEach(r=>r.kill())}},[]),e.jsxs("section",{className:"container pb-20",ref:o,children:[e.jsx("div",{className:"mb-7",children:e.jsx(c,{title:"Frequently Asked Questions",description:"Find answers to common questions about IsaacBestProperties's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way.",showAbstract:!0})}),e.jsx("div",{className:"flex flex-col items-center justify-between gap-4 md:flex-row md:flex-wrap w-full",children:p.map(({question:t,answer:r})=>e.jsx(j,{title:t,content:r,className:"accordion"},t))})]})};export{N as F,b as T};
