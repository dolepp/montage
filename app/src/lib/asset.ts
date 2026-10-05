/** Path to a file in /public that also works when the site is served from a sub-path (GitHub Pages). */
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`
