import * as Yup from "yup";
const SUPPORTED_FORMATS = ['application/pdf', 'application/dosx'];

export const myContactValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').trim()
        .strict(true)
        .required('Email required'),
    phone: Yup.string().trim().strict(true)
        .required('Tel required'),
    facebook: Yup.string().url().trim().strict(true).required('Facebook required'),
    linkedn: Yup.string().url().trim().strict(true).required('Linkedn required'),
    github: Yup.string().url().trim().strict(true)
        .required('Git Hub required'),
    instagram: Yup.string().url().trim().strict(true).required('Instagram required'),
    mydata: Yup.mixed()
        .nullable()
        .required('A file is required')
        .test('format',
            'upload file', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
})