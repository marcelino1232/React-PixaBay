import React from 'react'

export default function SearchForm({onsubmitHandler,onsearchEvent}) {
  return (
    <div className='container-lg'>
      <form className='row bg-img g-3' onSubmit={onsubmitHandler}>
        <div className='form-floating col-12 col-md-9'>
          <input 
          id="txtsearch" 
          type="text" 
          className='form-control form-control-lg' 
          placeholder='Image Name...'
          name='search'
          onChange={onsearchEvent}
          title='only letters'
          pattern='[A-Za-z]+'
          required
          />
          <label htmlFor='txtsearch' className='form-label'>Image Name...</label>
        </div>
         <div className='col-12 col-md-3 d-grid'>
          <button type='submit' className='btn btn-outline-danger'>Search</button>
         </div>
      </form>
    </div>
  )
}
