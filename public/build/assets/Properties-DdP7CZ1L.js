import{j as e,Y as a,a as r}from"./app-DluYvmMS.js";import{P as o}from"./PropertyCard-BaPaEVPm.js";import{N as l,C as c,F as n}from"./NavBar-6jLtu9tu.js";import{T as m,F as d}from"./FAQs-8Hv-tQwu.js";import"./embla-carousel-react.esm-B89gmKdR.js";import"./button-Br83Dw0B.js";import"./chevron-down-DY3uFSBh.js";import"./createLucideIcon-B09UvLv5.js";const v=({properties:t,auth:i})=>e.jsxs(e.Fragment,{children:[e.jsx(l,{auth:i}),e.jsx(a,{title:"Properties"}),e.jsxs("div",{className:"container",children:[e.jsx("p",{className:"my-7 font-bold text-3xl",children:"Properties"}),t.length<1?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"h-screen text-center",children:[e.jsx("h1",{className:"mb-4 text-6xl font-semibold text-red-500",children:"404"}),e.jsx("p",{className:"mb-4 text-lg text-gray-600",children:"No Property found for the selected category"}),e.jsx("div",{className:"animate-bounce",children:e.jsx("svg",{className:"mx-auto h-16 w-16 text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 19l9 2-9-18-9 18 9-2zm0 0v-8"})})}),e.jsxs("p",{className:"mt-4 text-gray-600",children:["Let's get you back ",e.jsx(r,{href:"/properties/categories",className:"text-blue-500",children:"Property Categories"}),"."]})]})}):e.jsx("div",{className:"grid grid-col-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10",children:t.map(s=>e.jsx(r,{className:"w-full",href:`/property/${s.title}`,children:e.jsx(o,{title:s.title,location:s.location,price:s.price,description:s.description,images:s.images},s.id)},s.$id))})]}),e.jsx(m,{}),e.jsx(d,{}),e.jsx(c,{}),e.jsx(n,{})]});export{v as default};