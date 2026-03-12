// Cloudflare Worker - Visit Counter
// 部署: wrangler deploy

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // GET / - 返回所有页面总访问量
    if (path === '/' || path === '/api') {
      const total = await env.VISIT_COUNTER.get('total', 'number') || 0
      const today = await env.VISIT_COUNTER.get(`today_${getDateKey()}`, 'number') || 0
      return new Response(JSON.stringify({ total, today, date: getDateKey() }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // GET /api/:page - 返回指定页面访问量
    if (path.startsWith('/api/')) {
      const page = path.replace('/api/', '') || 'home'
      const count = await env.VISIT_COUNTER.get(`page_${page}`, 'number') || 0
      const pageToday = await env.VISIT_COUNTER.get(`page_${page}_${getDateKey()}`, 'number') || 0
      return new Response(JSON.stringify({ page, total: count, today: pageToday }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // POST /api/track - 记录访问
    if (path === '/api/track' && request.method === 'POST') {
      try {
        const body = await request.json()
        const page = body.page || 'home'

        // 原子递增
        await env.VISIT_COUNTER.put('total', String((await env.VISIT_COUNTER.get('total', 'number') || 0) + 1))
        await env.VISIT_COUNTER.put(`today_${getDateKey()}`, String((await env.VISIT_COUNTER.get(`today_${getDateKey()}`, 'number') || 0) + 1))
        await env.VISIT_COUNTER.put(`page_${page}`, String((await env.VISIT_COUNTER.get(`page_${page}`, 'number') || 0) + 1))
        await env.VISIT_COUNTER.put(`page_${page}_${getDateKey()}`, String((await env.VISIT_COUNTER.get(`page_${page}_${getDateKey()}`, 'number') || 0) + 1))

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
    }

    // 返回跟踪脚本
    if (path === '/script.js') {
      const script = `
(function() {
  var page = window.location.pathname || 'home';
  fetch('https://librefang-counter.workers.dev/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page: page }),
    keepalive: true
  }).catch(() => {});
})();
      `
      return new Response(script, {
        headers: { ...corsHeaders, 'Content-Type': 'application/javascript' }
      })
    }

    return new Response('Not Found', { status: 404 })
  }
}

function getDateKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}
