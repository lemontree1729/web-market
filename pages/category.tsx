import styles from '../styles/category.module.css'
import { useEffect, useState } from 'react'
import CategoryList from '../component/index/CategoryList'
import useCustomSWR from '../utils/client/useCustumSWR'
import Layout from '../component/Layout'
import { product } from '../models/Product'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Pagination from '../component/index/Pagination'
import Loading from '../component/Loading'

const Category: NextPage = () => {
    const router = useRouter()
    const initCategory1 = router.query.category1
    const initCategory2 = router.query.category2
    const [category1, setCategory1] = useState("")
    const [category2, setCategory2] = useState("")
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setCategory1(initCategory1?.toString() || "")
        setCategory2(initCategory2?.toString() || "")
    }, [initCategory1, initCategory2])
    const categorySWR = useCustomSWR("/api/product/category", {}, false, true)
    const productSWR = useCustomSWR(`/api/product?category1=${category1}&category2=${category2}&display=${limit}&pagenum=${page}`)
    if (categorySWR.isLoading) {
        return <div><Loading /></div>
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


    const offset = (page - 1) * limit;

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.category}>
                    <div className={styles.categoryTag}>
                        <div className={styles.categoryList}>카테고리칸</div>
                        <div className={styles.categoryFilter}>
                            {category1Data && category1Data.map(category1 => <span key={category1} onClick={clickCategory1} className={styles.categoryBig}>{category1}</span>)}
                        </div>
                    </div>
                    <div className={styles.smallCategoryTag}>
                        <div className={styles.categoryList}>소분류칸</div>
                        <div className={styles.categoryFilter}>
                            {category2Data && category2Data.map(category2 => <span key={category2} onClick={clickCategory2} className={styles.categorySmall}>{category2}</span>)}
                        </div>
                    </div>
                    <div className={styles.priceRankTag}>
                        <div className={styles.categoryList}>가격순</div>
                        <div className={styles.categoryFilter}>
                            가격순 필터
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.sort}>
                        <span>조회수 순</span>
                        <span>높은 가격순</span>
                        <span>낮은 가격순</span>
                    </div>

                    <div className={styles.price}>
                        {/* -------------------------제품리스트---------------------- */}
                        <div className={styles.itemList}>
                            <label className={styles.label}>
                                페이지 당 표시할 게시물 수:&nbsp;
                                <select
                                    value={limit}
                                    onChange={({ target: { value } }) => setLimit(Number(value))}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </label>

                            <div className={styles.priceList}>
                                {productData && productData.map(product => <CategoryList key={product._id} data={product} />)}
                            </div>

                            {productTotalNum && <Pagination
                                total={productTotalNum}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />}
                        </div>

                        {/* --------------------------랭킹?--------------------------- */}
                        {/* <div className={styles.Ranking}>
                            <div className={styles.RankingList}>랭킹</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Category