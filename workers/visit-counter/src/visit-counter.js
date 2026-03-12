// Visit counter module

export const handleVisitCounter = async (request, env, cors) => {
  const url = new URL(request.url)
  const path = url.pathname

  // POST /api/track
  if (path === '/api/track' && request.method === 'POST') {
    return handleTrack(request, env, cors)
  }

  // GET /api - visit stats
  if (path === '/' || path === '/api') {
    return handleVisits(env, cors)
  }

  // Not handled by this module
  return null
}

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

async function handleVisits(env, cors) {
  const today = new Date().toISOString().split('T')[0]
  const total = parseInt(await env.VISIT_COUNTER.get('total') || '0', 10) || 0
  const todayCount = parseInt(await env.VISIT_COUNTER.get('today_' + today) || '0', 10) || 0

  return new Response(JSON.stringify({ total, today: todayCount, date: today }), {
    headers: { 'Content-Type': 'application/json', ...cors }
  })
}
