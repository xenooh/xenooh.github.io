import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import '../css/contact.css'
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk'
import axios from 'axios'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const [adata, setAdata] = useState(null);
    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_KEY
    })
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [status, setStatus] = useState('');
    const form = useRef();

    console.log(error);
    useEffect(() => {
        axios.get("./data/about.json").then(res => setAdata(res.data));
    }, []);

    if (!adata) return <div>Loading...</div>;

    const sendEmail = async () => {
        if (!name || !email || !title || !message) {
            setStatus('모든 항목을 입력하셔야 합니다.');
            return;
        }

        
        try {
            const result = await emailjs.send(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
               {
                name,
                email,
                title,
                message
            },
            
             process.env.REACT_APP_PUBLIC_KEY
          
            
            );
            console.log(result.text);
            setStatus("문의가 성공적으로 전송되었습니다.");
            setName('');
            setEmail('');
            setTitle("");
            setMessage("");
        } catch (error) {
            setIsError(true);
            console.log(error);
        }
    }

    return (
        <section id="contact" className="contact section light-background mt-5">
            <Container>
                <Row className="g-5">
                    <Col lg={6}>
                        <div className="content" data-aos="fade-up" data-aos-delay="200">
                            <h2 className="section-category mb-3">Contact</h2>
                            {!loading && (
                                <Map
                                    center={{ lat: 37.6446455, lng: 126.6670966 }}
                                    style={{ width: "100%", height: "360px" }}
                                    level={4}
                                >
                                    {/* <MapMarker position={{ lat: 37.6446455, lng: 126.6670966 }} /> */}
                                </Map>
                            )}

                            <div className="contact-info mt-5">
                                <div className="info-item d-flex mb-3">
                                    <i className="bi bi-envelope-at me-3"></i>
                                    <span>{adata.email}</span>
                                </div>

                                <div className="info-item d-flex mb-3">
                                    <i className="bi bi-telephone me-3"></i>
                                    <span>{adata.phone}</span>
                                </div>

                                <div className="info-item d-flex mb-4">
                                    <i className="bi bi-geo-alt me-3"></i>
                                    <span>{adata.address}</span>
                                </div>

                            </div>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className="contact-form card" data-aos="fade-up" data-aos-delay="300">
                            <div className="card-body p-4 p-lg-5">

                                <form ref={form} className="php-email-form">
                                    <div className="row gy-4">

                                        <div className="col-12">
                                            <input type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 ">
                                            <input type="email"
                                                className="form-control"
                                                name="email"
                                                placeholder="Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </div>

                                        <div className="col-12">
                                            <input type="text"
                                                className="form-control"
                                                name="subject"
                                                placeholder="Subject"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)} />
                                        </div>

                                        <div className="col-12">
                                            <textarea
                                                className="form-control"
                                                name="message"
                                                rows="6"
                                                placeholder="Message"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)} />
                                        </div>

                                        <div className="col-12 text-center">
                                            {isError && <div className="text-danger">알수없는 이유로 이메일이 전송되지 않았습니다.</div>}
                                            {status && <div className="text-success">{status}</div>}

                                            <button type="button"
                                                className="btn btn-submit w-100"
                                                onClick={sendEmail}>
                                                Submit Message
                                            </button>
                                        </div>

                                    </div>
                                </form>

                            </div>
                        </div>
                    </Col>

                </Row>

            </Container>

        </section>
    )
}

export default Contact