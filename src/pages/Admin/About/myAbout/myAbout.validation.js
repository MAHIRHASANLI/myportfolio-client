import * as Yup from "yup";

export const myAboutValidation = Yup.object().shape({
    name: Yup.string().min(4, 'Too Short!')
        .max(20, 'Too Long!').trim()
        .strict(true)
        .required('name required'),
    profession: Yup.string().min(5, 'Too Short!')
        .max(500, 'Too Long!').trim()
        .strict(true).required('Profession required'),
        image: Yup.mixed()
        .required("required!")
        .test(
            "FILE_SIZE",
            "Too big!",
            (value) => value && value.size < 1024 * 1024
        ).test(
            "FILE_TYPE",
            "Invalid!",
            (value) => value && ["image/png", "image/jpeg", "image/webp"].includes(value.type)
        )
})