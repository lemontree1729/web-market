import styles from '../styles/category.module.css'
import { useEffect, useState } from 'react'
import CategoryList from '../component/index/CategoryList'
import useCustomSWR from '../utils/client/useCustumSWR'
import Layout from '../component/Layout'
import { product } from '../models/Product'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Category: NextPage = () => {
    const router = useRouter()
    const initCategory1 = router.query.category1
    const initCategory2 = router.query.category2
    const [category1, setCategory1] = useState("")
    const [category2, setCategory2] = useState("")

    useEffect(() => {
        setCategory1(initCategory1?.toString() || "")
        setCategory2(initCategory2?.toString() || "")
    }, [initCategory1, initCategory2])
    const categorySWR = useCustomSWR("/api/product/category", {}, false, true)
    const productSWR = useCustomSWR(`/api/product?category1=${category1}&category2=${category2}`)
    if (categorySWR.isLoading) {
        return <div>로딩중</div>
    }
    // console.log(categorySWR, productSWR)

    const categoryData = categorySWR.data
    const productData: Array<product> = productSWR.data && productSWR.data.data
    const productTotalNum = productSWR.data && productSWR.data.metadata.totalnum

    function clickCategory1(e: any) {
        setCategory1(e.target.innerText)
        setCategory2("")
    }

    function clickCategory2(e: any) {
        setCategory2(e.target.innerText)
    }
    const category1Data: Array<string> = []
    categoryData.forEach((category: any) => category1Data.push(category.category1));
    category1Data.sort()
    let category2Data: Array<string> = []
    category1 && categoryData.forEach((category: any) => {
        if (category.category1 === category1) {
            category2Data = category.category2
        }
    })
    category2Data.sort()

    // console.log(categoryData, productData)
    // console.log(productTotalNum)

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.totalContainer}>
                    <div className={styles.category}>
                        <div className={styles.categoryTag}>
                            <div className={styles.categoryList}>카테고리칸</div>
                            <div className={styles.categoryFilter}>
                                {category1Data && category1Data.map(category1 => <div key={category1} onClick={clickCategory1} className={styles.categoryBig}>{category1}</div>)}
                            </div>
                        </div>
                        <div className={styles.smallCategoryTag}>
                            <div className={styles.smallCategory}>소분류칸</div>
                            <div className={styles.smallCategoryFilter}>
                                {category2Data && category2Data.map(category2 => <div key={category2} onClick={clickCategory2} className={styles.categorySmall}>{category2}</div>)}
                            </div>
                        </div>
                        <div className={styles.priceRankTag}>
                            <div className={styles.priceRank}>가격순</div>
                            <div className={styles.priceRankFilter}>가격순 필터 칸</div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.sort}>
                            <div className={styles.sortFilter}>조회수 순</div>
                            <div className={styles.sortFilter}>높은 가격순</div>
                            <div className={styles.sortFilter}>낮은 가격순</div>
                        </div>

                        <div className={styles.price}>
                            {/* -------------------------제품리스트---------------------- */}
                            <div className={styles.itemList}>
                                <div className={styles.priceList}>
                                    {productData && productData.map(product => <CategoryList key={product._id} data={product} />)}
                                </div>
                            </div>
                            {/* --------------------------랭킹?--------------------------- */}
                            <div className={styles.Ranking}>
                                <div className={styles.RankingList}>랭킹</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Category