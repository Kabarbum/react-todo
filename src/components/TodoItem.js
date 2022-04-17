import React from 'react';
import MyButton from "./UI/MyButton/MyButton";

const TodoItem = ({id, body, date, removeTodo, editTodo}) => {

    return (
        <div className="todo__item">
            <div>
                <p>{body}</p>
            </div>
            <div className="btns">
                <MyButton color='#8A3B00' onClick={() => editTodo(id, body, date)}>Изменить</MyButton>
                <MyButton color='#FF1E00' onClick={() => removeTodo(id)}>X</MyButton>
            </div>
        </div>
    );
};

export default TodoItem;