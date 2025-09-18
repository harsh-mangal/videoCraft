import React from "react";
import ContactForm from "./ContactForm";
import InstagramSection from "./IntsagramSection";

const ContactSection = () => {
    return (
        <>
            <div className="w-full bg-white  px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Heading */}
                    <h2
                        className="uppercase"
                        style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: "35px",
                            fontWeight: 400,
                            color: "#5E5E56",
                            textAlign: "center",
                        }}
                    >
                        GET IN TOUCH
                    </h2>

                    {/* Subheading */}
                    <p
                        className="mb-12 italic"
                        style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: "22px",
                            fontWeight: 400,
                            color: "#84847C",
                            textAlign: "center",
                        }}
                    >
                        Follow our latest stories.
                    </p>
                </div>
            </div>
            <ContactForm />

            {/* <InstagramSection /> */}
        </>
    );
};

export default ContactSection;
