"use client";
import React, { use, useEffect, useState } from 'react'

import { countries } from 'country-data';
import Select from 'react-select'


const subCategory = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']



const NewsHome = () => {
  const [currentData, setCurrentData] = useState<any>([])
  const [searchResult, setsearchResult] = useState<any>('')
  const [message, setMessage] = useState<any>('');
  const [filterName, setFilterName] = useState('')
  const [countryCode, setCountryCode] = useState([])
  const [selectedCountry, setSelectedCountry] = useState<any>('')
  const [filterCodeCountry, setFilterCodeCountry] = useState('')
  const [subCate,setSubCate]=useState<any>('')
  const [searchInput,setSearchInput]=useState<any>('')
  const [query,setQuery]=useState<any>('')

  useEffect(() => {
    const newArr: any = countries.all.map((item: any) => {
      return ({
        value: item.alpha2,
        label: item.name
      })
    })
    setCountryCode(newArr)
    console.log(newArr);

  }, [])





  const handleChangeCountry = (e: any) => {
    const { value, label } = e
    setFilterCodeCountry(value)
    setSelectedCountry(label)
  }


 

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  console.log(query);
  
  

  const apiCall = async () => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?q=${query}&category=${subCate}&country=${filterCodeCountry}&apiKey=c42423938e4642ccaaa9e356c1f6a7b7`)
    const data = await response.json()
    console.log(data)
    console.log(`https://newsapi.org/v2/top-headlines/sources?q=${query}&category=${subCate}&country=${filterCodeCountry}&apiKey=c42423938e4642ccaaa9e356c1f6a7b7`);
    setCurrentData(data.sources)
  }

  useEffect(() => {
    apiCall()
  }, [query])



  const handleChangeInput=(event:any)=>{
    if(event.key='Enter'){
      setQuery(searchInput)
    }
  }


 
// code
  return (
    <>
      <section className='banner'>
        <div className='container'>
          <div className='banner-main'>
            <h1>News 24/7</h1>
            {/* <input type='search' placeholder='Search high-resolution images' onChange={handleChange}  value={message}  onKeyDown={handleKeyDown} /> */}
            <div className="filters">
              <p>Please select your country</p>
              <Select options={countryCode} className="select-country" defaultValue={selectedCountry} onChange={handleChangeCountry} />
            </div>
            <h4 className='head'>Select your News category</h4>
            <div className="categories">
              {subCategory.map((item) => {
                return (
                  <p className={item===subCate?"active":""} onClick={()=>{setSubCate(item)}}>{item}</p>
                )
              })}
            </div>
            <div className="filter">
              <input type="text" placeholder='type your search and enter' onChange={(e)=>{setSearchInput(e.target.value)}} onKeyDown={handleChangeInput}/>
            </div>
          </div>
        </div>
      </section>

      <section className='container-fluid'>
        <div className="row">
          {
            currentData?.map((item: any, index: any) => {
              return (
                <div key={item.id} className="column">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              )
            })
          }

        </div>
      </section>
    </>
  )
}

export default NewsHome