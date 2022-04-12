import { useRouter } from 'next/router'
import mypageStyle from "../../styles/mypage/mypage.module.css"
import useCustomSWR from "../../utils/client/useCustumSWR";
import SideBar from '../../component/mypage/Sidebar';
import UserInfo from '../../component/mypage/UserInfo';
import Layout from '../../component/Layout';
import { NextPage } from 'next';

const Mypage: NextPage = () => {
    const router = useRouter()
    const params = new URLSearchParams();
    ["id", "name", "email", "phonenumber"].forEach(value => params.append("required", value))
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/me", { params }, true)
    if (isLoading) return <div>로딩중...</div>
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
