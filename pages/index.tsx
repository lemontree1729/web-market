import type { NextPage } from 'next'
import useCustomSWR from '../utils/client/useCustumSWR'
import Layout from '../component/Layout'
import Carousel from '../component/carousel/Carousel'
import ItemList from '../component/index/ItemList'
import styles from '../styles/index.module.css'
import PickedRank from '../component/index/PickRank'
import PickRank from '../component/index/PickRank'
import Loading from '../component/Loading'




function divideBy(data: Array<any>, n: number) {
  const result = []
  for (let i = 0; n * (i + 1) < data.length; i++) {
    result.push(data.slice(n * i, n * (i + 1)))
  }
  return result
}

function pickRandom(data: Array<any>, n: number) {
  const result = []
  const pickedNumber = []
  const totalLength = data.length
  while (pickedNumber.length < 5) {
    const nextNumber = Math.floor(Math.random() * totalLength)
    if (!pickedNumber.includes(nextNumber)) {
      pickedNumber.push(nextNumber)
      result.push(data[nextNumber])
    }
  }
  return result
}


const Home: NextPage = () => {
  const { data, isLoading, isServerError } = useCustomSWR("/api/product?display=72&byCategory=true")
  if (isLoading) return <div><Loading /></div>
  if (isServerError) {
    alert("서버 에러가 발생하였습니다")
  }
  if (!data) {
    alert("데이터베이스 에러가 발생하였습니다")
  }
  const dividedData = divideBy(data, 8)
  const randomData = pickRandom(data, 5)
  return (
    <Layout>
      <div className={styles.main}>
        <Carousel></Carousel>
        <div className={styles.mainList}>
          <div className={styles.rank}>
            {randomData && <PickRank key={randomData[0].id} data={randomData}></PickRank>}
          </div>
          <div className={styles.recommendtitle}>
            <h3><span>카테고리별</span> <span>추천 상품!</span></h3>
          </div>
          <div className={styles.itemList}>
            {dividedData && dividedData.map(products => <ItemList key={products[0].no} data={products}></ItemList>)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
