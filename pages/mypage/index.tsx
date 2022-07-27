import { useRouter } from 'next/router'
import mypageStyle from "../../styles/mypage/mypage.module.css"
import useCustomSWR from "../../utils/client/useCustumSWR";
import SideBar from '../../component/mypage/Sidebar';
import UserInfo from '../../component/mypage/UserInfo';
import Layout from '../../component/Layout';
import { NextPage } from 'next';
import Loading from '../../component/Loading';


const Mypage: NextPage = () => {
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/me?required=id&required=name&required=email&required=phonenumber", {}, true)
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
                        <SideBar toggle="userinfo" />
                    </div>
                    <div className={mypageStyle.content}>
                        <UserInfo data={data} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Mypage
