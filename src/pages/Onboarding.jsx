// frontend/src/pages/Onboarding.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingCarousel from "../components/OnboardingCarousel";
import { useAuth } from "../context/AuthContext";
import "../styles/onboarding.css";


function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const seen = localStorage.getItem("seenOnboarding");
    if (seen && user) {
      navigate("/dashboard");
    } else if (seen && !user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleDone = () => {
    localStorage.setItem("seenOnboarding", "true");
    if (user) navigate("/dashboard");
    else navigate("/signup");
  };

  return (
    <div className="onboarding-page">
  <div className="onboarding-wrapper">
    <OnboardingCarousel onDone={handleDone} />
  </div>
</div>

  );
}

export default Onboarding;
