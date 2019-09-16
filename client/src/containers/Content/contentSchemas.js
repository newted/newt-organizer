import * as yup from "yup";

export const contentSchema = yup.object({
  name: yup.string().required("A name is required"),
  description: yup.string(),
  dateDue: yup.date().required("A due date is required")
});

export const youtubeUrlSchema = yup.object({
  url: yup
    .string()
    .url(
      "Make sure it's a URL. E.g.: https://www.youtube.com/watch?v=LN0ucKNX0hc"
    )
    .required("A YouTube URL is required")
});
