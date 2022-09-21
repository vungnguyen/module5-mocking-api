import {useState, useEffect} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";


function BookManager() {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getBooks = async () => {
            const {data} = await axios.get("https://my-json-server.typicode.com/codegym-vn/mock-api-books/books");
            setBooks(data)
        }
        getBooks();


    }, []);

    const handleDelete = async (id) => {

        if(window.confirm("Delete?")) {
            const response = await axios.delete(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`);
            if(response.status === 200) {
                alert("Delete successfully")
                navigate(-1)
            } else {
                alert("Delete failed");

            }

        }


    }


    return (
        <div>
            <h1>Library</h1>
            <Link to={"create"}>
                <button>Add new Book</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Qunatity</th>
                    <th colSpan={2}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.quantity}</td>

                            <td>
                                <Link to={`${book.id}`}>
                                    <Button variant={"contained"}>Edit</Button>
                                </Link>
                            </td>
                            <td>
                                <Button variant={"contained"}
                                        onClick={() => {
                                            handleDelete(book.id)
                                        }}

                                >Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>


        </div>
    )

}

export default BookManager;
