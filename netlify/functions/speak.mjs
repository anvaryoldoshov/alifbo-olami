// Netlify Function: NeuronAI Uzbek TTS. The secret stays in Netlify environment variables.
const ALLOWED = new Set(["A harfi", "Ajoyib!", "Assalomu alaykum! Alifbo olamiga xush kelibsan!", "Assalomu alaykum! Harflarni birga o‘rganamiz!", "B harfi", "Barakalla!", "Ch harfi", "D harfi", "E harfi", "F harfi", "G harfi", "G‘ harfi", "H harfi", "I harfi", "J harfi", "Juda yaxshi!", "K harfi", "L harfi", "M harfi", "N harfi", "Ng tovushi", "O harfi", "O‘ harfi", "P harfi", "Q harfi", "R harfi", "S harfi", "Sh harfi", "T harfi", "U harfi", "V harfi", "X harfi", "Y harfi", "Z harfi", "Zo‘r!", "anor", "bola", "choynak", "daraxt", "echki", "fil", "gul", "g‘oz", "havo", "ilon", "jo‘ja", "kitob", "lola", "mushuk", "non", "olma", "o‘rik", "piyola", "quyon", "ruchka", "shar", "soat", "tong", "tulki", "uzum", "velosiped", "xat", "yulduz", "zebra"]);
const URL = 'https://my.neuronai.uz/api/v1/tts/synthesize';
export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (Number(request.headers.get('content-length') || 0) > 4096) return new Response('Too large', { status: 413 });
  let text;
  try { const payload = await request.json(); text = payload.text; } catch { return new Response('Invalid JSON', { status: 400 }); }
  if (typeof text !== 'string' || !ALLOWED.has(text)) return new Response('Unsupported speech text', { status: 400 });
  const key = process.env.NEURONAI_API_KEY;
  if (!key) return new Response('NEURONAI_API_KEY not configured in Netlify', { status: 503 });
  const voice = process.env.NEURONAI_VOICE_ID || 'kamron';
  const quality = process.env.NEURONAI_QUALITY || 'standard';
  try {
    const reply = await fetch(URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ voice_id: voice, text, language: 'uz', quality }),
      signal: AbortSignal.timeout(25000),
    });
    if (!reply.ok) { console.error('NeuronAI TTS status', reply.status); return new Response('TTS service unavailable', { status: 502 }); }
    const contentType = reply.headers.get('content-type') || '';
    if (!contentType.includes('audio/')) return new Response('Unexpected TTS response', { status: 502 });
    const audio = await reply.arrayBuffer();
    return new Response(audio, {status: 200, headers: {
      'Content-Type': 'audio/wav',
      'Cache-Control': 'public, max-age=86400, s-maxage=2592000',
      'X-Content-Type-Options': 'nosniff',
    }});
  } catch (e) { console.error('TTS error', e?.message); return new Response('TTS request failed', {status: 502}); }
};
