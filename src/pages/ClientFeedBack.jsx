import React from 'react';
import ReviewsSection from './ReviewSection';

const ClientFeedback = () => {
    return (
        <>
        <div className="bg-white flex items-center justify-center px-4 mb-14">
            <div className="text-center">
                {/* Heading */}
                <h2
                    className="mb-4"
                    style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '35px',
                        fontWeight: 400,
                        color: '#5E5E56',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                    }}
                >
                    CLIENTS FEEDBACK
                </h2>

                {/* Paragraph */}
                <p
                    className="mb-6 mx-auto"
                    style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '18px',
                        fontWeight: 500,
                        fontStyle: 'italic',
                        color: '#84847C',
                        textAlign: 'center',
                        lineHeight: '1.6',
                    }}
                >
                    Our clients are at the heart of everything we do<br />
                    and their satisfaction is our greatest reward. We strive to turn their vision into reality.
                </p>

                {/* Icons */}
                <div className="flex justify-center space-x-8 mb-4">
                    <style>
                        {`
                           @keyframes shakeZoom {
                            0% { transform: scale(1) translateX(0); }
                            25% { transform: scale(1.1) translateX(-2px); }
                            50% { transform: scale(1) translateX(2px); }
                            75% { transform: scale(1.1) translateX(-2px); }
                            100% { transform: scale(1) translateX(0); }
                            }

                            .hoverShake:hover {
                            animation: shakeZoom 1.2s ease-in-out infinite;
                            }
                        `}
                    </style>

                    <a
                        href="https://www.wedmegood.com/profile/Videocrafts-37406/reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/Google-Review-Symbol-2048x1152.png?updatedAt=1758030946169"
                            alt="Google Reviews"
                            className="w-16 h-16 hoverShake"
                        />
                    </a>

                    <a
                        href="https://www.wedmegood.com/profile/Videocrafts-37406/reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/418805108_811056341052605_752968751592059872_n.jpg?updatedAt=1758030946409"
                            alt="WedMeGood"
                            className="w-16 h-16 hoverShake rounded-full"
                        />
                    </a>
                    <a
                        href="https://www.weddingwire.in/emp-AccesoBridge.php?r=/emp-AdminReviews.php"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/367-3678920_weddingwire-icon-wedding-wire-logo.png?updatedAt=1758030946343"
                            alt="WeddingWire"
                            className="w-16 h-16 hoverShake"
                        />
                    </a>
                </div>
            </div>
        </div>
        <ReviewsSection />
        </>
    );
};

export default ClientFeedback;