import "./LatestPrototype.css";
interface TestimonialProps {
    testimonial: string;
}

export default function Testimonial(props: TestimonialProps) {
    return (
        <div className="testimonialBox">
            <div className="testimonialBoxImage">
            </div>
            <div className="testimonialBoxText" >
                <div >
                    {props.testimonial}
                </div>
                <div className="testimonialBoxName">
                    - Name
                </div>
            </div>

        </div>
    )
}