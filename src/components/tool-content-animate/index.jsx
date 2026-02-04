import styles from './index.module.less'

import shape01 from '@/assets/img/shape-01.svg'
import shape02 from '@/assets/img/shape-02.svg'
import shape03 from '@/assets/img/shape-03.svg'
import shape04 from '@/assets/img/shape-04.svg'
import shape05 from '@/assets/img/shape-05.svg'
import shape06 from '@/assets/img/shape-06.svg'
import shape07 from '@/assets/img/shape-07.svg'
import shape08 from '@/assets/img/shape-08.svg'
import shape09 from '@/assets/img/shape-09.svg'
import shape10 from '@/assets/img/shape-10.svg'
import shape11 from '@/assets/img/shape-11.svg'

const ToolContentAnimatie = () => {
  return (
    <div className={styles.backgroundFix}>
      <img src={shape01.src} className={styles.shape_01}/>
      <img src={shape02.src} className={styles.shape_02}/>
      <img src={shape03.src} className={styles.shape_03}/>
      <img src={shape04.src} className={styles.shape_04}/>
      <img src={shape05.src} className={styles.shape_05}/>
      <img src={shape06.src} className={styles.shape_06}/>
      <img src={shape07.src} className={styles.shape_07}/>
      <img src={shape08.src} className={styles.shape_08}/>
      <img src={shape09.src} className={styles.shape_09}/>
      <img src={shape10.src} className={styles.shape_10}/>
      <img src={shape11.src} className={styles.shape_11}/>
    </div>
  )
}

export default ToolContentAnimatie