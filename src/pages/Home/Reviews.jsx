import React, { useRef } from 'react';
import placeholder from '../../assets/images/home/placeholder.jpg';
import stars from '../../assets/images/home/stars.webp';
import arrow from '../../assets/images/home/arrow.svg';

function Reviews() {
  const reviews = [
    {
      profile: placeholder,
      name: 'Elio',
      review: 'This app is incredible, absolutely in love with it',
    },
    {
      profile: placeholder,
      name: 'Sophia',
      review: 'SportTrackr helped me stay organized and focus on my game!',
    },
    {
      profile: placeholder,
      name: 'Liam',
      review: 'Joining leagues has never been this easy. Fantastic experience!',
    },
    {
      profile: placeholder,
      name: 'Olivia',
      review: 'I love how it keeps track of everything so seamlessly. Highly recommend!',
    },
    {
      profile: placeholder,
      name: 'Noah',
      review: 'The best app for anyone serious about their sport. Great features!',
    },
    {
      profile: placeholder,
      name: 'Emma',
      review: 'From joining a team to scheduling games, it does everything. Love it!',
    },
  ];

  const reviewsContainerRef = useRef(null);

  const scrollLeft = () => {
    const scrollAmount = window.innerWidth <= 440 ? -270 : -380;
    reviewsContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };
  
  const scrollRight = () => {
    const scrollAmount = window.innerWidth <= 440 ? 270 : 380;
    reviewsContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="reviews">
      <div>
        <h2>What our athletes and users say about us</h2>
      </div>
      <div className="review-carousel">
        <button className="arrow-l arrow" onClick={scrollLeft}>
          <img src={arrow} alt="Scroll left" />
        </button>
        <div className="individual-reviews" ref={reviewsContainerRef}>
          {reviews.map((review, i) => (
            <div key={i} className="review">
              <div className="review-header">
                <img src={review.profile} alt={`${review.name}'s profile`} />
                <h5>{review.name}</h5>
              </div>
              <p>{review.review}</p>
              <div className='stars-div'>
              <img src={stars} alt="Rating stars" />
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-r arrow" onClick={scrollRight}>
          <img src={arrow} alt="Scroll right" />
        </button>
      </div>
    </div>
  );
}

export default Reviews;
