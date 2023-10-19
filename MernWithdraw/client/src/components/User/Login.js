import React, { useEffect } from 'react';
import { Card, CardBody, FormControl, Input, Button } from '@chakra-ui/react';
import LoginStyle from "./Login.module.css";
import logo from "./logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/user/UserSlice";

const signInSchema = yup.object({
    email: yup
        .string()
        .email("Email should be valid")
        .required("Email is Required"),
    password: yup.string().required("Password is Required"),
});


const Login = () => {
    const navigate = useNavigate();
    const { isSuccess, isLoading, logInUser, isError } = useSelector(state => state?.auth)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: signInSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(loginUser(values));
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        },
    });

    useEffect(() => {
        if (isSuccess && logInUser) {
            navigate("/");
        }
        if (isError) {
            console.log("Something went wrong")
            //   toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);


    return (
        <div className={LoginStyle.card_container}>
            <Card className={LoginStyle.card}>
                <CardBody>
                    <img src={logo} alt="logo" className={LoginStyle.card_logo} />
                    <div className={LoginStyle.top}>
                        <h3>LogIn</h3>

                        <FormControl className={LoginStyle.form_container}>
                            <Input type='email' placeholder='Email address' value={formik.values.email}
                                onChange={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")} name='email' />
                            <div className={LoginStyle.text_danger}>
                                {formik.touched.email && formik.errors.email}
                            </div>

                            <Input type='password' placeholder='Password' value={formik.values.password}
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")} name='password' />
                            <div className={LoginStyle.text_danger}>
                                {formik.touched.password && formik.errors.password}
                            </div>

                            <Button onClick={formik.handleSubmit} type='submit' className={LoginStyle.btn}>{isLoading ? "LOADING..." : "LOGIN"}</Button>
                        </FormControl>
                        <p className={LoginStyle.text}>New to Watch Trailer? <span>
                            <Link to="/register"> Sign Up now</Link>
                        </span></p>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login