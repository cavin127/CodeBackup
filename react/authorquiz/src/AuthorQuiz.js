import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';


function Hero(){

    return(
      <div className="row">
        <div className="jumbotron col-10 offset-1">
          <h1>Author Quiz</h1>
          <p>Ready to play the game???</p>
        </div>
      </div>

    );
}

function Book({title,onClick}){
return(
  <div className="answer" onClick={() => {onClick(title);}}><h4>{title}</h4></div>
)

}


function Turn({author,books,highlight,onAnswerSelected}){

  function highlightToBgColor(highlight){

    const mapping = {
      'none':'',
      'correct':'green',
      'wrong':'red'

    }
    return mapping[highlight];
  }
  return(
    <div className="jumbotron col-10 offset-1">
    <div className="row turn" style={{backgroundColor : highlightToBgColor(highlight)}}>
        
        <div className="col-4">
            <img src={author.imageUrl} className="authorimage" alt="Author"/>
        </div>
        <div className="col-6">
           {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
        </div>
      </div>
    </div>

  );
}
function Continue(){

  return(
    <div/>
  );
}

function Footer(){

  return(
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <div className="footer-lower">
            <div className="media-container-row mbr-white">
                <div className="col-sm-12 copyright">
                    <p className="mbr-text mbr-fonts-style display-7">
                        &copy; Copyright 2018 <b>Author Quiz</b> - All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  
  );
}
function AuthorQuiz ({turnData ,highlight,onAnswerSelected}) {
      return (
      <div className="container-fluid">
        <Hero/>
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue/>
        <Footer/>
      </div>
    );
  }


export default AuthorQuiz;
