import * as yup from "yup";

export const courseFormSchema = yup.object({
  name: yup.string().required("A course name is required")
});
