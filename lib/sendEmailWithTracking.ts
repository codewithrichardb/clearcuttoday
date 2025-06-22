export function wrapWithTracking(html: string, email: string, day: number) {
  const pixel = `<img src="https://yourdomain.com/api/track?email=${encodeURIComponent(
    email
  )}&day=${day}" width="1" height="1" style="display:none">`;
  return html + pixel;
}
