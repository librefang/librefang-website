// Cloudflare Worker - Visit Counter (KV) + GitHub API Proxy

/**
 * Scheduled handler - runs daily via cron to record star history
 */
export default {
  async fetch(request, env) {
    return handleFetch(request, env)
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(recordDailyStars(env))
  },
}

/**
 * Record today's star count to KV for historical tracking
 */
async function recordDailyStars(env) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'LibrefangCounter/1.0',
  }

  if (env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${env.GITHUB_TOKEN}`
  }

  try {
    const res = await fetch('https://api.github.com/repos/librefang/librefang', { headers })
    if (res.ok) {
      const data = await res.json()
      const today = new Date().toISOString().split('T')[0]
      await env.VISIT_COUNTER.put('stars_' + today, String(data.stargazers_count || 0))
      console.log('Recorded stars:', today, data.stargazers_count)
    }
  } catch (e) {
    console.error('Failed to record stars:', e.message)
  }
}

/**
 * Main HTTP request handler
 */
function handleFetch(request, env) {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method

  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (method === 'OPTIONS') {
    return new Response(null, { headers: cors })
  }

  // POST /api/track - track page visit
  if (path === '/api/track' && method === 'POST') {
    return handleTrack(request, env, cors)
  }

  // GET /api/github - get GitHub stats with history
  if (path === '/api/github' && method === 'GET') {
    return handleGitHubStats(env, cors)
  }

  // GET /api - get visit counter
  if (path === '/' || path === '/api') {
    return handleVisits(env, cors)
  }

  // GET /script.js - tracking script
  if (path === '/script.js') {
    return handleScript(env, cors)
  }

  return new Response('Not Found', { status: 404 })
}

/**
 * Handle visit tracking
 */
async function handleTrack(request, env, cors) {
  try {
    const text = await request.text()
    let page = 'home'
    try {
      page = JSON.parse(text).page || 'home'
    } catch (e) {}

    const today = new Date().toISOString().split('T')[0]

    let total = parseInt(await env.VISIT_COUNTER.get('total') || '0', 10) || 0
    let todayCount = parseInt(await env.VISIT_COUNTER.get('today_' + today) || '0', 10) || 0

    total++
    todayCount++

    await env.VISIT_COUNTER.put('total', String(total))
    await env.VISIT_COUNTER.put('today_' + today, String(todayCount))

    return new Response(JSON.stringify({ success: true, total }), {
      headers: { 'Content-Type': 'application/json', ...cors }
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...cors }
    })
  }
}

/**
 * Handle GitHub stats API with caching and history
 */
async function handleGitHubStats(env, cors) {
  const cacheKey = 'github_stats'
  const cacheTimeKey = 'github_stats_time'
  const cacheDuration = 1000 * 60 * 30 // 30 minutes

  try {
    // Check cache
    const cached = await env.VISIT_COUNTER.get(cacheKey)
    const cacheTime = parseInt(await env.VISIT_COUNTER.get(cacheTimeKey) || '0', 10)

    if (cached && cacheTime && (Date.now() - cacheTime < cacheDuration)) {
      return new Response(cached, {
        headers: { 'Content-Type': 'application/json', ...cors }
      })
    }

    // Fetch from GitHub
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'LibrefangCounter/1.0',
    }

    if (env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${env.GITHUB_TOKEN}`
    }

    const [repoRes, releasesRes] = await Promise.all([
      fetch('https://api.github.com/repos/librefang/librefang', { headers }),
      fetch('https://api.github.com/repos/librefang/librefang/releases?per_page=10', { headers }),
    ])

    const repo = repoRes.ok ? await repoRes.json() : {}
    const releases = releasesRes.ok ? await releasesRes.json() : []

    const downloads = releases.reduce((sum, rel) => {
      return sum + (rel.assets?.reduce((s, a) => s + (a.download_count || 0), 0) || 0)
    }, 0)

    // Record today's stars for history
    const today = new Date().toISOString().split('T')[0]
    await env.VISIT_COUNTER.put('stars_' + today, String(repo.stargazers_count || 0))

    // Get last 30 days history
    const history = []
    for (let i = 0; i < 30; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const stars = await env.VISIT_COUNTER.get('stars_' + dateStr)
      if (stars) {
        history.push({ date: dateStr, stars: parseInt(stars, 10) })
      }
    }

    const result = {
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      issues: repo.open_issues_count || 0,
      lastUpdate: repo.updated_at || '',
      createdAt: repo.created_at || '',
      downloads,
      starHistory: history.reverse(),
    }

    const json = JSON.stringify(result)

    // Cache
    await env.VISIT_COUNTER.put(cacheKey, json)
    await env.VISIT_COUNTER.put(cacheTimeKey, String(Date.now()))

    return new Response(json, {
      headers: { 'Content-Type': 'application/json', ...cors }
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...cors }
    })
  }
}

/**
 * Handle visit counter API
 */
async function handleVisits(env, cors) {
  const today = new Date().toISOString().split('T')[0]
  const total = parseInt(await env.VISIT_COUNTER.get('total') || '0', 10) || 0
  const todayCount = parseInt(await env.VISIT_COUNTER.get('today_' + today) || '0', 10) || 0

  return new Response(JSON.stringify({ total, today: todayCount, date: today }), {
    headers: { 'Content-Type': 'application/json', ...cors }
  })
}

/**
 * Handle tracking script
 */
function handleScript(env, cors) {
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
    headers: { 'Content-Type': 'application/javascript', ...cors }
  })
}
