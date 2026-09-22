import React from 'react'

export default function ImageItem({item}) {
  return (
     <div className="card">
        <img src={item.previewURL} className="card-img-top img-size" alt="..." />
        <div className="card-body">
            <p className="card-text h3">{item.user}</p>
            <hr/>
            <div className='d-flex flex-column flex-md-row justify-content-between h4 g-5 text-center'>
                <div className='fw-bold'>
                    <p>View</p>{item.views}
                </div>
                <div className='fw-bold mt-3 mt-md-0'>
                    <p>Likes</p>{item.likes}
                </div>
            </div>
        </div>
        <div className='card-footer text-end'>
            <a href={item.largeImageURL} target='_black' className='btn btn-danger'>View Image</a>
        </div>
     </div>
  )
}
