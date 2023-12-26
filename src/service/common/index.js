export const getToolInfo = async (pathname) => {
  try {
    const res = await fetch(`/api/common/tool-info?pathname=${pathname}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    return data
  } catch (error) {
    console.log('error', error)
  }
}