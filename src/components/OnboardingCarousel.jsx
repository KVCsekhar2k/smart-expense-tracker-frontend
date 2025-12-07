// frontend/src/components/OnboardingCarousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/onboardingCarousel.css";


function OnboardingCarousel({ onDone }) {
  const slides = [
    {
      title: "Track Your Money",
      text: "Keep all your expenses and income in one clear place.",
    },
    {
      title: "Visualize Spending",
      text: "See where your money goes with charts and timelines.",
    },
    {
      title: "Stay In Control",
      text: "Build better saving habits with simple insights.",
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="onboarding-card">
  <Slider {...settings}>
    {slides.map((s, index) => (
      <div key={index} className="onboarding-slide">
        <div className="onboarding-slide-content">
          <h2 className="onboarding-title">{s.title}</h2>
          <p className="onboarding-text">{s.text}</p>

          {index === slides.length - 1 && (
            <button className="onboarding-btn" onClick={onDone}>
              Get Started
            </button>
          )}
        </div>
      </div>
    ))}
  </Slider>

  <button className="onboarding-skip-btn" onClick={onDone}>
    Skip
  </button>
</div>

  );
}

export default OnboardingCarousel;
