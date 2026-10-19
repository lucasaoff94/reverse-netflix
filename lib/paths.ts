/** Next Link/router add basePath themselves; native asset URLs/forms do not. */
export function publicPath(path: string): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "") + path;
}
