import { React, useContext } from "react";
import classes from "./login.module.css";
import Wrapper from "../Components/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthContext from "../Store/auth-context";
export default function Login() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      authCtx.loginIntoApp(values);
      resetForm({ values: "" });
      navigate("/");
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Please Enter Email Address";
      } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
        errors.email = "Please Enter Valid Email Address";
      }
      if (!values.password) {
        errors.password = "Password is Required";
      } else if (!/(?=.{8,})/.test(values.password)) {
        errors.password = "Password Must be 8 Character Long";
      }

      return errors;
    },
  });

  return (
    <Wrapper>
      <form className={classes.fromControl} onSubmit={formik.handleSubmit}>
        <h2>Login</h2>

        <input
          className={`${classes.inputFields} ${
            formik.touched.email && formik.errors.email ? classes.error : ""
          }`}
          type="text"
          name="email"
          placeholder="Email"
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
        <button className={classes.inputButton} type="submit">
          Login
        </button>
        <p className={classes.already}>
          Don't Have an Account{" "}
          <Link to="/sign-up">
            <span style={{ fontWeight: "600", color: "rgb(106, 107, 14)" }}>
              Sign Up
            </span>
          </Link>
        </p>
      </form>
    </Wrapper>
  );
}
