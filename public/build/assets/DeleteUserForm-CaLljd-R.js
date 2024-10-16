import{j as e,r as d,W as w}from"./app-DluYvmMS.js";import{T as j,I as b}from"./InputError-BMSeMhlH.js";import{I as N}from"./InputLabel-DrouqnrB.js";import{M as v}from"./Modal-C26-05M4.js";import"./transition-CUrzPnAE.js";function u({className:o="",disabled:t,children:s,...r}){return e.jsx("button",{...r,className:`inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${t&&"opacity-25"} `+o,disabled:t,children:s})}function D({type:o="button",className:t="",disabled:s,children:r,...n}){return e.jsx("button",{...n,type:o,className:`inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${s&&"opacity-25"} `+t,disabled:s,children:r})}function U({className:o=""}){const[t,s]=d.useState(!1),r=d.useRef(null),{data:n,setData:m,delete:p,processing:f,reset:c,errors:x,clearErrors:y}=w({password:""}),g=()=>{s(!0)},h=l=>{l.preventDefault(),p(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>a(),onError:()=>{var i;return(i=r.current)==null?void 0:i.focus()},onFinish:()=>c()})},a=()=>{s(!1),y(),c()};return e.jsxs("section",{className:`space-y-6 ${o}`,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Delete Account"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e.jsx(u,{onClick:g,children:"Delete Account"}),e.jsx(v,{show:t,onClose:a,children:e.jsxs("form",{onSubmit:h,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Are you sure you want to delete your account?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(N,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(j,{id:"password",type:"password",name:"password",ref:r,value:n.password,onChange:l=>m("password",l.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e.jsx(b,{message:x.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(D,{onClick:a,children:"Cancel"}),e.jsx(u,{className:"ms-3",disabled:f,children:"Delete Account"})]})]})})]})}export{U as default};