export function wrapWithTracking(html: string, email: string, day: number, origin: string) {
  const trackingUrl = new URL('/api/track', origin);
  trackingUrl.searchParams.append('email', email);
  trackingUrl.searchParams.append('day', day.toString());
  
  const pixel = `<img src="${trackingUrl.toString()}" width="1" height="1" style="display:none">`;
  return html + pixel;
}
