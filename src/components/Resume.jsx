import React, { useState, useEffect } from 'react'
import '../css/resume.css'
import axios from 'axios'

const Resume = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get("./data/resume.json")
            .then((res) => setData(res.data));
    }, []);
    if (!data) return <div>로딩중 ... </div>
    return (
        <section id="resume" className="resume section">
            <div className="container section-title" data-aos="fade-up">
                <h2 className="text-center">Resume</h2>
                <div className="title-shape">
                    <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor"
                            stroke-width="2"></path>
                    </svg>
                </div>
                <p className="text-center py-3">{data.descript}</p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">

                <div className="row">
                    <div className="col-12">
                        <div className="resume-wrapper">
                            <div className="resume-block" data-aos="fade-up">
                                <h2>Work Experience</h2>
                                <p className="lead">{data.workExp}</p>

                                <div className="timeline">

                                    {data.work.map((item) => (
                                        <div key={item.id} className="timeline-item">
                                            <div className="timeline-left">
                                                <h4 className="company">{item.title}</h4>
                                                <span className="period">{item.wdate}</span>
                                            </div>
                                            <div className="timeline-dot"></div>
                                            <div className="timeline-right">
                                                <h3 className="position">{item.subject}</h3>
                                                <p className="description">{item.content}</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            <div className="resume-block" data-aos="fade-up" data-aos-delay="100">
                                <h2>My Education</h2>
                                <p className="lead">{data.myEdu}</p>

                                <div className="timeline">
                                    {
                                        data.education.map((item) => (
                                            <div key={item.id} className="timeline-item">
                                                <div className="timeline-left">
                                                    <h4 className="company">{item.title}</h4>
                                                    <span className="period">{item.wdate}</span>
                                                </div>
                                                <div className="timeline-dot"></div>
                                                <div className="timeline-right">
                                                    <h3 className="position">{item.subject}</h3>
                                                    <p className="description">{item.content}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Resume