function filterXSS(str) {
  return str.replace(/&/g, '&amp;').
    replace(/</g, '&lt;').
    replace(/"/g, '&quot;').
    replace(/'/g, '&#039;')
}

export {
  filterXSS,
}