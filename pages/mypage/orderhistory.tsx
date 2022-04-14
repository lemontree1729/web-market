import { useRouter } from 'next/router'
import mypageStyle from "../../styles/mypage/mypage.module.css"
import SideBar from "../../component/mypage/Sidebar";
import OrderHistory from "../../component/mypage/OrderHistory";
import useCustomSWR from "../../utils/client/useCustumSWR";
import Layout from "../../component/Layout";
import { NextPage } from 'next';
import Loading from '../../component/loading';

const Orderhistory: NextPage = () => {
    const router = useRouter();
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
    return (
        <Layout>
            <div className={mypageStyle.container}>
                <div className={mypageStyle.body}>
                    <div className="sidebar">
                        <SideBar toggle="orderhistory" />
                    </div>
                    <div className={mypageStyle.content}>
                        <OrderHistory />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orderhistory