import { NextPage } from 'next';
import styles from '../../styles/Pagination.module.css'

const Pagination: NextPage<{ total: number, limit: number, page: number, setPage: Function }> = ({ total, limit, page, setPage }) => {
    const numPages = Math.ceil(total / limit);
    console.log(numPages)
    return (
        <nav className={styles.nav}>
            <button className={styles.button} onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </button>
            {Array(numPages)
                .map((_, i) => (
                    <button className={styles.button}
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        aria-current={page === i + 1 ? "page" : null}
                    >
                        {i + 1}
                    </button>
                ))}
            <button className={styles.button} onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </button>
        </nav>
    )
}

export default Pagination