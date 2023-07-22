import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Space, Switch } from "antd";
import { Book } from "../../types/books";
import data from '../../files/books'
import { getBooksArray } from "../../contexts/GlobalContext";

export default function SortBooks(): JSX.Element {

  const { setBookList } = useContext(GlobalContext)

  return (  
    <div>
      <Space direction="horizontal">
        <Switch 
          checkedChildren="A-Z" 
          unCheckedChildren="Z-A"
          style={{ backgroundColor: '#4096ff' }}
          onChange={(checked => setBookList(sortBookListByName(getBooksArray(data), checked)))}
        />
         <Switch 
          checkedChildren="New" 
          unCheckedChildren="Old"
          style={{ backgroundColor: '#4096ff' }}
          onChange={(checked => setBookList(sortBookListByYear(getBooksArray(data), checked)))}
        />
      </Space>
    </div>
  )
}

const sortBookListByYear = (books: Book[], desc: boolean = false): Book[] => {
  let newBookList = [...books];
  newBookList.sort((a, b) => {
    if(a.year < b.year) return -1
    if(a.year > b.year) return 1
    return 0
  })
  if(desc) newBookList.reverse()
  return newBookList;
}

const sortBookListByName = (books: Book[], desc: boolean = false) => {
  let newBookList = [...books];
  newBookList.sort((a, b) => {
    if(a.title.localeCompare(b.title) < 0) return 1
    if(a.title.localeCompare(b.title) > 0) return -1
    return 0
  })
  if(desc) newBookList.reverse()
  return newBookList
}