// Cloudflare Worker - Visit Counter (KV)

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // POST /api/track
    if (path === '/api/track' && method === 'POST') {
      try {
        const text = await request.text()
        let page = 'home'
        try {
          page = JSON.parse(text).page || 'home'
        } catch (e) {}

        const today = new Date().toISOString().split('T')[0]

        let total = 0
        let todayCount = 0
        try {
          total = parseInt(await env.VISIT_COUNTER.get('total') || '0', 10)
        } catch (e) { total = 0 }

        try {
          todayCount = parseInt(await env.VISIT_COUNTER.get('today_' + today) || '0', 10)
        } catch (e) { todayCount = 0 }

        total = (total || 0) + 1
        todayCount = (todayCount || 0) + 1

        try {
          await env.VISIT_COUNTER.put('total', String(total))
          await env.VISIT_COUNTER.put('today_' + today, String(todayCount))
        } catch (e) {
          return new Response(JSON.stringify({ error: 'KV put failed: ' + e.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
        }

        return new Response(JSON.stringify({ success: true, total }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
      }
    }

    // GET / or /api
    if (path === '/' || path === '/api') {
      const today = new Date().toISOString().split('T')[0]
      let total = 0
      let todayCount = 0

      try {
        total = parseInt(await env.VISIT_COUNTER.get('total') || '0', 10)
      } catch (e) { total = 0 }

      try {
        todayCount = parseInt(await env.VISIT_COUNTER.get('today_' + today) || '0', 10)
      } catch (e) { todayCount = 0 }

      return new Response(JSON.stringify({ total: total || 0, today: todayCount || 0, date: today }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // /script.js
    if (path === '/script.js') {
      const script = `(function() {
  var page = window.location.pathname || 'home';
  fetch('https://librefang-counter.suzukaze-haduki.workers.dev/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page: page }),
    keepalive: true
  }).catch(function() {});
})();`
      return new Response(script, {
        headers: { 'Content-Type': 'application/javascript', ...corsHeaders }
      })
    }

    return new Response('Not Found', { status: 404 })
  }
}
