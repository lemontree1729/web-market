import { useCallback, useEffect, useRef, useState } from "react"
import carouselStyle from "../../styles/carousel/Carousel.module.css"
import { images } from "./images"
import Image from "next/image"
import { NextPage } from "next"


const Carousel: NextPage = () => {
    const [currentCarousel, setCurrentCarousel] = useState(0)
    const carouselRef = useRef(null)
    const totalCarousel = images.length

    const prevCarousel = useCallback((): void => {
        if (currentCarousel <= 0) {
            setCurrentCarousel(totalCarousel - 1)
            return;
        }
        setCurrentCarousel(currentCarousel - 1)
    }, [currentCarousel])

    const nextCarousel = useCallback((): void => {
        if (currentCarousel + 1 === totalCarousel) {
            setCurrentCarousel(0)
            return;
        }
        setCurrentCarousel(currentCarousel + 1)
    }, [currentCarousel])
    useEffect(() => {
        carouselRef.current.style.transition = 'all 0.5s ease-in-out';
        carouselRef.current.style.transform = `translateX(${(-100 / totalCarousel) * (currentCarousel)}%)`
    }, [currentCarousel]);
    return (
        <div className={carouselStyle.container} >
            <div className={carouselStyle.carousel_container} >
                <div className={carouselStyle.slideimage} ref={carouselRef} >
                    {images.map((image) => <Image src={image} />)}
                </div>
            </div>
            <div className={carouselStyle.btn_group}>
                <button className={carouselStyle.prev_btn} onClick={prevCarousel}></button>
                <span>{currentCarousel + 1}</span>
                <span>/</span>
                <span>{totalCarousel}</span>
                <button className={carouselStyle.next_btn} onClick={nextCarousel}></button>
            </div>

        </div>
    )
}

export default Carousel