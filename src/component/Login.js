import React, { useState } from "react";
import gbLogo from "../assets/titlelogo.png"
import { useFormik } from "formik";
import * as Yup from "yup";
import http from '../utilities/api';
import InvalidDialog from '../shared component/InvalidDialog';
import { useNavigate } from "react-router-dom";

function Login() {

  // Dailog variable
  const [errorDia, setErrorDia] = useState(false);
  const [errorDiaMsg, setErrorDiaMsg] = useState('');

  // Close Dialog function
  const closeErrorDia = () => {
    setErrorDia(false);
  }

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const resp = await http.post(`auth/login`, values)
        if (resp?.data?.success === true) {
          const token = resp.data.data.token;
          localStorage.setItem('token', token);
          navigate('/');

        }
        else if (resp?.data?.success === false) {
          setErrorDiaMsg(resp.data.message);
          setErrorDia(true)
        }
      } catch (error) {
        setErrorDiaMsg(error?.response?.data?.message);
        setErrorDia(true);
      }

    },
  });
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center login"
      style={{
        height: "100vh"
      }}
    >
      <div className="text-center my-3">
        <img src={gbLogo} height="100px" />
      </div>
      <div className="d-flex flex-column p-3 rounded loginDetails">
        <div className="mb-4">
          <h5>
            Sign In to <span style={{color : '#d54e38',}} >Gamebadlo</span> Dashboard
          </h5>
        </div>
        <form onSubmit={formik.handleSubmit} className="my-3">
          <div className="d-flex flex-column">
            <div className="mb-4">
              <label className="form-label" htmlFor="userName">
                <strong>Username:</strong>
              </label>
              <input
                name="userName"
                id="userName"
                type="text"
                placeholder="Enter User Name"
                className="form-control"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <small className="error-msg">{formik.errors.userName}</small>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                <strong>Password:</strong>
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Enter Password"
                className="form-control"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <small className="error-msg">{formik.errors.password}</small>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn my-3 fs-5 text-white" style={{ backgroundColor: '#db6553' }}
              disabled={!formik.isValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <InvalidDialog opendia={errorDia} DiaMsg={errorDiaMsg} closedia={closeErrorDia} />
    </div>
  );
}

export default Login;
