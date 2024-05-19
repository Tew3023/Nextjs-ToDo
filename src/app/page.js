'use client';

import { useState } from "react";
import Head from "next/head";
export default function Home() {
  const [text, setText] = useState({
    todo: '',
    author: ''
  });
  const [list, setList] = useState([]);
  const [currentID, setCurrentID] = useState(null);
  const [editing, setEditting] = useState(false);

  function onchangeHanddle(e) {
    const { name, value } = e.target;
    setText((prevText) => ({
      ...prevText,
      [name]: value
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (text.todo && text.author) {
      if (editing) {
        setList((prevList) =>
          prevList.map(item => item.id === currentID ? { ...item, text } : item)
        )
        setEditting(false);
        setCurrentID(null);
        setText({
          todo: '',
          author: ''
        });
      } else {
        const newText = {
          id: Date.now().toString(),
          text: text
        };
        setList((prevList) => [...prevList, newText]);
        setText({
          todo: '',
          author: ''
        });
      }
    }

  }

  function deleteList(id) {
    setList(list.filter(item => item.id !== id))
    if(editing){
      setText({
        todo: '',
        author: ''
      });
    }

  }

  function EditList(id) {
    const selectedList = list.find(item => item.id === id);
    setText(selectedList.text);
    setEditting(true);
    setCurrentID(id);

  }

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={onSubmit}>
        <h1 className="text-center text-red-700">TODO APP</h1>
        <h4>What do you want to do</h4>
        <input
          name="todo"
          value={text.todo}
          onChange={onchangeHanddle}
          placeholder="What do you want to do"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <h5 className="mt-2">By who</h5>
        <input
          name="author"
          value={text.author}
          onChange={onchangeHanddle}
          placeholder="Author"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-lg">Add Todo</button>
      </form>
      <ul className="mt-4">
        {list.map(item => (
          <li className="mt-2" key={item.id}>
            <span className="font-bold">{item.text.todo}</span> - <span>{item.text.author}</span> 
            <div>
              <button onClick={() => { EditList(item.id) }} className="text-green-600 font-bold ml-5">Edit</button>
              <button onClick={() => { deleteList(item.id) }} className="text-red-600 font-bold ml-5">Delete</button>
            </div>  
          </li>
        ))}
      </ul>
    </div>
  );
}
