export const formatUrl = (url: string): string =>
  url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').replace(/\/$/, '')
