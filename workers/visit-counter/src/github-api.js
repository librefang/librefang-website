// GitHub API module

export const handleGitHubApi = async (request, env, cors) => {
  const url = new URL(request.url)
  const path = url.pathname

  // GET /api/github
  if (path === '/api/github' && request.method === 'GET') {
    return handleGitHubStats(request, env, cors)
  }

  return null
}

export const recordDailyStars = async (env) => {
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

async function handleGitHubStats(request, env, cors) {
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
