document.addEventListener("DOMContentLoaded",()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const groups=$$(".nav-group");
groups.forEach(group=>{const button=$("button",group);button?.addEventListener("click",e=>{e.stopPropagation();groups.forEach(g=>g!==group&&g.classList.remove("open"));group.classList.toggle("open")})});
document.addEventListener("click",()=>groups.forEach(g=>g.classList.remove("open")));
document.addEventListener("keydown",e=>{if(e.key==="Escape")groups.forEach(g=>g.classList.remove("open"))});
const menu=$(".mobile-menu"),toggle=$(".menu-toggle"),close=$(".mobile-close"),more=$(".bottom-more");
const openMenu=()=>{menu?.classList.add("open");document.body.classList.add("mobile-open");toggle?.setAttribute("aria-expanded","true")};
const closeMenu=()=>{menu?.classList.remove("open");document.body.classList.remove("mobile-open");toggle?.setAttribute("aria-expanded","false")};
toggle?.setAttribute("aria-expanded","false");toggle?.addEventListener("click",openMenu);close?.addEventListener("click",closeMenu);more?.addEventListener("click",openMenu);
menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
const top=$(".back-top");if(top){const state=()=>top.classList.toggle("show",scrollY>420);addEventListener("scroll",state,{passive:true});state();top.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}))}
const params=new URLSearchParams(location.search);const requested=params.get("product");const productSelect=$('.order-form select[name="product"]');if(requested&&productSelect){const option=[...productSelect.options].find(o=>o.textContent.trim()===requested);if(option)productSelect.value=option.value}
$$(".order-form").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form),product=d.get("product")||"برنج پلاتیم",weight=d.get("weight")||"",qty=d.get("qty")||"",name=d.get("name")||"",phone=d.get("phone")||"",city=d.get("city")||"",note=d.get("note")||"";const subject=encodeURIComponent("درخواست سفارش پلاتیم - "+product);const body=encodeURIComponent("سلام پلاتیم،\n\nدرخواست سفارش:\nمحصول: "+product+"\nوزن: "+weight+"\nتعداد: "+qty+"\nنام: "+name+"\nتلفن: "+phone+"\nشهر: "+city+"\nتوضیحات: "+note);location.href="mailto:info@platim.ir?subject="+subject+"&body="+body}));
});