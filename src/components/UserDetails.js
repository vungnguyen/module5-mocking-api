import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";


function UserDetails() {
    const [user, setUser] = useState();
    const [isCreate, setIsCreate] = useState(false)
    const {userId} = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        const getUserData = async () => {

            try {
                if (userId !== "create") {
                    const response = await axios.get(`http://localhost:9000/api/users/${userId}`);
                    const {data} = response;
                    console.log(data)
                    if (data.id) {
                        setUser(data);
                        setIsCreate(true);
                    } else {
                        navigate("/users/create")
                    }
                }

            } catch (err) {
                throw err;
            }
        }
        getUserData();
    }, []);

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleSubmit = async () => {
        const newUserInfo = user;
        const response = await axios.post("http://localhost:9000/api/users", newUserInfo);
        if (response.status === 201) {

            alert(
                `${isCreate ? "Edit" : "Create"} user ${JSON.stringify(
                    response.data
                )} successfully!!!`
            );
            navigate("..")
        }

    }
    return (
        <div>
            <h1>User details</h1>
            <form>
                <div>
                    <label>Id</label>
                    <input name="id" value={user?.id || ""} onChange={handleChange}/>
                </div>
                <div>
                    <label>Name</label>
                    <input name="name" value={user?.name || ""} onChange={handleChange}/>
                </div>
                <div>
                    <label>Birthday</label>
                    <input
                        type="date"
                        name="birthday"
                        value={user?.birthday || ""}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UserDetails;