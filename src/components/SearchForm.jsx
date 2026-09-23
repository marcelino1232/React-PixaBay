import React from 'react'

export default function SearchForm({onsubmitHandler}) {
  return (
    <div className='container-lg'>
      <form noValidate className='row bg-img g-3 needs-validation' onSubmit={onsubmitHandler} >
        <div className='form-floating  position-relative col-12 col-md-9'>
          <input 
          id="txtsearch" 
          type="text" 
          className='form-control form-control-lg' 
          placeholder='Image Name...'
          name='search'
          required
          />
          <label htmlFor='txtsearch' className='form-label'>Image Name...</label>
          <div className="invalid-feedback position">
            Please provide a image name.
          </div>
        </div>
         <div className='col-12 col-md-3 d-grid '>
          <button type='submit' className='btn btn-outline-danger'>Search</button>
         </div>
      </form>
    </div>
  )
}
