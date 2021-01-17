export const copyToClipboard = async (content) => {
  if (!content) return false
  try {
    await navigator.clipboard.writeText(content)
    return true;

  } catch (err) {
    return false
  }
}