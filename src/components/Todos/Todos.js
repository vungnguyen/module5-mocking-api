import {Component} from 'react';
import axios from 'axios';

export default class Todos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: "",
            todos: []
        }
    }

    async componentDidMount() {
        const {data: todos} = await axios.get("https://jsonplaceholder.typicode.com/todos")
        this.setState({todos: todos.slice(0, 10)});
    }

    handleChange = (event) => {
        this.setState({todo: event.target.value})
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.todo) {
            const newTodo = {
                title: this.state.todo
            }

            const {data} = await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
            this.setState({todo: ""})
            console.log(data)
            alert("Add todo success " +data.title)
        } else {
            alert("Input empty!")
        }
    }

    render = () => {
        const {todos} = this.state;

        return (
            <div>
                <h1>Todos List</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                           name="todo"
                           value={this.state.todo}
                           onChange={this.handleChange}
                    />
                    <button type={"submit"}>Add</button>
                </form>
                <ul>
                    {
                        todos.map(item => (
                            <li key={item.id}>{item.title}</li>
                        ))
                    }
                </ul>

            </div>
        )
    }


}