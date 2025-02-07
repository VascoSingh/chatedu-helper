import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Notebook } from "lucide-react";

interface NameCourseProps {
  onComplete: () => void;
}

export function NameCourse({ onComplete }: NameCourseProps) {
  const [courseName, setCourseName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="animate-slide-up space-y-6 w-full max-w-sm mx-auto">
      <div className="space-y-2 text-center">
        <Notebook className="h-12 w-12 mx-auto text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Name Your Course</h1>
        <p className="text-muted-foreground">
          Organize your learning materials
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="courseName">Course Name</Label>
          <Input
            id="courseName"
            placeholder="e.g., Biology 101"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full transition-all duration-200 hover:scale-[1.02]"
          >
            Complete Setup
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onComplete}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Skip for now
          </Button>
        </div>
      </form>
    </div>
  );
}