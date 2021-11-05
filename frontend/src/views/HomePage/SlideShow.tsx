import React, { useEffect, useRef } from 'react';
import Flickity from "flickity";

import "flickity/dist/flickity.min.css";
import './home-slide.css';
import { Link } from 'react-router-dom';

const sliderContent = [
  {
    title: 'Demon Slayer',
    description: 'Tanjirou là con cả của gia đình vừa mất cha. Một ngày nọ, Tanjirou đến thăm thị trấn khác để bán than, khi đêm về cậu ở nghỉ tại nhà người khác thay vì về nhà vì lời đồn thổi về ác quỷ luôn rình mò gần núi vào buổi tối. Khi cậu về nhà vào ngày hôm sau, bị kịch đang đợi chờ cậu…',
    background: 'https://images.anime-pictures.net/d76/d76869ecc9312dac90dc471121e78327.jpg?if=ANIME-PICTURES.NET_-_689299-1616x1174-kimetsu+no+yaiba-ufotable-kamado+nezuko-kamado+tanjirou-xuefei+%28snowdrop%29-looking+at+viewer.jpg',
    url: '',
    className: 'sfh-left',
    color: '#000'
  },
]

const Slider = () => {
  const flickity = useRef<Flickity | null>(null);

  useEffect(function() {
    flickity.current = new Flickity("#slider", {
      wrapAround: true,
      autoPlay: 5000,
      initialIndex: Math.floor(Math.random()*sliderContent.length)
    });
    flickity.current.reloadCells();
    flickity.current.resize();

    return () => {
      flickity.current?.destroy();
    }
  }, []);

  return (
    <section id="slider" >
      {sliderContent.map((item, i) => 
        <div className={`overflow-hidden w-full bg-cover bg-center ${item.className}`} style={{ backgroundImage: `url(${item.background})` }} key={i} >
          <div className="hidden md:block relative w-full auto-height ">
            <div className="absolute bg-block bg-block-secondary"  style={{ backgroundColor: item.color }}></div>
            <div className="absolute bg-block bg-block-primary" style={{ backgroundColor: item.color }}></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 text-white w-1/4 sfh-content">
              <h2 className="text-xl lg:text-2xl xl:text-4xl font-extrabold">{item.title}</h2>
              <div className="sfh-divider my-2 lg:my-4 xl:my-10 w-1/5 h-0.5 bg-white rounded-full"></div>
              <p className="text-sm xl:text-base">{item.description}</p>
              <div className="mt-3 xl:mt-6 xl:text-lg">
                <Link className="inline-block px-4 py-1 lg:py-2 border border-white hover:text-black hover:bg-white transition" to={item.url}>
                  Đọc ngay
                </Link>
              </div>
            </div>
          </div>
          <div className="block md:hidden relative w-full auto-height ">
            <div className="absolute inset-x-0 bottom-0 h-20 opacity-70 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute inset-x-0 bottom-1 ml-2 text-white text-lg sm:text-3xl font-semibold sm:font-bold opacity-90">
              {item.title}
            </div>
            <Link className="absolute inset-0" to={item.url}></Link>
          </div>
        </div>
      )}
      <div className="overflow-hidden w-full bg-blue-600 auto-height"></div>
      <div className="overflow-hidden w-full bg-red-600 auto-height"></div>
    </section>
  );
}

export default Slider;
