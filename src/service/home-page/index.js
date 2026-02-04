const server = process.env.API_ADDRESS

export const getAllTool = async () => {
  try {
    const res = await fetch(`${server}/api/home-page/all-tool`, {
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