// Search engines show roughly the first 155-160 characters of a description.
// Cut longer copy at a sentence or word boundary instead of letting Google
// truncate it mid-word.
export function metaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const sentenceEnd = cut.lastIndexOf('. ')
  if (sentenceEnd > max * 0.6) return cut.slice(0, sentenceEnd + 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.-]+$/, '') + '…'
}

// Titles render as "<page> | Aryan Panwar" through the layout template.
// Long titles skip the suffix so the page's own words stay visible in results.
export function pageTitle(title: string, maxWithSuffix = 60) {
  return title.length + ' | Aryan Panwar'.length > maxWithSuffix ? { absolute: title } : title
}
