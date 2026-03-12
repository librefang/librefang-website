// Cloudflare Worker - Visit Counter (KV) + GitHub API Proxy

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

    // GET /api/github - GitHub stats proxy
    if (path === '/api/github' && method === 'GET') {
      try {
        const cacheKey = 'github_stats_cache_v6'
        const cacheTimeKey = 'github_stats_time_v6'
        const cacheDuration = 1000 * 60 * 30 // 30 minutes

        let cachedData = null
        let cacheTime = 0

        try {
          cachedData = await env.VISIT_COUNTER.get(cacheKey)
          const cacheTimeStr = await env.VISIT_COUNTER.get(cacheTimeKey)
          cacheTime = parseInt(cacheTimeStr || '0', 10)
        } catch (e) {}

        // Return cached data if still valid
        if (cachedData && cacheTime && (Date.now() - cacheTime < cacheDuration)) {
          return new Response(cachedData, {
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }

        // Fetch fresh data from GitHub
        const fetchHeaders = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'LibrefangCounter/1.0',
        }

        if (env.GITHUB_TOKEN) {
          fetchHeaders['Authorization'] = `token ${env.GITHUB_TOKEN}`
        }

        const [repoRes, releasesRes] = await Promise.all([
          fetch('https://api.github.com/repos/librefang/librefang', { headers: fetchHeaders }),
          fetch('https://api.github.com/repos/librefang/librefang/releases?per_page=10', { headers: fetchHeaders }),
        ])

        let repoJson = {}
        let releasesData = []

        try {
          if (repoRes.ok) {
            repoJson = await repoRes.json()
          }
        } catch (e) {
          repoJson = { error: 'Failed to parse repo response' }
        }

        try {
          if (releasesRes.ok) {
            releasesData = await releasesRes.json()
          }
        } catch (e) {
          releasesData = []
        }

        const totalDownloads = releasesData.reduce((sum, rel) => {
          const assetDownloads = rel.assets?.reduce((s, a) => s + (a.download_count || 0), 0) || 0
          return sum + assetDownloads
        }, 0)

        const result = {
          stars: repoJson.stargazers_count || 0,
          forks: repoJson.forks_count || 0,
          issues: repoJson.open_issues_count || 0,
          lastUpdate: repoJson.updated_at || '',
          downloads: totalDownloads,
        }

        const jsonStr = JSON.stringify(result)

        // Cache the result
        try {
          await env.VISIT_COUNTER.put(cacheKey, jsonStr)
          await env.VISIT_COUNTER.put(cacheTimeKey, String(Date.now()))
        } catch (e) {
          // Cache write failed
        }

        return new Response(jsonStr, {
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
