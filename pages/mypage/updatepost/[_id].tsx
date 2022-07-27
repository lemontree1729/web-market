import { useRouter } from "next/router"
import { NextPage } from "next"
import mypageStyle from "../../../styles/mypage/mypage.module.css"
import UpdatePost from "../../../component/mypage/qna/UpdatePost"
import Layout from "../../../component/Layout"
import SideBar from "../../../component/mypage/Sidebar"
import useCustomSWR from "../../../utils/client/useCustumSWR"
import Loading from "../../../component/Loading"


const Createpost: NextPage = () => {
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/me", {}, true)
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
                        <SideBar toggle="qna" />
                    </div>
                    <div className={mypageStyle.content}>
                        <UpdatePost />
                    </div>
                </div>
            </div>
        </Layout >
    )
}
export default Createpost