import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .string()
    .refine((val) => Number(val) > 0, "Price must be greater than 0"),
  image: z
    .any()
    .refine((file: File) => file, "File is required")
    .refine((file) => file?.size < MAX_FILE_SIZE, "Max size is 5MB.")
    .refine(
      (file) => checkFileType(file),
      "Only .pdf, .docx formats are supported."
    ),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.type;
    if (fileType.includes("image")) {
      return true;
    }
    return false;
  }
  return false;
}
