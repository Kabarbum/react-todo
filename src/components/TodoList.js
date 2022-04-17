import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TodoItem from "./TodoItem";

const TodoList = ({list, dateList, removeTodo, editTodo}) => {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентябпя', 'Октября', 'Ноября', 'Декабря']

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let hashColor = '#';
        for (let i = 0; i < 6; i++) {
            hashColor += letters[Math.floor(Math.random() * 16)];
        }
        return hashColor
    }

    return (
        <div className="todo__list">
            {dateList.map(
                dateItem => {
                    let a = dateItem?.split('-')

                    return (
                        <div key={dateItem}>
                            <div className='titleOfDay'>{Number(a[2])} {months[Number(a[1]) - 1]} {a[0]}</div>
                            <div style={{position: 'relative'}}>
                                <span className='sideline' style={{backgroundColor: getRandomColor()}}/>
                                <TransitionGroup>
                                    {[...list].filter(el => el.date === dateItem).map(
                                        el =>
                                            <CSSTransition
                                                key={el.id}
                                                timeout={500}
                                                classNames="item"
                                            >
                                                <TodoItem
                                                    {...el}
                                                    removeTodo={removeTodo}
                                                    editTodo={editTodo}
                                                />
                                            </CSSTransition>
                                    )}
                                </TransitionGroup>
                            </div>

                        </div>

                    )

                }
            )}
        </div>
    );
};

export default TodoList;