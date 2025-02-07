
import { useState } from "react";
import { CreateAccount } from "@/components/CreateAccount";
import { UploadFiles } from "@/components/UploadFiles";
import { NameCourse } from "@/components/NameCourse";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Upload, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/dashboard");
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const ProcessSteps = () => (
    <div className="flex flex-col items-center justify-center gap-8 mt-12 mb-16">
      <div className="flex items-center justify-center gap-24 relative">
        {[
          { title: "Upload Files", icon: Upload, step: 1 },
          { title: "Organize Studying", icon: BookOpen, step: 2 },
          { title: "Learn Everything", icon: GraduationCap, step: 3 },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                step >= item.step
                  ? "bg-primary text-white"
                  : "border-2 border-primary text-primary bg-white"
              }`}
            >
              <item.icon className="w-6 h-6" />
            </div>
            <p className="mt-3 text-sm font-medium text-primary whitespace-nowrap">
              {item.title}
            </p>
            {index < 2 && (
              <div
                className={`absolute top-6 left-[3.5rem] w-[12rem] h-[2px] transition-colors duration-300 ${
                  step > item.step ? "bg-primary" : "bg-secondary"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8 flex flex-col items-center">
          <img
            src="https://chatedu.io/favicon.ico"
            alt="ChatEDU Logo"
            className="w-12 h-12 mb-4"
          />
        </div>
        
        <div className="relative mb-8">
          {step === 1 && <CreateAccount onNext={() => setStep(2)} />}
          {step === 2 && (
            <>
              <UploadFiles onNext={() => setStep(3)} />
              <ProcessSteps />
            </>
          )}
          {step === 3 && <NameCourse onComplete={handleComplete} />}
        </div>

        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevStep}
            disabled={step === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextStep}
            disabled={step === 3}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <OnboardingProgress currentStep={step} totalSteps={3} />
      </div>
    </div>
  );
};

export default Index;
