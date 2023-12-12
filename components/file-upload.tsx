"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop()

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          sizes="200vw"
          src={value}
          alt="Upload"
          className="rounded-full"
          // width={300} height={800}
        />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          onClick={() => onChange("")}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        //   console.log("first", res?.[0].url);
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log("Error", error);
      }}
    />
  );
};
