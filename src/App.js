import MyButton from "./components/UI/MyButton/MyButton";
import React, {useEffect, useMemo, useState} from "react";
import TodoList from "./components/TodoList";

function App() {
    const [task, setTask] = useState({id: "", body: "", date: ""})
    const [isEdited, setIsEdited] = useState(false)
    const [list, setList] = useState([
        {id: 1, body: 'my bday', date: "2022-04-12"},
        {id: 2, body: 'new year', date: "2022-12-31"},
        {id: 3, body: 'CHRISTMAS TIME', date: "2022-05-08"},
        {id: 4, body: 'CHRISTMAS TIME2', date: "2022-05-08"},
    ])
    const [dateList, setDateList] = useState([])

    const removeTodo = (id) => {
        if (task.id === id) {
            resetTask()
            setIsEdited(false)
        }
        setList(list.filter(todo => todo.id !== id))
    }
    const editTodo = (id, body, date) => {
        setTask({id, body, date})
        setIsEdited(true)
    }
    const saveTodo = () => {
        setList(list.map(obj => obj.id === task.id ? task : obj))
        resetTask()
        setIsEdited(false)
    }
    const resetTask = () => {
        const date = new Date()
        setTask({
            id: Date.now(),
            body: '',
            date: `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
        })
    }
    const addTodo = () => {
        setList([...list, task])
        resetTask()
    }
    const setDateToday = () => {
        const date = new Date()
        setTask({
            ...task,
            date: `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
        })
    }
    const setDateTomorrow = () => {
        const date = new Date()
        setTask({
            ...task,
            date: `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate()+1 > 9 ? date.getDate()+1 : '0' + date.getDate()+1}`
        })
    }

    useEffect(() => {
        setDateList(getDateList())
    }, [list])

    const sortedList = useMemo(() => {
        return [...list].sort((a, b) => {
            return a.date.localeCompare(b.date)
        })
    }, [list])

    useEffect(() => {
        resetTask()
    }, [])

    function getDateList() {
        let arr = []
        for (let i = 0; i < list.length; i++) {
            if (!arr.includes(list[i].date))
                arr.push(list[i].date)
        }
        return arr.sort()
    }

    return (
        <div className="App">
            <div className="todo__wrapper">

                <div className='title'>
                    <h1>Список дел /></h1>
                    <p>Не забывать задачи - это просто!</p>
                </div>

                <div className='addForm'>
                    <div className='addForm__head'>
                        <input className='task__input'
                               placeholder='Введите задачу...'
                               value={task.body}
                               onChange={e => setTask({...task, body: e.target.value})}
                        />
                        {isEdited
                            ?
                            <MyButton
                                color='#FFEF18'
                                onClick={saveTodo}
                            >Сохранить
                            </MyButton>
                            :
                            <MyButton
                                color='#222'
                                onClick={addTodo}
                            >Добавить</MyButton>
                        }
                    </div>

                    <div>
                        <button className='setdate' onClick={setDateToday}>сегодня</button>
                        <button className='setdate' onClick={setDateTomorrow}>завтра</button>
                        <input type="date"
                               className='date__input'
                               value={task.date}
                               min={task.date}
                               onChange={e => setTask({...task, date: e.target.value})}
                        />
                    </div>

                </div>
                <TodoList dateList={dateList} list={sortedList} editTodo={editTodo} removeTodo={removeTodo}/>


            </div>
        </div>
    );
}

export default App;
