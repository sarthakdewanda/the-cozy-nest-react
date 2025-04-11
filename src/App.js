import React, { useEffect, useLayoutEffect, useRef } from 'react';
import './index.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const textRef = useRef(null);
  const leafRef = useRef(null);
  const hill1Ref = useRef(null);
  const hill4Ref = useRef(null);
  const hill5Ref = useRef(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      if (textRef.current) textRef.current.style.marginTop = value * 2.5 + 'px';
      if (leafRef.current) {
        leafRef.current.style.top = value * -1.5 + 'px';
        leafRef.current.style.left = value * 1.5 + 'px';
      }
      if (hill5Ref.current) hill5Ref.current.style.left = value * 1.5 + 'px';
      if (hill4Ref.current) hill4Ref.current.style.left = value * -1.5 + 'px';
      if (hill1Ref.current) hill1Ref.current.style.top = value * 1 + 'px';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Avoid injecting if already present
    if (!document.getElementById('botpress-inject')) {
      const botpressScript = document.createElement('script');
      botpressScript.src = 'https://cdn.botpress.cloud/webchat/v2.3/inject.js';
      botpressScript.id = 'botpress-inject';
      botpressScript.async = true;
      botpressScript.defer = true;
  
      const configScript = document.createElement('script');
      configScript.src = 'https://files.bpcontent.cloud/2025/04/09/13/20250409135612-8ZXGIRD6.js';
      configScript.id = 'botpress-config';
      configScript.async = true;
      configScript.defer = true;
  
      // Append the first script and load the second only when the first is loaded
      botpressScript.onload = () => {
        document.body.appendChild(configScript);
      };
  
      document.body.appendChild(botpressScript);
    }
  }, []);
  
  useEffect(() => {
    gsap.utils.toArray('.autoShow').forEach(elem => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 200,
        opacity: 0,
        scale: 0.3,
        duration: 1,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.autoBLur').forEach(elem => {
      gsap.fromTo(elem,
        { filter: 'blur(40px)' },
        {
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true
          }
        }
      );
    });
  }, []);

  const sectionTwoStyle = { position: 'relative', zIndex: 0 };
  const sectionTwoBeforeStyle = {
    content: '""',
    position: 'absolute',
    width: 'min(1400px, 90vw)',
    top: '10%',
    left: '50%',
    height: '90%',
    transform: 'translateX(-50%)',
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg.png)`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    pointerEvents: 'none',
    zIndex: -1
  };

  return (
    <>
      <header>
        <h2 className="logo">The Cozy Nest</h2>
        <nav className="navigation">
          <a href="#home" className="active">Home</a>
          <a href="#about">About</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="parallax" id="home">
        <img src={`${process.env.PUBLIC_URL}/images/hill1.png`} alt="" id="hill1" ref={hill1Ref} />
        <img src={`${process.env.PUBLIC_URL}/images/hill2.png`} alt="" id="hill2" />
        <img src={`${process.env.PUBLIC_URL}/images/hill3.png`} alt="" id="hill3" />
        <img src={`${process.env.PUBLIC_URL}/images/hill4.png`} alt="" id="hill4" ref={hill4Ref} />
        <img src={`${process.env.PUBLIC_URL}/images/hill5.png`} alt="" id="hill5" ref={hill5Ref} />
        <img src={`${process.env.PUBLIC_URL}/images/tree.png`} alt="" id="tree" />
        <h2 id="text" ref={textRef}>The Cozy Nest</h2>
        <img src={`${process.env.PUBLIC_URL}/images/leaf.png`} alt="" id="leaf" ref={leafRef} />
        <img src={`${process.env.PUBLIC_URL}/images/plant.png`} alt="" id="plant" />
      </section>

      <main>
        <section className="grid grid-1" id="about">
          <h2 className="autoShow">About</h2>
        </section>

        <section className="grid grid-2">
          {[
            { img: "images/bedroom.png", title: "Bedroom", desc: "Charming and cozy bedroom, perfect for a restful stay in a welcoming home." },
            { img: "images/living_room.png", title: "Living Room", desc: "Spacious and inviting living room, ideal for relaxing or entertaining guests in comfort." },
            { img: "images/bathroom.png", title: "Bathroom", desc: "Modern and clean bathroom with all the essentials for a refreshing and relaxing experience." },
            { img: "images/lake_view.png", title: "Lake View", desc: "Stunning lake view, offering a peaceful and scenic backdrop for your stay." }
          ].map((item, idx) => (
            <div className="autoShow" key={idx}>
              {idx % 2 === 0 ? (
                <>
                  <figure><img src={`${process.env.PUBLIC_URL}/${item.img}`} alt={item.title} /></figure>
                  <div><p>{item.title}</p><p className="desc">{item.desc}</p></div>
                </>
              ) : (
                <>
                  <div><p>{item.title}</p><p className="desc">{item.desc}</p></div>
                  <figure><img src={`${process.env.PUBLIC_URL}/${item.img}`} alt={item.title} /></figure>
                </>
              )}
            </div>
          ))}
        </section>

        <section className="grid grid-3">
          {['SKYLINE VIEW','WATERFRONT','PATIO','BREAKFAST','FREE WIFI'].map((t, i) => (
            <div className="autoBLur" key={i}>{t}</div>
          ))}
        </section>
      </main>

      <div className="section-two" style={sectionTwoStyle}>
        <div style={sectionTwoBeforeStyle}></div>
        <div className="banner">
          <div className="slider" style={{ '--quantity': 10 }}>
            {[...Array(10).keys()].map(i => (
              <div className="item" style={{ '--position': i+1 }} key={i}>
                <img src={`${process.env.PUBLIC_URL}/images/rotation/${i+1}.png`} alt="" />
              </div>
            ))}
          </div>
          <div className="content"><h1 data-content="Reviews">Reviews</h1></div>
        </div>
      </div>

      <div className="location-wrapper" id="location">
        <section className="grid grid-3"><h2 className="autoShow">Location</h2></section>
        <section className="grid grid-4">
          <div className="autoShow">
            <figure>
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.736282602814!2d-122.08560868469212!3d37.42199997982533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba6b6f3aaf3d%3A0x2b1c8e1d7a4a9e1!2s1600+Amphitheatre+Parkway%2C+Mountain+View%2C+CA+94043%2C+USA!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </figure>
            <div><p>The Cozy Nest</p><p className="desc">1600 Amphitheatre Parkway, Mountain View, India</p></div>
          </div>
        </section>
      </div>

      <div className="contact" id="contact">
        <div className="container">
          <h2 className="special-heading">Contact</h2>
          <p>We don't just write code — we craft the future.</p>
          <div className="info">
            <p className="label">Feel free to drop me a line at:</p>
            <a href="mailto:sarthakdewanda1765@gmail.com" className="link">sarthakdewanda1765@gmail.com</a>
            <div className="social">
              Find Us On Social Networks
              <a href="https://github.com/sarthakdewanda" target="_blank" rel="noreferrer">
                <img src={`${process.env.PUBLIC_URL}/images/github.png`} alt="GitHub" className="social-icon"/>
              </a>
              <a href="https://www.linkedin.com/in/sarthak-dewanda-01b6a4270/" target="_blank" rel="noreferrer">
                <img src={`${process.env.PUBLIC_URL}/images/linkdin.png`} alt="LinkedIn" className="social-icon"/>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        &copy; 2025 <span>Sarthak</span> All Right Reserved
      </div>
    </>
  );
}

export default App;
