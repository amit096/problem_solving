import { useState } from "react"

export default function CreateTodo(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function ontitleChange(e) {
        setTitle(e.target.value);
    }


    function onDescriptionChange(e) {
        setDescription(e.target.value);
    }

    return (<>
        <div>
            <input placeholder="title" value={title} onInput={(e) => { ontitleChange(e) }} />
        </div>
        <div>
            <input placeholder="description" value={description} onInput={(e) => { onDescriptionChange(e) }} />
        </div>
        <div>
            <button onClick={() => { props.addTodo(title, description) }}>Add todo</button>
        </div>
    </>
    )
}