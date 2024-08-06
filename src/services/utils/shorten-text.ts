export function shortenText(text: string, target: number) {
  if (!text) return ''
  if (text.length < target - 3) return text

  return text.slice(0, target - 3).concat('...')
}
