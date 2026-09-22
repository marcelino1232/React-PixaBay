import React from 'react'

export default function Pagination({data, params,onpageEvent}) {
  return (
    <>
    {
      data.totalHits > 0 && (
        <div className=' container my-4 d-flex justify-content-center'>
            <nav className='' aria-label="Page navigation example">
                <ul className="pagination pagination-lg">
                    {params.current.page > 1 && (<li className="page-item"><button className="page-link" onClick={(e) => onpageEvent(e,false)}>Previous</button></li>)}
                    {Math.ceil(data.totalHits / params.current.columnRows) > params.current.page &&(<li className="page-item"><button className="page-link" onClick={onpageEvent}>Next</button></li>)}
                </ul>
            </nav>
        </div>
      )
    }
    </>
  )
}
