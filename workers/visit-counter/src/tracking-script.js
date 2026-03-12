// Tracking script module

export const handleTrackingScript = async (request, env, cors) => {
  const url = new URL(request.url)
  const path = url.pathname

  // GET /script.js
  if (path === '/script.js' && request.method === 'GET') {
    return handleScript(env, cors)
  }

  return null
}

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
