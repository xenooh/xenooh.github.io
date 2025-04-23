import React, {useEffect, useRef, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'

const Skills = ({ skills }) => {
    const sectionRef = useRef(null);
    const [visible, setVisible ] = useState(false);

    useEffect (() => {
        const observer = new IntersectionObserver( //dom이 뷰포트(화면)에 보이기 시작했나 
         ([entry])=>{
            if (entry.isIntersecting) setVisible(true);
         },
         { threshold: 0.3} // 30%가 보일때 true로 만들어라
     );
     if(sectionRef.current) {
            observer.observe(sectionRef.current); // 관찰 시작 dom 요소
     }
     return () => observer.disconnect(); // 관찰 해제  컴포넌트가 사라질때
    }, []);
    return (
        <section id="skills" className="skills section" ref={sectionRef}>

            <div className="container my-5" data-aos="fade-up" data-aos-delay="100">

                <div className="row g-4 skills-animation">

                    {
                        skills.map((skill, index) => (
                            <div key={index} 
                                className="col-md-6 col-lg-3">
                                <div className="skill-box">
                                    <h3>{skill.title}</h3>
                                    <p>{skill.scripts}</p>
                                    <span className="text-end d-block">{skill.level}%</span>
                                    <ProgressBar
                                        now={visible ? skill.level : 0}
                                        level={`${skill.level}%`}
                                        animated
                                        striped
                                        style={{ transition: "width 1.5 ease" }}
                                    />
                                                                           
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>

        </section>
    )
}

export default Skills