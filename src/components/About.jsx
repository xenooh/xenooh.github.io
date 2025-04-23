import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/about.css'
import Skills from './Skills'

const About = () => {

    const [adata, setAdata] = useState(null);
    useEffect(() => {
        axios.get("./data/about.json").then(res => setAdata(res.data));
    }, []);

    if (!adata) return <div>Loading...</div>;

    return (
        <>
            <section id="about" className="about section light-background">

                <div className="container section-title" data-aos="fade-up">
                    <h2 className="text-center">About</h2>
                    <div className="title-shape">
                        <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor"
                                stroke-width="2"></path>
                        </svg>
                    </div>
                    <p className="text-center py-3">{adata.descript}
                    </p>
                </div>
                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <div className="row align-items-center">
                        <div className="col-lg-6 position-relative" data-aos="fade-right" data-aos-delay="200">
                            <div className="about-image">
                                <img src={adata.img} alt="Profile Image" className="img-fluid rounded-4" />
                            </div>
                        </div>

                        <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
                            <div className="about-content">
                                <span className="subtitle">About Me</span>

                                <h2>{adata.aboutTitle}</h2>

                                <p className="lead mb-4">{adata.aboutContent}</p>

                                <div className="personal-info">
                                    <div className="row g-4">
                                        <div className="col-6">
                                            <div className="info-item">
                                                <span className="label">Name</span>
                                                <span className="value">{adata.name}</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="info-item">
                                                <span className="label">Phone</span>
                                                <span className="value">{adata.phone}</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="info-item">
                                                <span className="label">Age</span>
                                                <span className="value">{adata.age}</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="info-item">
                                                <span className="label">Email</span>
                                                <span className="value">{adata.email}</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="info-item">
                                                <span className="label">Occupation</span>
                                                <span className="value">{adata.occupation}</span>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="info-item">
                                                <span className="label">Nationality</span>
                                                <span className="value">{adata.nationality}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="signature mt-4">
                                    <div className="signature-image">
                                        <img src="img/sign.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="signature-info">
                                        <h4>{adata.name}</h4>
                                        <p>{adata.aboutTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
            <Skills skills={adata.skills} />
        </>
    )
}

export default About