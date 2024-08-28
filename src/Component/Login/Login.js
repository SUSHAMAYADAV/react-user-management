

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem("userData");
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return [];
    }
  });

  const [editRow, setEditRow] = useState(null);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    phoneNo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const editItem = localStorage.getItem("editRow");
    if (editItem) {
      const parsedEditItem = JSON.parse(editItem);
      setEditRow(parsedEditItem);
      setUserDetails(parsedEditItem);
      localStorage.removeItem("editRow"); 
    }
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const submitData = () => {
    let updatedData;
    if (editRow) {
      updatedData = data.map((item) =>
        item.id === editRow.id ? { ...item, ...userDetails } : item
      );
      setEditRow(null);
    } else {
      updatedData = [
        ...data,
        { ...userDetails, id: Math.floor(Math.random() * 10000) },
      ];
    }
    setData(updatedData);

    localStorage.setItem("userData", JSON.stringify(updatedData));

    setUserDetails({
      username: "",
      email: "",
      password: "",
      phoneNo: "",
    });

    navigate("/table");
  };
  const inputStyle = {
    width: "370px",
    height: "35px",
    paddingLeft: "30px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center",alignItems:'center',height:'100vh' }}>
    <div
      style={{
        backgroundColor: "#ebf1f3",
        width: "450px",
        borderRadius: "7px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Login</h2>
      <div>
        <input
          style={inputStyle}
          onChange={inputHandler}
          name="username"
          value={userDetails.username}
          type="text"
          placeholder="userName"
        />
      </div>
      <div>
        <input
          style={inputStyle}
          onChange={inputHandler}
          name="email"
          value={userDetails.email}
          type="email"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          style={inputStyle}
          onChange={inputHandler}
          name="password"
          type="password"
          placeholder="Password"
          value={userDetails.password}
        />
      </div>
      <div>
        <input
          style={inputStyle}
          name="phoneNo"
          onChange={inputHandler}
          type="number"
          placeholder="Phone-Number"
          value={userDetails.phoneNo}
        />
      </div>
      <div>
        <button
          style={{
            width: "375px",
            height: "35px",
            borderRadius: "30px",
            fontSize: "20px",
            fontWeight: "bold",
            margin: "10px 0px 20px 5px",
            cursor: "pointer",
          }}
          onClick={submitData}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  );
}

export default Login;
