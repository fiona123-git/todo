import { useState } from "react";
import axios from "axios";

export function UpdateTodo({ _id, handleClose, handleUpdate }) {
    const [data, setData] = useState({ task: "" });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`http://localhost:8000/api/todo/${_id}`, data)
            .then((res) => {
                setData({ task:""});
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
    }

    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleUpdate();
                
            }}
        >
            <label htmlFor="task" className="label">
                task
            </label>
            <input
                type="text"
                name="task"
                className="input"
                onChange={handleChange}
            />
            
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}
