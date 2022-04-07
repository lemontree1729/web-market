import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useCustomSWR from '../../utils/client/useCustumSWR'
import Layout from '../../component/Layout'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'


const Admin: NextPage = () => {
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/me")
    if (isLoading) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
        router.push("/")
    }
    if (isApiError) {
        alert("로그인이 필요합니다")
        router.push("/login")
    }
    if (data.role != "admin") {
        alert("권한이 없습니다")
        router.push("/")
    }
    return (
        <Layout>
            <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark' style={{ width: "280px" }}>
                <ul className='nav nav-pills flex-column mb-auto'>
                    <Link href="/admin/userlist" passHref>
                        <li className='nav-item'>
                            <a className='nav-link active'>유저목록</a>
                        </li>
                    </Link>
                    <Link href="/admin/productlist" passHref>
                        <li className='nav-item'>
                            <a className='nav-link text-white'>상품목록</a>
                        </li>
                    </Link>
                    {/* <li className='nav-item'>
                        <a className='nav-link text-white'>유저목록</a>
                    </li> */}
                </ul>
            </div>
        </Layout>
    )
}

export default Admin
