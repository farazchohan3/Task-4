import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import classes from "./login.module.css";
import { useFormik } from "formik";
// Auth-Context Import
import AuthContext from "../Store/auth-context";
export default function SignUp() {
  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      AuthCtx.createUser(values);
      resetForm({ values: "" });
      navigate("/");
    },
    validate: (values) => {
      const errors = {};

      if (!values.userName) {
        errors.userName = "Please Enter User Name";
      } else if (
        !/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/i.test(
          values.userName
        )
      ) {
        errors.userName = "Name Must be Alphanum";
      }

      if (!values.email) {
        errors.email = "Please Enter Email";
      } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
        errors.email = "Please Enter Valid Mail";
      }

      if (!values.password) {
        errors.password = "Please enter the Password";
      } else if (!/(?=.{8,})/.test(values.password)) {
        errors.password = "Password Must be 8 Charachter Long";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Please Enter Confirm Password";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password Does not Matched";
      }

      return errors;
    },
  });
  return (
    <Wrapper>
      <form className={classes.fromControl} onSubmit={formik.handleSubmit}>
        <h2>Create Account</h2>
        <input
          className={`${classes.inputFields} ${
            formik.touched.userName && formik.errors.userName
              ? classes.error
              : ""
          }`}
          type="text"
          name="userName"
          placeholder="User Name"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <span className={classes.errorParagraph}>
            {formik.errors.userName}
          </span>
        ) : null}
        <input
          className={`${classes.inputFields} ${
            formik.touched.email && formik.errors.email ? classes.error : ""
          }`}
          name="email"
          type="email"
          placeholder="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <span className={classes.errorParagraph}>{formik.errors.email}</span>
        ) : null}
        <input
          className={`${classes.inputFields} ${
            formik.touched.password && formik.errors.password
              ? classes.error
              : ""
          }`}
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <span className={classes.errorParagraph}>
            {formik.errors.password}
          </span>
        ) : null}
        <input
          className={`${classes.inputFields} ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? classes.error
              : ""
          }`}
          name="confirmPassword"
          type="password"
          placeholder="Confrim Passowrd"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <span className={classes.errorParagraph}>
            {formik.errors.confirmPassword}
          </span>
        ) : null}

        <button className={classes.inputButton} type="submit">
          Sign Up
        </button>
        <p className={classes.already}>
          Already Have an account?{" "}
          <Link to="/login">
            <span style={{ fontWeight: "600", color: "rgb(106, 107, 14)" }}>
              Login
            </span>
          </Link>
        </p>
      </form>
    </Wrapper>
  );
}
