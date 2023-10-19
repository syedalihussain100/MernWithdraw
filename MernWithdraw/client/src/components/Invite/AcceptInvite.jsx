import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { acceptInvite } from "../../redux/features/Invite/InviteSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Card, CardBody, FormControl, Input } from "@chakra-ui/react";
import RegisterStyle from "../User/Register.module.css";
import logo from "../User/logo.png";

const signUpSchema = yup.object({
  username: yup.string().required("User name is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  phone: yup.string().required("Phone No is Required"),
  password: yup.string().required("Password is Required"),
  cpassword: yup.string().required("Confirm Password is Required"),
});

const AcceptInvite = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const pathname = location.pathname;
  const inviteToken = pathname.split("/").pop(); // Extract inviteToken from the URL

  console.log(inviteToken);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
      inviteToken,
    },

    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        acceptInvite({
          username: values.username,
          email: values.email,
          phone: values.phone,
          password: values.password,
          inviteToken,
        })
      );
    },
  });

  const data = useSelector((state) => state?.invite);

  return (
    <div className={RegisterStyle.card_container}>
      <Card className={RegisterStyle.card}>
        <CardBody>
          <img src={logo} alt="logo" className={RegisterStyle.card_logo} />
          <div className={RegisterStyle.top}>
            <h3>Sign Up</h3>

            {data ? (
              <h4
                style={{
                  color: "#fff",
                  textAlign: "center",
                  margin: "20px 0px",
                  fontSize: "1.2rem",
                }}
              >
                {data && data?.message} Go To Login Page
              </h4>
            ) : null}

            <FormControl className={RegisterStyle.form_container}>
              <Input
                type="text"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange("username")}
                onBlur={formik.handleBlur("username")}
                name="username"
              />
              <div className={RegisterStyle.text_danger}>
                {formik.touched.username && formik.errors.username}
              </div>

              <Input
                type="email"
                placeholder="Email address"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                name="email"
              />

              <div className={RegisterStyle.text_danger}>
                {formik.touched.email && formik.errors.email}
              </div>

              <Input
                type="number"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                name="phone"
              />

              <div className={RegisterStyle.text_danger}>
                {formik.touched.phone && formik.errors.phone}
              </div>
              <Input
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                name="password"
              />

              <div className={RegisterStyle.text_danger}>
                {formik.touched.password && formik.errors.password}
              </div>

              <Input
                type="password"
                placeholder="Confirm Password"
                value={formik.values.cpassword}
                onChange={formik.handleChange("cpassword")}
                onBlur={formik.handleBlur("cpassword")}
                name="cpassword"
              />

              <div className={RegisterStyle.text_danger}>
                {formik.touched.cpassword && formik.errors.cpassword}
              </div>

              <Button
                onClick={formik.handleSubmit}
                type="submit"
                className={RegisterStyle.btn}
              >
                Sign Up
              </Button>
            </FormControl>
            <p className={RegisterStyle.text}>
              Already Have An Account?{" "}
              <span>
                <Link to="/login">Sign In now</Link>
              </span>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AcceptInvite;
