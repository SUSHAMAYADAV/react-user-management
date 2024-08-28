import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TablePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const deleteData = (deleteId) => {
    const filteredData = data.filter((item) => item.id !== deleteId);
    setData(filteredData);
    localStorage.setItem("userData", JSON.stringify(filteredData));
  };

  const editData = (item) => {
    localStorage.setItem("editRow", JSON.stringify(item));
    navigate("/");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>TableList</h2>
      <div>
        <table style={{ width: "90%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Password</th>
              <th>PhoneNo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>{item.phoneNo}</td>
                  <td>
                    <button
                      onClick={() => editData(item)}
                      style={{ marginRight: "5px",color:'blue',margin:'4px 10px' }}
                    >
                      Edit
                    </button>
                    <button
                    style={{color:'red',marginLeft:'15px'}}
                     onClick={() => deleteData(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablePage;

