import React from 'react'
import '../css/hero.css'

const Home = ({ hero }) => {
    return (
        <section id="hero" className="hero section">

            <div className="container" data-aos="fade-up" data-aos-delay="100">

                <div className="row align-items-center content">
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                        <h2>{hero.title}</h2>
                        <p className="lead">{hero.subtitle}</p>
                        <div className="cta-buttons" data-aos="fade-up" data-aos-delay="300">
                            <a href="#portfolio" className="btn btn-primary">{hero.cta1}</a>
                            <a href="#contact" className="btn btn-outline">{hero.cta2}</a>
                        </div>
                        <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
                            {hero.state.map((stat, index) => (
                                <div className="stat-item">
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))

                            }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero-image">
                            <img src={hero.image.img} alt={hero.image.alt}
                                className="img-fluid"
                                data-aos="zoom-out" data-aos-delay="300" />
                            <div className="shape-1"></div>
                            <div className="shape-2"></div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Home