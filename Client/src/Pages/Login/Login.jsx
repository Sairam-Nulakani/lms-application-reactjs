import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Space, Spin } from "antd";
import { adminLogin, studentLogin, tutorLogin } from "../../Redux/auth/action";
const Login = () => {
  const [formData, setFormData] = useState({
    type: "",
    email: "",
    password: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.type === "") {
      return messageApi.open({
        type: "error",
        content: "Please select user type.",
        duration: 3,
      });
    }
    setLoading(true);
    if (formData.type === "admin") {
      dispatch(adminLogin(formData)).then((res) => {
        if (res.message === "Wrong Credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong Credentials !",
            duration: 3,
          });
        } else if (res.message === "Error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
    if (formData.type === "tutor") {
      dispatch(tutorLogin(formData)).then((res) => {
        if (res.message === "User does not exist") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "User doesn't already exists , Please signup.",
            duration: 3,
          });
        } else if (res.message === "error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
    if (formData.type === "student") {
      dispatch(studentLogin(formData)).then((res) => {
        if (res.message === "User does not exist") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "User doesn't already exists , Please signup.",
            duration: 3,
          });
        } else if (res.message === "error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
  };

  if (auth.data.isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginImage">
          <img
            src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg"
            alt=""
          />
        </div>
        <div className="loginDetail">
          <div>
            <h3>Login</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <select name="type" onChange={handleFormChange}>
                <option value="">Select user type</option>
                <option value="admin">Admin</option>
                <option value="tutor">Tutor</option>
                <option value="student">Student</option>
              </select>
              <input
                required
                name="email"
                value={formData.id}
                onChange={handleFormChange}
                type="email"
                placeholder="Enter email"
              />
              <input
                required
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                placeholder="Enter password"
              />
              <p>
                Forgot Password ? <Link>Click Here</Link>
              </p>
              <button type="submit">
                {contextHolder}
                CONTINUE
              </button>
              {loading ? (
                <Space
                  style={{
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    top: "0",
                    left: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItem: "center",
                  }}
                >
                  <Spin size="large"></Spin>
                </Space>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
