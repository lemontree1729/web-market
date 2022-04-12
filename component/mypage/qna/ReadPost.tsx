// import postrowStyle from "../../styles/post/postrow.module.css"
import { useState } from "react"
import customAxios from "../../../utils/customAxios"
import Link from "next/link"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { extraInquiry } from "./Board"


const ReadPost: NextPage<{ data: extraInquiry }> = ({ data }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isAnswer, setisAnswer] = useState(false)
    const answer = data.reply.length ? "답변완료" : "답변예정"

    function clickContent() {
        if (data.reply.length) {
            setisAnswer(!isAnswer)
        }
        setIsOpen(!isOpen)
    }
    async function deleteApi(event: any) {
        event.preventDefault()
        if (window.confirm("삭제하시겠습니까?")) {
            try {
                const res = await customAxios.delete(`/api/inquiry?no=${data.no}`)
                if (res.status == 200) {
                    alert('글이 삭제되었습니다.')
                } else {
                    alert('글이 존재하지 않습니다.')
                }
            } catch (err) {
                console.log(err)
                alert('삭제가 실패했습니다..')
            }
        }
    }

    return (
        <>
            <tr onClick={clickContent}>
                <td>{data.no}</td>
                <td>{data.qacategory}</td>
                <td>{data.title}</td>
                <td>{data.userno}</td>
                <td>{data.createdAt.toString().replace(/-/g, ".").substring(0, 10)}</td>
                <td>{answer}</td>
                <td>
                    <Link href={`/mypage/updatepost/${data.no}`} passHref>
                        <button>수정하기</button>
                    </Link>
                    <button onClick={deleteApi}>삭제</button>
                </td>
            </tr>
            {
                isOpen ? (
                    <tr>
                        <td></td>
                        <td></td>
                        <td>{data.content}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ) : <></>
            }
            {
                isAnswer ? (
                    <tr>
                        <td></td>
                        <td>답변</td>
                        <td>답변내용</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ) : <></>
            }
        </>
    )
}

export default ReadPost