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
const ON_LIVE_DOMAIN = `['aryanpanwar.in','www.aryanpanwar.in'].indexOf(location.hostname)>-1`;

export function AnalyticsScripts() {
  if (!IS_PRODUCTION) return null;

  return (
    <>
      {/*
        Google Analytics 4. The gtag() stub and config run as soon as the page
        is interactive, so every call is queued in dataLayer and replayed when
        the (heavy) library arrives later. GA4 sends the landing page_view
        itself, and Enhanced Measurement ("page changes") records client-side
        navigations, so the app must not send its own page_view.
      */}
      {GA4_ID && (
        <>
          {/* The library itself loads after window load + idle (like lazyOnload), live domain only. */}
          <Script id="ga4-init" strategy="afterInteractive">
            {`if(${ON_LIVE_DOMAIN}){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}');
var idle=window.requestIdleCallback||function(f){setTimeout(f,1)};var load=function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA4_ID}';document.head.appendChild(s)};
if(document.readyState==='complete'){idle(load)}else{window.addEventListener('load',function(){idle(load)})}}`}
          </Script>
        </>
      )}

      {/* Microsoft Clarity: heatmaps and session recordings. */}
      {CLARITY_ID && (
        <Script id="clarity-script" strategy="lazyOnload">
          {`if(${ON_LIVE_DOMAIN})(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}
