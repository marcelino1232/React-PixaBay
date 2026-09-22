import React from 'react'
import ImageItem from './ImageItem'

export default function ImageList({data}) {
  return (
    <>
        {data.hits.map((item,index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <ImageItem item={item} />
            </div>
        ))}
    </>
  )
}
