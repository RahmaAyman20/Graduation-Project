import React from 'react';

const ReviwesCard = ({ Key2,name,email,sentiment,body, loading }) => {
  const Star = ({ filled }) => {
    return (
      <span style={{ color: filled ? 'gold' : 'lightgray' }}>
        &#9733;
      </span>
    );
  };
  const Rating = ({ rating }) => {
    const filledStars = 5;
     const stars = Array.from({ length: 5 }, (_, index) => (
      <Star key={index} filled={index < filledStars} />
    ));
  
    return <i>{stars}</i>;
  };
  const imgs=`asset/images${Math.floor(Math.random() * 10) + 1}.png`
  if (loading) {
    return <h5>Loading...</h5>;
  }

  return (
    <ul className='list-group mb-4'>
       <div className="border rounded shadow p-3 mb-2 " style={{textAlign:"left",position:'relative'}} key={Key2}>
       <img src={imgs} style={{width: '34px',position: 'absolute',top:'-11px',left: '-9px',widows:'10px',borderRadius:'33px'}}/>
       <span>{name}</span> <span style={{color:"green",fontSize:"xx-small"}}>{sentiment > 0 ? 'Positive' :sentiment< 0 ? 'Negative' : 'Neutral'} </span><br/>  
        <Rating/> <span className="text-muted">4.89</span><br/>
        <p style={{fontSize:"small"}}>{body}</p>
        
       </div>
    </ul>
  );
};

export default ReviwesCard;