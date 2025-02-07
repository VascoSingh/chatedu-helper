import { useState } from "react";
import { CreateAccount } from "@/components/CreateAccount";
import { UploadFiles } from "@/components/UploadFiles";
import { NameCourse } from "@/components/NameCourse";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleComplete = () => {
    // Here you would typically redirect to the main app
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <OnboardingProgress currentStep={step} totalSteps={3} />
        
        <div className="relative">
          {step === 1 && <CreateAccount onNext={() => setStep(2)} />}
          {step === 2 && <UploadFiles onNext={() => setStep(3)} />}
          {step === 3 && <NameCourse onComplete={handleComplete} />}
        </div>
      </div>
    </div>
  );
};

export default Index;