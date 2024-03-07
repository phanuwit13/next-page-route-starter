import { match } from 'path-to-regexp'

export function urlMatch(pattern: string, path: string) {
  return match(pattern, { decode: decodeURIComponent })(path)
}
