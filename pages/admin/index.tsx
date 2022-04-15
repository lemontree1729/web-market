import type { NextPage } from 'next'
import CheckTable from '../../component/admin/CheckTable'
import { useRouter } from 'next/router'
import useCustomSWR from '../../utils/client/useCustumSWR'
import { useState } from 'react'
import customAxios from '../../utils/customAxios'
import Layout from '../../component/Layout'
import 'bootstrap/dist/css/bootstrap.css'
import adminStyle from '../../styles/admin/admin.module.css'
import Sidebar from '../../component/admin/Sidebar'
import Loading from '../../component/Loading'


const Userlist: NextPage = () => {
    const column = { "#": "_id", 가입날짜: "registerAt", 아이디: "id", 이름: "name", 이메일: "email", 주소: "address", 휴대폰번호: "phonenumber", 권한: "role" }
    const [checkedUserList, setCheckedUserList] = useState([])
    const router = useRouter()
    const required = new URLSearchParams();
    const requiredList = Object.values(column)
    requiredList.forEach(value => required.append("required", value))
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user", { params: required })
    if (isLoading) return <div><Loading /></div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
        router.push("/")
    }
    if (isApiError) {
        alert("권한이 없습니다")
        router.push("/")
    }
    async function grantPermission() {
        const confirmResult = confirm("정말 권한을 부여하시겠습니까?")
        if (confirmResult) {
            try {
                const res = await customAxios.patch("/api/user", { _id: checkedUserList, role: "admin" })
                if (res.status === 200) {
                    alert("권한 부여에 성공하였습니다.")
                } else {
                    alert(`권한 부여에 실패하였습니다. 이유는 아래와 같습니다.
                    ${JSON.stringify(res.data.error)}`)
                }
            } catch (error) {
                alert(`권한 부여 도중 에러가 발생하였습니다. 이유는 아래와 같습니다.
                    ${error}`)
            }
            router.reload()
        }
    }
    async function revokePermission() {
        const confirmResult = confirm("정말 권한을 해제하시겠습니까?")
        if (confirmResult) {
            try {
                const res = await customAxios.patch("/api/user", { _id: checkedUserList, role: "user" })
                if (res.status === 200) {
                    alert("권한 해제에 성공하였습니다.")
                } else {
                    alert(`권한 해제에 실패하였습니다. 이유는 아래와 같습니다.
                    ${JSON.stringify(res.data.error)}`)
                }
            } catch (error) {
                alert(`권한 해제 도중 에러가 발생하였습니다. 이유는 아래와 같습니다.
                    ${error}`)
            }
            router.reload()
        }

    }
    async function deleteUser() {
        const confirmResult = confirm("정말 유저을 삭제하시겠습니까?")
        if (confirmResult) {
            try {
                const params = new URLSearchParams();
                checkedUserList.forEach(value => params.append("_id", value))
                const res = await customAxios.delete("/api/user", { params })
                if (res.status === 200) {
                    alert("유저 삭제에 성공하였습니다.")
                } else {
                    alert(`유저 삭제에 실패하였습니다. 이유는 아래와 같습니다.
                    ${JSON.stringify(res.data.error)}`)
                }
            } catch (error) {
                alert(`유저 삭제 도중 에러가 발생하였습니다. 이유는 아래와 같습니다.
                    ${error}`)
            }
            router.reload()
        }
    }
    return (
        <Layout>
            <div className={adminStyle.container}>
                <div className={adminStyle.body}>
                    <div>
                        <Sidebar toggle="userlist"></Sidebar>
                    </div>
                    <div className={adminStyle.content}>
                        <CheckTable column={column} setCheckedList={setCheckedUserList} index={"_id"} data={data}></CheckTable>
                        <div className={adminStyle.btn_group}>
                            <button type="button" onClick={grantPermission}>권한부여</button>
                            <button type="button" onClick={revokePermission}>권한해제</button>
                            <button type="button" onClick={deleteUser}>회원삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Userlist
