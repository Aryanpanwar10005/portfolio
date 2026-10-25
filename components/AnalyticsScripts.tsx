import Script from "next/script";

// Vercel still has the variables under their old VITE_ names, so read both.
// The IDs are public (they ship in the page HTML anyway), so they also serve as
// a last-resort default: analytics must never silently disappear on deploy.
// The hostname guard below keeps localhost and preview URLs silent regardless.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || process.env.VITE_GA4_ID || "G-L4N43VLPEY";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || process.env.VITE_CLARITY_ID || "xlzqq2x1eo";

// Only the production deployment reports analytics. Preview deployments
// (*.vercel.app) and local dev stay silent so they never pollute the data.
const IS_PRODUCTION = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

// Runtime guard as well: only the live domain reports, never localhost/previews.
// The owner's own browsers opt out too: open any page once with ?notrack=1 and
// that browser stops reporting for good (?notrack=0 turns it back on). Same flag
// as lib/analytics.ts isTrackingOptedOut(), which Vercel Analytics checks.
const ON_LIVE_DOMAIN = `['aryanpanwar.in','www.aryanpanwar.in'].indexOf(location.hostname)>-1&&!(function(){try{var p=new URLSearchParams(location.search).get('notrack');if(p==='1')localStorage.setItem('ap_notrack','1');if(p==='0')localStorage.removeItem('ap_notrack');return localStorage.getItem('ap_notrack')==='1'}catch(e){return false}})()`;

export function AnalyticsScripts() {
  if (!IS_PRODUCTION) return null;

  return (
    <>
      {/*
        GA4 and Microsoft Clarity. The gtag() and clarity() stubs run as soon as
        the page is interactive, so every call is queued and replayed when the
        libraries arrive. The libraries themselves (gtag.js alone blocked the
        main thread for ~0.8s on mobile) load on the first scroll, tap or key
        press, or 4s after window load, whichever comes first.

        GA4 sends the landing page_view itself, with page_location/title/referrer
        captured now, so a late library still records the right landing page.
        Enhanced Measurement ("page changes") records client-side navigations,
        but only once gtag.js has loaded: navigations before that are queued
        here as page_view events. The app must not send its own page_view.
      */}
      {(GA4_ID || CLARITY_ID) && (
        <Script id="analytics-init" strategy="afterInteractive">
          {`if(${ON_LIVE_DOMAIN}){
var GA='${GA4_ID}',CL='${CLARITY_ID}',gaReady=false;
if(GA){window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());
gtag('config',GA,{page_location:location.href,page_title:document.title,page_referrer:document.referrer});
var queueNav=function(){if(gaReady)return;setTimeout(function(){gtag('event','page_view',{page_location:location.href,page_title:document.title})},300)};
var push=history.pushState;history.pushState=function(){var r=push.apply(this,arguments);queueNav();return r};
window.addEventListener('popstate',queueNav)}
if(CL){window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)}}
var started=false,events=['scroll','pointerdown','keydown','touchstart'];
var start=function(){if(started)return;started=true;events.forEach(function(e){removeEventListener(e,start)});
var idle=window.requestIdleCallback||function(f){setTimeout(f,1)};idle(function(){
if(GA){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA;s.onload=function(){gaReady=true};document.head.appendChild(s)}
if(CL){var c=document.createElement('script');c.async=true;c.src='https://www.clarity.ms/tag/'+CL;document.head.appendChild(c)}})};
events.forEach(function(e){addEventListener(e,start,{passive:true})});
var arm=function(){setTimeout(start,4000)};if(document.readyState==='complete'){arm()}else{addEventListener('load',arm)}}`}
        </Script>
      )}
    </>
  );
}
