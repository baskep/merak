import { useEffect, useState } from 'react'
import { getToolInfo } from '@/service/common'

const useToolInfo = () => {
  const [toolInfo, setToolInfo] = useState()

  const getToolInfoRes = async () => {
    const res = await getToolInfo(location.pathname)
    console.log(res)
  }

  useEffect(() => {
    if (location.pathname) {
      getToolInfoRes()
    }
  }, [location.pathname])

  return [toolInfo]
}

export { useToolInfo }