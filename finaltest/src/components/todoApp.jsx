import { useEffect, useState } from "react"
import "../index.css"
import Todo from "./todo"
import { MdDelete } from "react-icons/md";


function Home() {
  const [menuActive, setMenuActive] = useState("all")
  const [todo, setTodo] = useState("")
  const [todoList, setTodoList] = useState([])
  const [reload, setReload] = useState(false)

  function handleChange(event) {
    setTodo(event.target.value)
  }

  function addTodo(event) {
    event.preventDefault()

    var item = {
      id: Math.random().toString() + todo,
      text: todo,
      checked: false
    }

    setTodoList(prev => {
      return [...prev, item]
    })

    setTodo("")
  }

  function deleteTodo(id) {
    const remainingItems = todoList.filter(item => {
      return item.id !== id
    })

    setTodoList(remainingItems)
  }

  function deleteCompleted() {
    const remainingItems = todoList.filter(item => {
      return item.checked !== true
    })

    setTodoList(remainingItems)
    setMenuActive("all")
  }

  useEffect(() => {}, [reload])

  return (
    <>
      <header className='header'>
        <h1 className='title'>#todo</h1>
      </header>

      <main className='main'>
        <div className='menu'>
          <div
            className='menuOption'
            onClick={() => setMenuActive("all")}
          >
            <span>All</span>
            <div
              className={
                menuActive === "all" ? 'underlineActive' : 'underline'
              }
            ></div>
          </div>

          <div
            className='menuOption'
            onClick={() => setMenuActive("active")}
          >
            <span>Active</span>
            <div
              className={
                menuActive === "active"
                  ? 'underlineActive'
                  : 'underline'
              }
            ></div>
          </div>

          <div
            className='menuOption'
            onClick={() => setMenuActive("completed")}
          >
            <span>Completed</span>
            <div
              className={
                menuActive === "completed"
                  ? 'underlineActive'
                  : 'underline'
              }
            ></div>
          </div>
        </div>
        <hr className='hr' />

        {menuActive !== "completed" ? (
          <form onSubmit={addTodo}>
            <div className='inputContainer'>
              <input
                type="text"
                name="todo"
                placeholder="add details"
                className='input'
                onChange={handleChange}
                value={todo}
              />

              <button
                type="submit"
                className='addButton'
                disabled={todo ? false : true}
              >
                Add
              </button>
            </div>
          </form>
        ) : null}

 
        {todoList
          ? todoList.map(item => {
              if (menuActive === "completed" && !item.checked) {
                return
              } else if (menuActive === "active" && item.checked) {
                return
              }

              return (
                <Todo
                  key={item.id}
                  menuActive={menuActive}
                  todo={item}
                  reload={reload}
                  setReload={setReload}
                  deleteTodo={deleteTodo}
                />
              )
            })
          : null}

        {menuActive === "completed" ? (
          <div className='deleteContainer'>
            <button
              type="button"
              className='deleteButton'
              onClick={deleteCompleted}
            >
              <MdDelete/>
              <span>Delete All</span>
            </button>
          </div>
        ) : null}
      </main>
    </>
  )
}
 export default Home