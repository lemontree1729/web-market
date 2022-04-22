import type { NextPage } from 'next'
import useCustomSWR from '../../utils/client/useCustumSWR'
import Layout from '../../component/Layout'
import 'bootstrap/dist/css/bootstrap.css'
import adminStyle from '../../styles/admin/admin.module.css'
import Sidebar from '../../component/admin/Sidebar'
import { useRouter } from 'next/router'
import Loading from '../../component/Loading'
import { ChangeEventHandler, MouseEventHandler, useState } from 'react'
import customAxios from '../../utils/customAxios'


const Productlist: NextPage = () => {
    const router = useRouter()
    const [inputs, setinputs] = useState({
        name: "",
        price: "",
        category1: "",
        category2: "",
    })
    const [imageDataUrl, setImageDataUrl] = useState(null)
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
    const { name, price, category1, category2 } = inputs
    const onChange = (e: any) => {
        const { name, value } = e.target
        const nextInputs = {
            ...inputs, [name]: value,
        }
        setinputs(nextInputs)
    }

    const saveImageDataUrl: ChangeEventHandler<HTMLInputElement> = e => {
        const target = e.target.files[0]
        const possibleTypes = ["image/png", "image/gif", "image/jpeg"]
        if (possibleTypes.includes(target.type)) {
            const reader = new FileReader()
            reader.onloadend = () => {
                console.log(reader.result)
                setImageDataUrl(reader.result)
            }
            reader.readAsDataURL(target)
        } else {
            e.target.value = ""
            alert("png, gif, jpeg 확장자의 이미지만 불러오기가 가능합니다")
        }
    }
    /*  
    유저 필수 입력값: name, price, category1, category2
    유저 선택 입력값(필수로 수정 가능): category3, category4, description, mallName, maker, brand
    이 값들을 입력 받은 후
    /api/product로 post를 보내면 됨
    보내야할 값(전부 다 보내야하는 건 아님, 받을 수 있는 값에 가까움): name, price, category1, category2, category3, category4, imageDataUrl, description, mallName, maker, brand
    */
    const createProduct: MouseEventHandler<HTMLButtonElement> = async e => {
        try {
            const result = await customAxios.post("/api/product", { name: "테스트", price: 10000, category1: "도서", category2: "소설", imageDataUrl })
            if (result.status === 200) {
                alert("업로드 성공")
            } else {
                alert("업로드 실패")
            }
        } catch {
            alert("업로드 중 서버에 에러가 발생하였습니다")
        }
    }

    return (
        <Layout>
            <div className={adminStyle.container}>
                <div className={adminStyle.body}>
                    <div>
                        <Sidebar toggle="productlist"></Sidebar>
                    </div>
                    <div className={adminStyle.content}>
                        <div className="input-group">
                            <input type="file" className="form-control" accept="image/png, image/gif, image/jpeg" onChange={saveImageDataUrl} />
                        </div>
                        미리보기
                        {imageDataUrl && <img src={imageDataUrl} />}
                        <div>
                            <input name="name" value={name} onChange={onChange} placeholder='상품 이름'></input>
                            <input type="number" name="price" value={price} onChange={onChange} placeholder='상품 가격'></input>
                            <input name="category1" value={category1} onChange={onChange} placeholder='카테고리1'></input>
                            <input name="category2" value={category2} onChange={onChange} placeholder='카테고리2'></input>
                        </div>
                        <button className="btn btn-outline-secondary" onClick={createProduct}>상품 등록</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Productlist