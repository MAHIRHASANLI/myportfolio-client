import * as Yup from "yup";

export const MessageValidation = Yup.object().shape({
    name: Yup.string().min(5, 'Too Short!')
    .max(20, 'Too Long!').trim()
    .strict(true)
    .required('name required'),
    surname: Yup.string().min(5, 'Too Short!')
    .max(20, 'Too Long!').trim()
    .strict(true)
    .required('surname required'),
    email: Yup.string().email('Invalid email').trim()
    .strict(true)
     .required('email required'),
     message:Yup.string().min(10, 'Too Short!')
     .max(300, 'Too Long!')
     .required('comment required'),
})