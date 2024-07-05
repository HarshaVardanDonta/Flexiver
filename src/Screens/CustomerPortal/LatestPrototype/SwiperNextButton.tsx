import { useSwiper } from "swiper/react";
import "./LatestPrototype.css"
import { FaArrowRightArrowLeft, FaChevronRight } from "react-icons/fa6";
import { useEffect } from "react";
interface SwiperNextButtonProps {
    activeSlide: number
}
export default function SwiperNextButton(props: SwiperNextButtonProps) {
    const swiper = useSwiper();
    useEffect(() => {
        swiper.slideTo(props.activeSlide)
    }, [props.activeSlide])
    return (
        <div >
        </div>

    )
}