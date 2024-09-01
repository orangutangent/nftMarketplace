import React from "react";
import { FileIcon } from "../icons/FileIcon";
import { XIcon } from "../icons/XIcon";
import { UploadIcon } from "../icons/UploadIcon";
import { RetryIcon } from "../icons/RetryIcon";
import { Input } from "./input";
import { Button } from "./button";

interface FileUpploaderProps {
  size?: "small" | "large";
  label?: string;
  maxSize?: number;
  accept?: string;
  helperText?: string;
  loading?: boolean;
  disabled?: boolean;
  onUpload?: (file: File) => void;
  error?: string | null;
}

export const FileUpploader = ({
  size = "small",
  label = "",
  helperText = "",
  loading = false,
  maxSize = 10,
  accept = "image/*",
  disabled = false,
  onUpload = () => {},
  error = "",
}: FileUpploaderProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [validError, setValidError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const checkFile = (file: File) => {
    if (!file) {
      setValidError("No file selected");
      return false;
    }
    if (file.size / 1024 / 1024 > maxSize) {
      setValidError(`Max file size is ${maxSize} MB`);
      return false;
    }
    return true;
  };

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValidError(null);
    setFile(null);
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (!checkFile(file)) return;
    setFile(file);
  };

  React.useEffect(() => {
    if (file) {
      onUpload(file);
    }
  }, [file]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.target.files?.[0];
    if (!file) return;
    if (!checkFile(file)) return;
    file && setFile(file);
  };

  return (
    <div className="">
      <p className=" ">{label}</p>
      {file ? (
        <div className=" flex rounded-lg justify-between border-border border-2 p-2 ">
          <div className="flex items-center gap-2">
            <FileIcon color={disabled ? "grey" : "white"} />
            <p className="text-sm">{file.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
            <button className="" onClick={() => setFile(null)}>
              <XIcon width="7" height="7" color="white" />
            </button>
          </div>
        </div>
      ) : (
        <div
          aria-disabled={disabled}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-dashed border-2 border-border rounded-lg p-4 flex flex-col gap-2 items-center justify-center cursor-pointer"
        >
          {error || validError ? (
            <>
              <button onClick={onReset} className="">
                <RetryIcon />
              </button>
              <div className="">
                <p className="">Повторить</p>
                <p className="">Загрузку</p>
              </div>
            </>
          ) : (
            <>
              <UploadIcon width="16" height="16" />
              {loading ? (
                <p className={"" + size}>Loading...</p>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="">Drop file here or</p>
                  <Button
                    variant={"ghost"}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      inputRef.current?.click();
                    }}
                  >
                    <p>Browse file</p>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {error || validError ? (
        <p className="">{validError || error}</p>
      ) : (
        <p className="">{helperText}</p>
      )}
      <Input
        className="hidden"
        accept={accept}
        disabled={disabled}
        type="file"
        hidden
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
};
