// Messages for the error page. 404.astro and 500.astro render one code each
// at build time; /error/?code=NNN picks one at runtime.
export const ERRORS: Record<string, { title: string; msg: string }> = {
  '400': { title: 'Bad Request', msg: "That request didn't make sense to the server. Check the link and try again." },
  '401': { title: 'Unauthorized', msg: 'You need to sign in to see this page.' },
  '403': { title: 'Forbidden', msg: "You don't have permission to see this page." },
  '404': { title: 'Not Found', msg: 'This page took a wrong turn in the repo. Try a search or head home.' },
  '408': { title: 'Request Timeout', msg: 'The server got tired of waiting. Try again.' },
  '429': { title: 'Too Many Requests', msg: "You're going a bit fast. Wait a moment and try again." },
  '500': { title: 'Server Error', msg: 'Something broke on our end. Try again in a bit.' },
  '502': { title: 'Bad Gateway', msg: 'A server upstream sent back something we did not expect. Try again in a bit.' },
  '503': { title: 'Service Unavailable', msg: "We're down for maintenance or overloaded. Try again in a bit." },
};
