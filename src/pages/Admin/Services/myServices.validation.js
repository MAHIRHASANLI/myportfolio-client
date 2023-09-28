import * as Yup from "yup";

export const myServicesValidation = Yup.object().shape({
    icons: Yup.string().min(4, 'Too Short!')
        .max(30, 'Too Long!').trim()
        .strict(true)
        .required('Icon required'),
    services: Yup.string().min(5, 'Too Short!')
        .max(200, 'Too Long!').trim()
        .strict(true).required('Services required')
})