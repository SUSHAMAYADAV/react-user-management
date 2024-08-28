import React, { useEffect, useState } from "react";

function AddBookDetails() {
  const [bookData, setBookData] = useState([]);
  const [editRow, setEditRow] = useState("");
  console.log("bookdata-->", bookData);
  const [bookList, setBookList] = useState({
    title: "",
    author: "",
    description: "",
    publicationDate: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBookList((bookList) => ({ ...bookList, [name]: value }));
  };

  useEffect(() => {
    if (editRow) {
      setBookList(editRow);
    } else {
      setBookList({
        title: "",
        author: "",
        description: "",
        publicationDate: "",
      });
    }
  }, [editRow]);

  const submitData = () => {
    if (editRow) {
      const updateData = bookData.map((value) =>
        value.id === editRow.id ? { ...editRow, ...bookList } : value
      );
      setBookData(updateData);
      setEditRow(null);
    } else {
      const addbook = {
        ...bookList,
        id: Math.floor(Math.random() * 10000),
      };
      setBookData([...bookData, addbook]);
      setBookList({
        title: "",
        author: "",
        description: "",
        publicationDate: "",
      });
    }
  };
  const deleteData = (deleteId) => {
    const res = bookData.filter((item) => item.id !== deleteId);
    setBookData(res);
  };

  const editData = (item) => {
    setEditRow(item);
  };

  const inputStyle = {
    borderRadius: "7px",
    fontSize: "16px",
    padding: "10px",
    width: "350px",
    marginTop: "4px",
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2px 0px",
        }}
      >
        <div
          style={{
            width: "430px",
            backgroundColor: "#f4eeef",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "0px 8px",
            margin: "1px 2px 2px 2px",
            rowGap: "0.5rem",
          }}
        >
          <h2>AddBookDetails</h2>
          <div>
            <input
              name="title"
              value={bookList.title}
              style={inputStyle}
              type="text"
              placeholder="Title"
              onChange={inputHandler}
            />
          </div>
          <div>
            <input
              name="author"
              value={bookList.author}
              style={inputStyle}
              type="text"
              placeholder="Author"
              onChange={inputHandler}
            />
          </div>
          <div>
            <input
              name="description"
              value={bookList.description}
              style={inputStyle}
              type="text"
              placeholder="Description"
              onChange={inputHandler}
            />
          </div>
          <div>
            <input
              name="publicationDate"
              value={bookList.publicationDate}
              style={inputStyle}
              type="date"
              placeholder="PublicationDate"
              onChange={inputHandler}
            />
          </div>
          <div>
            <button
              style={{
                width: "300px",
                fontSize: "15px",
                borderRadius: "7px",
                padding: "10px",
                marginBottom: "5px",
              }}
              onClick={submitData}
            >
              submit
            </button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>Table List</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>PublicationDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookData.length > 0 &&
              bookData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.description}</td>
                    <td>{item.publicationDate}</td>
                    <td>
                      <button
                        style={{
                          color: "red",
                          padding: "2px 12px 2px 12px",
                          borderRadius: "2px",
                          fontSize: "17px",
                          marginRight: "4px",
                        }}
                        onClick={() => deleteData(item.id)}
                      >
                        delete
                      </button>
                      <button
                        style={{
                          color: "blue",
                          padding: "2px 12px 2px 12px",
                          borderRadius: "2px",
                          fontSize: "17px",
                          marginLeft: "4px",
                        }}
                        onClick={() => editData(item)}
                      >
                        edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddBookDetails;
