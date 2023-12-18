const filterXSS = (str) => {
  return str.replace(/&/g, '&amp;').
    replace(/</g, '&lt;').
    replace(/"/g, '&quot;').
    replace(/'/g, '&#039;')
}

const downloadBase64File = (content, fileName) => {
  let blob = base64ToBlob(content)
  const nodeElm = document.createElement('a')
  nodeElm.href = window.URL.createObjectURL(blob)
  nodeElm.style.display = 'none'
  nodeElm.download = fileName
  document.body.appendChild(nodeElm)
  nodeElm.click()
  document.body.removeChild(nodeElm)
}

const base64ToBlob = (code) => {
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1]) // 解码base64得到二进制字符串
  let rawLength = raw.length
  let uInt8Array = new Uint8Array(rawLength) // 创建8位无符号整数值的类型化数组
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i) // 数组接收二进制字符串
  }
  return new Blob([uInt8Array], {
    type: contentType,
  })
}

export {
  downloadBase64File,
  filterXSS,
}