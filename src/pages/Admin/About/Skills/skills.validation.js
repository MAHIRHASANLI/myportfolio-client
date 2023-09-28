import * as Yup from "yup";

export const mySkillsValidation = Yup.object().shape({
    name: Yup.string().min(4, 'Too Short!')
        .max(60, 'Too Long!').trim()
        .strict(true)
        .required('name required'),
    about: Yup.string().min(5, 'Too Short!')
        .max(60, 'Too Long!').trim()
        .strict(true).required('About required'),
    category: Yup.string().min(5, 'Too Short!')
        .max(60, 'Too Long!').trim()
        .strict(true).required('Category required'),
    image: Yup.string().url().trim().strict(true).required('Image required'),
})