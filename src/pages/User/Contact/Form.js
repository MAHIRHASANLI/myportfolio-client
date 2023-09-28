import React from 'react'
import style from "./index.module.css";
import { useFormik } from "formik";
import Button from '../../../shared/button/Button';
import { usePostMessageDataMutation } from '../../../store/apis/meMessageApi';
import { MessageValidation } from "./contact.validation"
import { CircularProgress } from '@mui/material';


const Form = () => {
    const [postMessageData, results] = usePostMessageDataMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            message: "",
        },
        validationSchema: MessageValidation,
        onSubmit: async (values, actions) => {
            postMessageData(values)
            setTimeout(() => {
                actions.resetForm();
            }, 2000);
        },
    });
    return (
        <form
            onSubmit={formik.handleSubmit}
            className={style.message_item}
        >
            <p className={style.comment}>
                <input
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    name="name"
                    type="text"
                    placeholder="Name"
                />
            </p>
            <p className={style.comment}>
                <input
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                    name="surname"
                    type="text"
                    placeholder="Surname"
                />
            </p>
            <p className={style.comment}>
                <input
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                    type="email"
                    placeholder="Email"
                />
            </p>
            <p className={style.comment}>
                <textarea
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    name="message"
                    cols="200"
                    rows="10"
                    placeholder="Comment text*"
                ></textarea>
            </p>
            <div className={style.comment}>
                <Button>
                    {results.isLoading ? (<><CircularProgress style={{ height: "20px", width: '20px' }} color='inherit' disableShrink />Is sent</>) : ("Submit")}
                </Button>
            </div>
        </form>
    )
}

export default Form