import "./LatestPrototype.css";

interface TestimonialProps {
    testimonial: {
        message: string;
        name: string;
        imageUrl: string; // Add imageUrl property
    };
}

export default function Testimonial(props: TestimonialProps) {
    return (
        <div className="testimonialBox">
            <div className="testimonialBoxImage">
                <img src={props.testimonial.imageUrl} alt={props.testimonial.name} className="testimonialImage" />
            </div>
            <div className="testimonialBoxText">
                <div>
                    {props.testimonial.message} {/* Display the testimonial message */}
                </div>
                <div className="testimonialBoxName">
                    - {props.testimonial.name} {/* Display the testimonial name */}
                </div>
            </div>
        </div>
    );
}
