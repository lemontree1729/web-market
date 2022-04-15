import type { NextPage } from 'next'
import useCustomSWR from '../../utils/client/useCustumSWR'
import Layout from '../../component/Layout'
import 'bootstrap/dist/css/bootstrap.css'
import adminStyle from '../../styles/admin/admin.module.css'
import Sidebar from '../../component/admin/Sidebar'
import { useRouter } from 'next/router'
import Loading from '../../component/Loading'


const Productlist: NextPage = () => {
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/me")
    if (isLoading) return <div><Loading /></div>
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
            <div className={adminStyle.container}>
                <div className={adminStyle.body}>
                    <div>
                        <Sidebar toggle="userlist"></Sidebar>
                    </div>
                    <div className={adminStyle.content}>
                        ing...
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Productlist