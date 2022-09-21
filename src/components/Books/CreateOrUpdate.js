import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

function CreateOrUpdate() {
    const [book, setBook] = useState({});
    const navigate = useNavigate();

    const {bookId} = useParams();
    let isCreate = false;
    if (bookId === "create") {
        isCreate = true
    }

    useEffect(() => {
        const getBook = async () => {
            if (bookId === "create") {
                isCreate = true
            } else {

                try {
                    const {data: book} = await axios.get(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${bookId}`);
                    if (book.id) {
                        setBook(book);

                    } else {
                        navigate("../create")
                    }

                } catch (e) {
                    isCreate = true;
                    console.log("ahihi")
                    console.log(e.message)

                }

            }
        }
        getBook()


    }, [])

    const handleChange = event => {
        setBook({...book, [event.target.name]: event.target.value})
    }

    const handleCreate = async (event) => {
        event.preventDefault();

        const response = await axios.post("https://my-json-server.typicode.com/codegym-vn/mock-api-books/books", book);
        console.log(response)
        if (response.status === 201) {
            alert("Create successfully" + response.data.title)
            navigate(-1);
        } else {
            alert("Create failed");
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        const {id} = book;
        console.log(id)
        const response = await axios.put(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`, book);

        if (response.status === 200) {
            console.log(response);
            alert("Update successfully");
            navigate(-1);
        } else {
            alert("update failed");
        }
    }


    return (
        <div>
            {isCreate ? <h1>Create a book</h1> : <h1>Update book</h1>}
            <form onSubmit={isCreate ? handleCreate : handleUpdate}>
                <label htmlFor="title">Title</label>
                <br/>
                <input type="text"
                       name="title"
                       value={book?.title || ""}
                       onChange={handleChange}
                />
                <br/>
                <label htmlFor="title">Quantity</label>
                <br/>
                <input type="number"
                       name="quantity"
                       value={book?.quantity || ""}
                       onChange={handleChange}
                />
                <br/>
                {isCreate ? <button type="submit">Add</button> : <button type="submit">Update</button>}

            </form>


        </div>
    )

}

export default CreateOrUpdate;