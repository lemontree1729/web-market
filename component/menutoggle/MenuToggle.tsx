import { NextPage } from "next"
import Link from "next/link"
import { useState } from "react"
import menutoggleStyle from "../../styles/menutoggle/menutoggle.module.css"
import useCustomSWR from "../../utils/client/useCustumSWR"
import { category } from "../../models/Category"

const Category1: NextPage<{ data: string }> = ({ data }) => {

    return (
        <Link href={`/category?category1=${data}`}>
            <div className={menutoggleStyle.menu}>{data}</div>
        </Link>
    )
}
const Category2: NextPage<{ data: { category1: string, category2: string } }> = ({ data: { category1, category2 } }) => {
    return (
        <Link href={`/category?category1=${category1}&category2=${category2}`}>
            <div className={menutoggleStyle.menu2}>{category2}</div>
        </Link>
    )
}


const MenuToggle: NextPage = () => {
    const [isToggle, setToggle] = useState(false)
    const { data } = useCustomSWR("/api/product/category", {}, false, true)
    function togglehandler() {
        setToggle(!isToggle)
    }
    return (
        <div className={menutoggleStyle.container}>
            <div className={menutoggleStyle.hamburger} onClick={togglehandler}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={isToggle ? menutoggleStyle.category1 : menutoggleStyle.sideBar}>

                <div>
                    {data && data.map((category: category) =>
                        <>
                            <Category1 key={category.category1} data={category.category1} />
                            <div className={menutoggleStyle.category2}>
                                {category.category2 && category.category2.map(category2 => {
                                    const categoryData = { category1: category.category1, category2 }
                                    return <Category2 key={category2} data={categoryData} />
                                })}
                            </div>
                        </>)}
                </div >
            </div >
        </div >
    )
}

export default MenuToggle