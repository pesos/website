import { getManifest } from '../lib/terminalContent';

// Static JSON endpoint consumed by the terminal UI
// (src/components/TerminalMode.astro). Emitted as /terminal-content.json.
export function GET() {
  return new Response(JSON.stringify(getManifest()), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
