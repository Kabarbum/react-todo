import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TodoItem from "./TodoItem";

const TodoList = ({list, dateList, removeTodo, editTodo}) => {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let hashColor = '#';
        for (let i = 0; i < 6; i++) {
            hashColor += letters[Math.floor(Math.random() * 16)];
        }
        return hashColor
    }

    const getDate = () => {
        const date = new Date()

        return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
    }
    return (
        <div className="todo__list">
            {dateList.map(
                dateItem => {
                    let a = dateItem?.split('-')
                    let classes = ["titleOfDay"]
                    console.log(dateItem, getDate(), dateItem < getDate())
                    classes.push(dateItem < getDate() ? "expired" : null)
                    return (
                        <div key={dateItem}>
                            <div className={classes.join(' ')}>{Number(a[2])} {months[Number(a[1]) - 1]} {a[0]}</div>
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