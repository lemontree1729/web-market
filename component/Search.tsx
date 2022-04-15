import { useState } from "react"
import customAxios from "../utils/customAxios"
import styles from '../styles/HeaderCompo.module.css'
import Router, { useRouter } from "next/router"


export default function Search() {
    const [search, setSearch] = useState("")
    const router = useRouter()
    const searchHandeler = (event: any) => {
        setSearch(event.target.value)
    }
    const serachItem = async () => {
        try {
            router.push(`/category?keyword=${search}`)
        } catch {

        }
    }
    return (
        <div className={styles.searchcontainer}>
            <div className={styles.search}>
                <input name="search" value={search} onChange={searchHandeler} />
                <button onClick={serachItem}></button>
            </div>
        </div>
    )
}
