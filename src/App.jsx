import {useEffect, useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'

import SearchForm from './components/SearchForm';
import Loading from './components/Loading';
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
    error:false,
    total:0,
    totalHits:0,
    hits:[]
  });

  async function onloadEvent(search,page){
    setData(prev => ({...prev,loading:false}));
    const request = await fetch(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_KEY}&q=${search}&per_page=${params.current.columnRows}&page=${page}`);
    const response = await request.json();
    setData({...response,loading:true,error:response.hits.length <= 0});
    
  }

  useEffect(() => {
   if(data.error){
    const timer = setTimeout(() => setData(prev => ({...prev,error:false})),1000);

    // 2. Return a cleanup function to clear the timeout
    return () => clearTimeout(timer);
   }
  },[data.error]);

  const onsubmitHandler = async(e) => {
    e.preventDefault();
    if(e.target.checkValidity())
    {
      const formData = new FormData(e.currentTarget);

      params.current.search = formData.get("search");
      params.current.page = 1;

      e.target.reset();
      e.target.classList.remove("was-validated");

      await onloadEvent(params.current.search,params.current.page);
    }else{
      e.target.classList.add('was-validated')
    }
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
    
    {data.error && (<p className="alert alert-danger border border-0 rounded-0 text-center h4">Sorry but the image was not found...</p>)}
    
    <SearchForm  onsubmitHandler={onsubmitHandler} />
    
    <div className='container-fluid my-5'>
      <div className='row g-4'>
        {!data.loading ? (<Loading />) : 
          (data.hits.length > 0 && (<ImageList data={data} />))
        }
      </div>
    </div>

    <Pagination data={data} params={params} onpageEvent={onpageEvent} />
    </>
  )
}

export default App
