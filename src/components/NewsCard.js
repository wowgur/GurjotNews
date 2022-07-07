import React, { Component, useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
var axios = require("axios").default;

export default function NewsCard(props){
  const [state,setState] = useState({articles:[],total:20});
  const [page,setPage] = useState(1);
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    setProgress(40);
    var options = {
      method: 'GET',
      url: 'https://api.newscatcherapi.com/v2/search',
      params: { q: `${props.q}`, lang: 'en', sort_by: 'relevancy', page: `${page}`, page_size: '20' },
      headers: {
        'x-api-key': 'YgdDSsekTlzVwHD8qO3of66LwwGL7hOKcehpyxJ_05Y'
      }
    };
    axios.request(options).then((response)=> {
      setProgress(50);
      setState({ articles: state.articles.concat(response.data.articles), total: response.data.total_hits});
      console.log(response.data.articles);
      setProgress(100);
    }).catch(function (error) {
      console.error(error);
      setProgress(0);
    });
  },[page,props.q])
  

  return (<div id="news">
    <LoadingBar
        color='blue'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <InfiniteScroll
        next={()=>{setState({articles:state.articles,total:state.total});setPage(page+1);console.log(page)}}
        hasMore={state.total!==state.articles.length}
        dataLength={state.articles.length} 
        loader={<div className="spinner-grow text-light my-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
        endMessage={
          <p style={{ textAlign: 'center' , color:'white'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        <div className="hargun" >
          {state.articles.map((element) => {
            let a = new Date(element.published_date);
            return (<div className="card mx-4 my-3 bg-muted" key={element.link}>
              <img src={element.media} className="card-img-top text-danger" alt="Couldn't load feed" />
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <p className="card-text">{element.summary.slice(0, 200)}</p>
                <p clasName="card-text"><small clasName="text-success">Published by {element.author!=null?element.author:"Anonymous"} on {`${a.getDate()}/${a.getMonth()+1}/${a.getFullYear()}`}</small></p>
                <a href={element.link} className="btn btn-dark">Read More</a>
              </div>
            </div>)
          })}
        </div>
      </InfiniteScroll>
      </div>
    )
  }
