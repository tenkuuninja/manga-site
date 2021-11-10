import React, { useEffect, useRef } from 'react';
import Flickity from "flickity";

import "flickity/dist/flickity.min.css";
import './home-slide.css';
import { Link } from 'react-router-dom';

const sliderContent = [
  {
    title: 'Naruto',
    description: 'Naruto là câu chuyện về Uzumaki Naruto, một cậu bé mồ côi trẻ với ước mơ trở thành Hokage, người lãnh đạo của làng Lá để tìm kiếm sự công nhận từ mọi người.',
    background: 'https://i.imgur.com/1tvBZ7L.jpg',
    url: '/truyen-tranh-7050-naruto-full-color.html',
    className: 'sfh-is-left',
    color: '#000'
  },
  {
    title: 'Demon Slayer',
    description: 'Tanjirou là con cả của gia đình vừa mất cha. Một ngày nọ, Tanjirou đến thăm thị trấn khác để bán than, khi đêm về cậu ở nghỉ tại nhà người khác thay vì về nhà vì lời đồn thổi về ác quỷ luôn rình mò gần núi vào buổi tối. Khi cậu về nhà vào ngày hôm sau, bị kịch đang đợi chờ cậu…',
    background: 'https://i.imgur.com/wQ5INSq.jpeg',
    url: '/truyen-tranh-2708-thanh-guom-diet-quy.html',
    className: 'sfh-is-left',
    color: '#000'
  },
  {
    title: 'One Piece',
    description: 'One Piece kể về cuộc hành trình của Monkey D. Luffy - thuyền trưởng của băng hải tặc Mũ Rơm và các đồng đội của cậu. Luffy tìm kiếm vùng biển bí ẩn nơi cất giữ kho báu lớn nhất thế giới One Piece, với mục tiêu trở thành Tân Vua Hải Tặc.',
    background: 'https://i.imgur.com/s29Zffi.png',
    url: '/truyen-tranh-7131-dao-hai-tac.html',
    className: 'sfh-is-right',
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
    </section>
  );
}

export default Slider;
