'use client'

import MetaInfo from '@/components/meta-info'
import Header from '@/components/header'
import ToolContentLayout from '@/components/tool-content-layout'
import InterestForm from '@/components/interest/interest-form'

import { useToolInfo } from '@/hooks/use-tool-info'

import styles from './index.module.less'

const metaInfo = {
  title: '利息计算器-利息怎么算的计算方法',
  keywords: '利息计算器最新版,利息怎么算的计算方法,银行利息计算器',
  description: '利息怎么算的计算方法是什么?利息计算器最新版,可提供贷款利息计算器计算利息保障倍数计算公式和利息计算器在线使用',
}

const Interest = () => {
  const [toolInfo] = useToolInfo()

  return (
    <>
      <MetaInfo {...metaInfo} />
      <Header isDefaultShow={true} />
      <ToolContentLayout toolInfo={toolInfo}>
        <div className="common-card-wrap">
          <div className="common-card-content">
            <InterestForm />
          </div>
        </div>
      </ToolContentLayout>
    </>
  )
}

export default Interest