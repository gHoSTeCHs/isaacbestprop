import{W as N,j as e,Y as C}from"./app-DluYvmMS.js";import{A as w,B as k}from"./AuthenticatedLayout-CzBciLRy.js";import{I as l}from"./InputLabel-DrouqnrB.js";import{T as n,I as m}from"./InputError-BMSeMhlH.js";import{T as F,M as A}from"./TextArea-Pin7E1eM.js";import{P as _}from"./PrimaryButton-Cr1G7A3Z.js";import{S as I}from"./select-CLhX4tz-.js";import{z as t}from"./index-DXqQCM1T.js";import"./ApplicationLogo-CUzsqygN.js";import"./transition-CUrzPnAE.js";import"./createLucideIcon-B09UvLv5.js";import"./chevron-down-DY3uFSBh.js";t.object({title:t.string(),category:t.string(),description:t.string(),amenities:t.array(t.object({value:t.string()})),location:t.string(),bathrooms:t.string(),bedrooms:t.string(),price:t.string(),video_url:t.string(),sold:t.boolean(),images:t.array(t.union([t.instanceof(File),t.string()]))});const V=({categories:u})=>{const x=s=>{o("images",s)},{data:a,setData:o,post:g,processing:h,errors:i,reset:p}=N({title:"",category:"",description:"",amenities:[{value:""}],location:"",bathrooms:"",bedrooms:"",price:"",video_url:"",sold:!1,images:[]});let d=[];u.forEach(s=>{d.push(s.title)});const v=()=>{o("amenities",[...a.amenities,{value:""}])},j=s=>{const r=a.amenities.filter((c,y)=>y!==s);o("amenities",r)},b=(s,r)=>{const c=[...a.amenities];c[s].value=r.target.value,o("amenities",c)},f=s=>{s.preventDefault(),g(route("admin.create"),{onSuccess:()=>{p("title","category","description","amenities","location","bathrooms","bedrooms","price","video_url","sold","images"),k.success("Property created successfully!")}})};return e.jsxs(w,{header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800",children:"Create"}),children:[e.jsx(C,{title:"Dashboard"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:e.jsx("div",{className:"overflow-hidden bg-white shadow-sm sm:rounded-lg p-4",children:e.jsx("div",{className:"flex flex-col gap-4 container max-w-[600px]",children:e.jsxs("form",{className:"flex flex-col gap-4",onSubmit:f,encType:"multipart/form-data",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"title",value:"Title"}),e.jsx(n,{id:"title",type:"text",name:"title",value:a.title,className:"mt-1 block w-full",autoComplete:"title",isFocused:!0,onChange:s=>o("title",s.target.value)}),e.jsx(m,{message:i.title,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"categoryId",value:"Category"}),e.jsx(I,{id:"Categories",name:"category",onChange:s=>o("category",s),title:"category",values:d}),e.jsx(m,{message:i.category,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"description",value:"Description"}),e.jsx(F,{name:"description",className:"mt-1 block w-full",autoComplete:"description",onChange:s=>o("description",s.target.value)}),e.jsx(m,{message:i.description,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"amenities",value:"Amenities"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[a.amenities.map((s,r)=>e.jsxs("div",{className:"flex gap-2",children:[e.jsx(n,{id:`amenity-${r}`,type:"text",name:`amenities[${r}].value`,value:s.value,onChange:c=>b(r,c),placeholder:"Enter an amenity",className:"block w-full"}),e.jsx("button",{type:"button",onClick:()=>j(r),className:"bg-red-500 text-white p-2 rounded",children:"Remove"})]},r)),e.jsx("button",{type:"button",onClick:v,className:"mt-2 bg-blue-500 text-white p-2 rounded",children:"Add Amenity"}),i.amenities&&e.jsx(m,{message:i.amenities,className:"mt-2"})]})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"location",value:"Location"}),e.jsx(n,{id:"location",type:"text",name:"location",value:a.location,className:"mt-1 block w-full",autoComplete:"location",onChange:s=>o("location",s.target.value)}),e.jsx(m,{message:i.location,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"bathrooms",value:"Bathrooms"}),e.jsx(n,{id:"bathrooms",type:"text",name:"bathrooms",value:a.bathrooms,className:"mt-1 block w-full",autoComplete:"bathrooms",onChange:s=>o("bathrooms",s.target.value)}),e.jsx(m,{message:i.bathrooms,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"bedrooms",value:"Bedrooms"}),e.jsx(n,{id:"bedrooms",type:"text",name:"bedrooms",value:a.bedrooms,className:"mt-1 block w-full",autoComplete:"bedrooms",onChange:s=>o("bedrooms",s.target.value)}),e.jsx(m,{message:i.bedrooms,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"price",value:"Price"}),e.jsx(n,{id:"price",type:"text",name:"price",value:a.price,className:"mt-1 block w-full",autoComplete:"price",onChange:s=>o("price",s.target.value)}),e.jsx(m,{message:i.price,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"video_url",value:"Video URL"}),e.jsx(n,{id:"video_url",type:"text",name:"video_url",value:a.video_url,className:"mt-1 block w-full",autoComplete:"video_url",onChange:s=>o("video_url",s.target.value)}),e.jsx(m,{message:i.video_url,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"sold",value:"Sold"}),e.jsx("input",{id:"sold",name:"sold",type:"checkbox",checked:a.sold,onChange:s=>o({...a,sold:s.target.checked}),className:"mt-1"})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"images",value:"Images"}),e.jsx(A,{id:"images",name:"images",value:a.images,onChange:x}),e.jsx(m,{message:i.images,className:"mt-2"})]}),e.jsx("div",{className:"inline-block",children:e.jsx(_,{className:"ms-4",disabled:h,children:"Submit"})})]})})})})})]})};export{V as default};
