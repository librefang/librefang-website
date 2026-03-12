// Cloudflare Worker - Visit Counter (in-memory)

const counters = { total: 0, today: {} }

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
      const text = await request.text()
      let page = 'home'
      try {
        page = JSON.parse(text).page || 'home'
      } catch (e) {}

      const today = new Date().toISOString().split('T')[0]
      counters.total++
      counters.today[today] = (counters.today[today] || 0) + 1

      return new Response(JSON.stringify({ success: true, total: counters.total }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // GET / or /api
    if (path === '/' || path === '/api') {
      const today = new Date().toISOString().split('T')[0]
      return new Response(JSON.stringify({
        total: counters.total,
        today: counters.today[today] || 0,
        date: today
      }), {
        headers: { 'Content-Type': 'application/json' }
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
        headers: { 'Content-Type': 'application/javascript' }
      })
    }

    return new Response('Not Found', { status: 404 })
  }
}
