import userinfoStyle from "../../styles/mypage/userinfo.module.css"
import { NextPage } from "next"
import { user } from "../../models/User"


const UserInfo: NextPage<{ data: user }> = ({ data }) => {
    return (
        <div className={userinfoStyle.content}>
            <h2>회원정보</h2>
            <table>
                <tbody>
                    <tr>
                        <th >아이디</th>
                        <td>{data.id}</td>
                    </tr>
                    <tr>
                        <th >이름</th>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <th >이메일</th>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <th >휴대전화</th>
                        <td>{data.phonenumber}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}
export default UserInfo