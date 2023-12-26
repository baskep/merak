import Header from '@/components/header'
import HeaderSearch from '@/components/header-search'
import HomePage from '@/components/home-page'
import MetaInfo from '@/components/meta-info'

import { getAllTool } from '@/service/home-page'

const metaInfo = {
  title: '在线工具箱-免费实用工具大全',
  keywords: '在线工具箱,免费实用工具大全,在线工具,实用工具,大写一二三四五六七八大九十大写,大写转换器,木材材积表,证件照换底色,老黄历,二维码生成器,手机号查询',
  description: '一家免费的在线实用工具网站，为大家提供在线大写一二三四五六七八大九十大写,大写转换器,一键抠图、在线新华字典、在线万年历等功能',
}

const Home = async () => {

  const allTool = await getAllTool()

  return (
    <>
      <MetaInfo {...metaInfo} />
      <Header />
      <HeaderSearch />
      <HomePage allTool={allTool.data || []}/>
    </>
  )
}

export default Home