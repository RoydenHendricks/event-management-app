import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./register.login.css";

const Register = () => {
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    // validation schema
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    // submit function
    onSubmit: (values, { setSubmitting }) => {
      axios
        .post(process.env.REACT_APP_REGISTER_URL, values)
        .then((result) => {
          if (result.data === "Already registered") {
            // if the is already registered send an alert and navigate to login page
            alert("E-mail already registered! Please Login to proceed.");
            navigate("/login");
          } else {
            // navigate to login page once the registration is successful
            navigate("/login");
          }
        })
        // error handling
        .catch((err) => console.log(err))
        // setting submitting to false
        .finally(() => setSubmitting(false));
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-heading">Register</h2>
        <form className="register-form" onSubmit={formik.handleSubmit}>
          <div className="input-container">
            <label htmlFor="username" className="form-label">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="form-control"
              id="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-danger">{formik.errors.username}</div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="email" className="form-label">
              <strong>Email Id</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>

          <div className="button-container">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              Register
            </button>

            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Already have an account?
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
