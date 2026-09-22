import {useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'

import SearchForm from './components/SearchForm';
import Loading from './components/Loading';
import EmptyList from './components/EmptyList';
import ImageList from './components/ImageList';
import PixaBayTitle from './components/PixaBayTitle';
import Pagination from './components/Pagination';

function App() {

  const params = useRef({
    search:"",
    columnRows:12,
    page:1
  });

  const [data, setData] = useState({
    loading:true,
    total:0,
    totalHits:0,
    hits:[]
  });

  async function onloadEvent(search, page)
  {
    if(params.current.search.length > 0){
      setData(prev => ({...prev,loading:false}));
      const request = await fetch(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_KEY}&q=${search}&per_page=${params.current.columnRows}&page=${page}`);
      const response = await request.json();
      setData({...response,loading:true});
    }else{
      setData({
        loading:true,
        total:0,
        totalHits:0,
        hits:[]
      });
    }
  }

  const onsubmitHandler = async(e) =>{
    e.preventDefault();
    params.current.page = 1;
    await onloadEvent(
      params.current.search,
      params.current.page
    );
  }

  const onsearchEvent = (e) => {
    e.preventDefault();
    const {name,value} = e.target;
    params.current = {...params.current,[name]:value};
  }

  const onpageEvent = async(e,status = true) => {
    e.preventDefault();
    if(status){
      params.current.page = params.current.page + 1 
    }else{
      params.current.page = params.current.page - 1;
    }
    await onloadEvent(
      params.current.search,
      params.current.page
    );
  }

  return (
    <>
    <PixaBayTitle />

    <SearchForm onsearchEvent={onsearchEvent} onsubmitHandler={onsubmitHandler} />
    
    <div className='container-fluid my-5'>
      <div className='row g-4'>
        {!data.loading ? (<Loading />) : 
          (data.hits.length > 0 ? 
          (<ImageList data={data} />) : (<EmptyList />))
        }
      </div>
    </div>

    <Pagination data={data} params={params} onpageEvent={onpageEvent} />
    </>
  )
}

export default App
