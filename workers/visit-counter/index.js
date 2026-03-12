// Main Worker entry point
import { handleVisitCounter } from './src/visit-counter.js'
import { handleGitHubApi, recordDailyStars } from './src/github-api.js'
import { handleTrackingScript } from './src/tracking-script.js'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default {
  async fetch(request, env) {
    const method = request.method

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: cors })
    }

    // Route to appropriate handler
    let result = await handleVisitCounter(request, env, cors)
    if (result) return result

    result = await handleGitHubApi(request, env, cors)
    if (result) return result

    result = await handleTrackingScript(request, env, cors)
    if (result) return result

    return new Response('Not Found', { status: 404 })
  },

  async scheduled(event, env, ctx) {
    // Cron trigger: record stars daily
    ctx.waitUntil(recordDailyStars(env))
  },
}
