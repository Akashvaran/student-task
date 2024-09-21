import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Todo } from '../Todo'
import { Login } from '../authantication/Login'
import { Table } from '../table/Table'

import { Singin } from '../authantication/Singin'
export const Mainrouding = () => {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Todo/>}/>
          <Route path='/signup' element={<Login />} />
          <Route path='/signin' element={<Singin />} />
          <Route path='/table' element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
