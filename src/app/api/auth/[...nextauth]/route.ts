// Fallback handlers to avoid missing import error for ../../../../auth
export const GET = async () => new Response('Not Implemented', { status: 501 });
export const POST = GET;