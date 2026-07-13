import { Helmet } from 'react-helmet-async'

// Reads VITE_* env vars at build time. Leave any unset to disable that provider.
// Configure in your project env:
//   VITE_GA4_ID        — e.g. G-XXXXXXX
//   VITE_GTM_ID        — e.g. GTM-XXXXXX
//   VITE_CLARITY_ID    — Microsoft Clarity project ID
//   VITE_POSTHOG_KEY   — PostHog project API key (phc_...)
//   VITE_POSTHOG_HOST  — optional, defaults to https://us.i.posthog.com
const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const POSTHOG_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || 'https://us.i.posthog.com'

export function AnalyticsScripts() {
  const hasAny = GA4_ID || GTM_ID || CLARITY_ID || POSTHOG_KEY
  if (!hasAny) return null

  return (
    <Helmet>
      {/* Google Tag Manager */}
      {GTM_ID && (
        <script>{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</script>
      )}

      {/* Google Analytics 4 (gtag.js) */}
      {GA4_ID && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
      )}
      {GA4_ID && (
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { send_page_view: false });
        `}</script>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <script>{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}</script>
      )}

      {/* PostHog */}
      {POSTHOG_KEY && (
        <script>{`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${POSTHOG_KEY}', { api_host: '${POSTHOG_HOST}', capture_pageview: false });
        `}</script>
      )}
    </Helmet>
  )
}

// GTM <noscript> fallback for users with JS disabled. Render inside <body>.
export function GtmNoScript() {
  if (!GTM_ID) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}