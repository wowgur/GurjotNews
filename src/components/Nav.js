import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import NewsCard from './NewsCard';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

export default function  Nav() {
  const [state,setState] = useState({topic:"news",key:"news"})

  function query(a){
    document.getElementById("heading").innerHTML = `TOP HEADLINES - ${a.toUpperCase()}`
    document.title = `Harpreet - ${a.toUpperCase()}`
    setState({topic:a,key:a})
  }

    return (
      <div>
        <div style={{position:'fixed',zIndex:1000,width:100+'vw'}}>
        <nav className="navbar navbar-expand-lg bg-dark text-light">
          <div className="container-fluid">
            <a href="./fly.jpg"><img src="./fly.jpg" style={{borderRadius:"50%",height:"4.5vh",width:"4.5vh",marginRight:"1vw"}}/></a>
            <span className="navbar-brand text-light">Harpreet News</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item nav-link text-light" onClick={(e)=>{query(e.target.innerText)}}>
                  News
                </li>
                <li className="nav-item nav-link text-light" onClick={(e)=>{query(e.target.innerHTML)}}>
                  Sports
                </li>
                <li className="nav-item nav-link text-light" onClick={(e)=>{query(e.target.innerHTML)}}>
                  Politics
                </li>
                <li className="nav-item nav-link text-light" onClick={(e)=>{query(e.target.innerHTML)}}>
                  Entertainment
                </li>
                <li className="nav-item nav-link text-light" onClick={(e)=>{query(e.target.innerHTML)}}>
                  Business
                </li>
                <li className="nav-item nav-link text-light" onClick={(e)=>{query(e.target.innerHTML)}}>
                  Economics
                </li>
              </ul>
              <form className="d-flex" role="search" style={{float: 'right'}} onSubmit={(e)=>{e.preventDefault();query(document.getElementById("search").value);document.getElementById("search").value="";}}>
                <input id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
        <h3 id="heading" className="py-2" style={{color:'white',backgroundColor:'rgb(81, 81, 81)'}}>TOP HEADLINES - NEWS</h3>
        </div>
        <NewsCard key={state.key} q={state.topic}/>
      </div>
    )
  }

