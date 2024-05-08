import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import anime from 'animejs';

const Load = () => {
  const counterEle = useRef(null);

  const updateCounter = () => {
    let currentValue = 0;
    const interval = setInterval(() => {
      if (currentValue < 100) {
        let incre = Math.floor(Math.random() * 10) + 1;
        currentValue = Math.sin(currentValue + incre, 100);
        counterEle.current.textContent = currentValue;

        let delay = Math.floor(Math.random() * 200) + 25;
        setTimeout(updateCounter, delay);
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  const textWrapRef = useRef(null);

  useGSAP(() => {
    const textWrap = textWrapRef.current;
    textWrap.innerHTML = textWrap.textContent.split('').map(char => `<span className="letter">${char}</span>`).join('');

    anime.timeline({loop: false})
    .add({
        targets: '.ml16',
        translateY: [-100, 0],
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 30 * i
    })
    .add({
        targets: textWrap,
        translateY: [0,1000],
        easing: "easeOutExpo",
        duration: 3000,
        delay: (el, i) => 2000 + 30 * i
    });

    

    gsap.to(".pre-loader", {
        scale: 0.5,
        ease: 'power4.InOut',
        duration: 2,
        delay: 3
    })


    gsap.to(".loader", {
        height: "0",
        ease: 'power4.InOut',
        duration: 1.5,
        delay: 3.75
    })


    gsap.to(".loader-bg", {
        height: "0",
        ease: 'power4.InOut',
        duration: 1.5,
        delay: 4
    })



    gsap.to(".loader-2", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: 'power4.InOut',
        duration: 1.5,
        delay: 3.5

    })

    gsap.to(".cont", {
        autoAlpha: 0,
        ease: 'power4.InOut',
        duration: 2,
        delay: 4
      });
  }, []);

  return (
    <div className="cont">
      <style>
        {`
          .cont {
            z-index: 999;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            position: fixed;
          }

          .pre-loader {
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }

          .loader {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background: #000;
            color: #131313;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .loader-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            width: 400px;
            z-index: 2;
            color: #fff;
          }

          .count {
            display: flex;
            text-align: center;
            line-height: 1;
            padding: 0 1rem;
            font-size: 1.6rem;
          }

          .copy {
            flex: 6;
            font-size: 5rem;
            text-transform: uppercase;
            line-height: 1;
          }

          .ml16 .letter {
            overflow: hidden;
            line-height: 1em;
            display: inline-block;
          }

          .loader-bg {
            position: absolute;
            display: block;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: green;
            z-index: -1;
          }

          .loader-2 {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            z-index: -1;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        `}
      </style>
      <div className="pre-loader">
        <div className="loader"></div>
        <div className="loader-bg"></div>
      </div>
      <div className="loader-content">
        <div className="count"><p ref={counterEle}>@</p></div>
        <div className="copy"><p className="ml16" ref={textWrapRef}>BYTE Buy</p></div>
      </div>
      <div className="loader-2"></div>
    </div>
  );
};

export default Load;
