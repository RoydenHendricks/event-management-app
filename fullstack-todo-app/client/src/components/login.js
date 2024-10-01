import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./register.login.css";

const Login = () => {
  const navigate = useNavigate();

  // Validation schema for Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,

    // function i triggered when for is submitted
    // sending a post request  to the server using the form values
    onSubmit: (values, { setSubmitting }) => {
      axios
        .post(process.env.REACT_APP_LOGIN_URL, values)
        .then((result) => {
          // if the server responds with a token a alert is shown
          if (result.data.token) {
            alert("Login successful!");
            // token is stored in the local storage
            localStorage.setItem("token", result.data.token);
            // navigating to the todo page once the user has successfully logged in
            navigate("/todo");
          } else {
            // if the server does not respond with a token an alert is shown
            alert(
              result.data.message ||
                "Incorrect email or password! Please try again."
            );
          }
        })
        // error handling
        .catch((err) => console.log(err))

        .finally(() => setSubmitting(false));
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={formik.handleSubmit} className="register-form">
          <h2 className="login-header">Login</h2>
          <div className="login-input">
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className={`form-control ${
                formik.errors.email && formik.touched.email ? "is-invalid" : ""
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="error text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="login-input">
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              placeholder="Password"
              className={`form-control ${
                formik.errors.password && formik.touched.password
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="error text-danger">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="mt-3 text-center">
            <p className="mb-2">Don't have an account?</p>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
