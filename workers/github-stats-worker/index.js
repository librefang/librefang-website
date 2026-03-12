// GitHub Stats Worker

export default {
  async fetch(request, env) {
    return handleFetch(request, env)
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(recordDailyStars(env))
  },
}

async function recordDailyStars(env) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'LibrefangStats/1.0',
  }

  if (env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${env.GITHUB_TOKEN}`
  }

  try {
    const res = await fetch('https://api.github.com/repos/librefang/librefang', { headers })
    if (res.ok) {
      const data = await res.json()
      const today = new Date().toISOString().split('T')[0]
      await env.KV.put('stars_' + today, String(data.stargazers_count || 0))
      console.log('Recorded stars:', today, data.stargazers_count)
    }
  } catch (e) {
    console.error('Failed to record stars:', e.message)
  }
}

function handleFetch(request, env) {
  const url = new URL(request.url)
  const path = url.pathname

  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: cors })
  }

  // GET /api/github
  if (path === '/api/github' && request.method === 'GET') {
    return handleGitHubStats(env, cors)
  }

  return new Response('Not Found', { status: 404 })
}

async function handleGitHubStats(env, cors) {
  const cacheKey = 'github_stats'
  const cacheTimeKey = 'github_stats_time'
  const cacheDuration = 1000 * 60 * 30 // 30 minutes

  try {
    // Check cache
    const cached = await env.KV.get(cacheKey)
    const cacheTime = parseInt(await env.KV.get(cacheTimeKey) || '0', 10)

    if (cached && cacheTime && (Date.now() - cacheTime < cacheDuration)) {
      return new Response(cached, {
        headers: { 'Content-Type': 'application/json', ...cors }
      })
    }

    // Fetch from GitHub
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'LibrefangStats/1.0',
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

    // Record today's stars
    const today = new Date().toISOString().split('T')[0]
    await env.KV.put('stars_' + today, String(repo.stargazers_count || 0))

    // Get last 30 days history
    const history = []
    for (let i = 0; i < 30; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const stars = await env.KV.get('stars_' + dateStr)
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
    await env.KV.put(cacheKey, json)
    await env.KV.put(cacheTimeKey, String(Date.now()))

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
