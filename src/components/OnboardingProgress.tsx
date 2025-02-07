import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="w-full max-w-xs mx-auto mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-full h-1 rounded-full transition-all duration-300",
              index === 0 ? "rounded-l-full" : "",
              index === totalSteps - 1 ? "rounded-r-full" : "",
              index < currentStep
                ? "bg-primary"
                : "bg-secondary"
            )}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}