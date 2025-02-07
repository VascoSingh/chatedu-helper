import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface UploadFilesProps {
  onNext: () => void;
}

export function UploadFiles({ onNext }: UploadFilesProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf"
    );

    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles].slice(0, 3));
      toast({
        title: "Files added successfully",
        description: `Added ${droppedFiles.length} file(s)`,
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type === "application/pdf"
      );
      setFiles(prev => [...prev, ...selectedFiles].slice(0, 3));
      toast({
        title: "Files added successfully",
        description: `Added ${selectedFiles.length} file(s)`,
      });
    }
  };

  return (
    <div className="animate-slide-up space-y-6 w-full max-w-md mx-auto">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Upload Files</h1>
        <p className="text-muted-foreground">
          Upload 1-3 PDFs (lectures, exams, homeworks)
        </p>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative rounded-lg border-2 border-dashed p-8 transition-all duration-200
          ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
        `}
      >
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop your PDFs here, or click to select files
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected files:</p>
          {files.map((file, index) => (
            <div
              key={index}
              className="text-sm text-muted-foreground bg-secondary rounded-md p-2"
            >
              {file.name}
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={onNext}
        disabled={files.length === 0}
        className="w-full transition-all duration-200 hover:scale-[1.02]"
      >
        Continue
      </Button>
    </div>
  );
}