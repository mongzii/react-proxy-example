import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BookTable from './components/BookTable';
import TodoTable from './components/TodoTable';
import DisplayBoard from './components/DisplayBoard';
import CreateBook from './components/CreateBook';
import CreateTodo  from './components/CreateTodo';
import { getAllBooks, createBook, getAllTodos, createTodos } from './services/BookService';
import Footer from './components/Footer';

function App () {

  const [bookShelf, setBookShelf] = useState({});
  const [todoList, setTodoList] = useState({});
  const [books, setBooks] = useState([]);
  const [todos, setTodos] =useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);
  const [numberOfTodos, setNumberOfTodos] = useState(0);

  
  const handleSubmit = () => {
      createBook(bookShelf)
        .then(() => {
          setNumberBooks(numberOfBooks+1);
      });
  }

  const handleTodoSubmit = () => {
    createTodos(todoList)
      .then(() => {
        setNumberOfTodos(numberOfTodos+1);
    });
}

  const getAllBook = () => {
    getAllBooks()
      .then(data => {
        setBooks(data);
        setNumberBooks(data.length);
      });
  }

  const getAllTodo = () => {
    getAllTodos()
      .then(data => {
        setTodos(data);
        setNumberOfTodos(data.length);
      })
  }

  const handleOnChangeForm = (e) => {
      let inputData = bookShelf;
      if (e.target.name === 'book') {
        bookShelf.book = e.target.value;
      } else if (e.target.name === 'category') {
        bookShelf.category = e.target.value;
      } else if (e.target.name === 'author') {
        bookShelf.author = e.target.value;
      }
      setBookShelf(inputData);
  }
  const handleOnChangeTodoForm = (e) => {
    let inputData = todoList;
    if (e.target.name === 'todo') {
      todoList.todo = e.target.value;
    } else if (e.target.name === 'category') {
      todoList.category = e.target.value;
    } else if (e.target.name === 'isComplete') {
      todoList.isComplete = e.target.value;
    }
    setTodoList(inputData);
}

  
  return (
    <div className="main-wrapper">
      <div className="main">
        <Header />
        <CreateBook 
          bookShelf={bookShelf}
          onChangeForm={handleOnChangeForm}
          handleSubmit={handleSubmit}
        />
        <CreateTodo 
          todoList={todoList}
          onChangeForm={handleOnChangeTodoForm}
          handleSubmit={handleTodoSubmit}
        />
        <DisplayBoard 
          numberOfBooks={numberOfBooks} 
          getAllBook={getAllBook} 
          getAllTodo={getAllTodo} 
          numberOfTodos={numberOfTodos}
        />
        <BookTable books={books} />
        <TodoTable todos={todos} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
