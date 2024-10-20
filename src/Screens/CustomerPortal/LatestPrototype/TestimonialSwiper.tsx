import { useSwiper } from "swiper/react";
import "./LatestPrototype.css"
import { FaArrowRightArrowLeft, FaChevronRight } from "react-icons/fa6";
import { useEffect } from "react";
interface SwiperNextButtonProps {
    activeTestimonial: number
}
export default function TestimonialSwiper(props: SwiperNextButtonProps) {
    const swiper = useSwiper();
    useEffect(() => {
        swiper.slideTo(props.activeTestimonial)
    }, [props.activeTestimonial])
    return (
        <div >
        </div>

    )
}