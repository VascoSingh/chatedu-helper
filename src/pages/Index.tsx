
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
    <div className="flex items-center justify-center gap-8 mt-12 mb-16 text-primary max-w-lg mx-auto">
      <div className="flex flex-col items-center">
        <div className="p-3 bg-primary/10 rounded-full">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-sm mt-2">Upload Files</p>
      </div>
      <div className="w-12 h-px bg-primary/30" />
      <div className="flex flex-col items-center">
        <div className="p-3 bg-primary/10 rounded-full">
          <BookOpen className="w-6 h-6" />
        </div>
        <p className="text-sm mt-2">Organize Studying</p>
      </div>
      <div className="w-12 h-px bg-primary/30" />
      <div className="flex flex-col items-center">
        <div className="p-3 bg-primary/10 rounded-full">
          <GraduationCap className="w-6 h-6" />
        </div>
        <p className="text-sm mt-2">Learn Everything</p>
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
