import * as Yup from "yup";

export const myAboutValidation = Yup.object().shape({
    name: Yup.string().min(4, 'Too Short!')
        .max(20, 'Too Long!').trim()
        .strict(true)
        .required('name required'),
    profession: Yup.string().min(5, 'Too Short!')
        .max(500, 'Too Long!').trim()
        .strict(true).required('Profession required'),
    image: Yup.string().url().trim().strict(true).required('Image required'),
})