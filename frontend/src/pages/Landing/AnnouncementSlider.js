

import {React, useState, useEffect} from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./Images";
import "./AnnouncementSlider.css"
import Moment from 'react-moment';



const AnnouncementSlider = ({announcements}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = announcements.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 10000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    // console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    // console.log("prev");
  };

//   function auto() {
//     slideInterval = setInterval(nextSlide, intervalTime);
//   }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

//   useEffect(() => {
//     if (autoScroll) {
//       auto();
//     }
//     return () => clearInterval(slideInterval);
//   }, [currentSlide]);

  return (
    <div className="announcementslider">
      <AiOutlineArrowLeft className="arrow_as prev_as" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow_as next_as" onClick={nextSlide} />

{announcements.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "announcementslide"}
            key={index}
          >
            {index === currentSlide && (
              <div className='announcement'>
                {/* <img src={slide.announcementBody} alt="slide" className="slide_image" /> */}
                <div className='announcementtitle'>
                <h1>{slide.announcementTitle}</h1>
                </div>
                
                <div className='announcementbody'>
                <h3>{slide.announcementBody}</h3>
                </div>

                <div className='announcementfooter'>
                <h4>Date Published : <Moment format="DD/MM/YYYY" 
                // date={formattedStartTime(item.startTime)}
                date={slide.date}
                /></h4>
                </div>
               
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnnouncementSlider
