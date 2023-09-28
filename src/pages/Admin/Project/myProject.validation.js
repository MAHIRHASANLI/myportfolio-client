import * as Yup from "yup";

export const myProjectValidation = Yup.object().shape({
    name: Yup.string().min(4, 'Too Short!')
    .max(40, 'Too Long!').trim()
    .strict(true)
    .required('Name required'),
    title: Yup.string().min(4, 'Too Short!')
    .max(40, 'Too Long!').trim()
    .strict(true)
    .required('Title required'),
    webkitURL: Yup.string().url().trim().strict(true).required('Webkit URL required'),
    image:Yup.string().url().trim().strict(true).required('Image required'),
})