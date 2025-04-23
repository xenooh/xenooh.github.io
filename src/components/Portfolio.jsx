import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card, ButtonGroup, Spinner } from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';

const Portfolio = () => {
    const [repos, setRepos] = useState([]);
    const [languageFilter, setLanguageFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const reposPerPage = 12;

    useEffect(() => {
       
        axios.get('https://api.github.com/users/xenooh/repos', {
          headers: { 
            Authorization : `token ${process.env.REACT_APP_GITHUB_TOKEN}`
          
        }
          
        })
        
            .then(res => {
                console.log('API Response:', res);
                const publicRepos = res.data.filter(repo => !repo.private);
                setRepos(publicRepos);
                console.log('Filtered Repos:', publicRepos);
            })
            .catch(err => {
                console.error(err);
                setError("GitHub API 요청 중 오류가 발생했습니다.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const languages = ['All', ...new Set(repos.map(repo => repo.language).filter(Boolean))];
    const filterRepos = languageFilter === 'All'
        ? repos
        : repos.filter(repo => repo.language === languageFilter);

    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos = filterRepos.slice(indexOfFirstRepo, indexOfLastRepo);
    const totalPages = Math.ceil(filterRepos.length / reposPerPage);

    const handleLanguageChange = (lang) => {
        setLanguageFilter(lang);
        setCurrentPage(1);
    };

    return (
        <section id="portfolio" className="py-5 bg-light">
            <Container>
                <div className="text-center mb-4">
                    <h2 className="text-center">Portfolio</h2>
                    <p className="text-muted">GitHub에서 자동으로 가져온 제 프로젝트입니다.</p>
                    <p>
                        <a href="https://github.com/xenooh" target="_blank">
                            <FaGithub /> 깃허브 바로가기</a></p>
                </div>

                {/* 언어 필터를 이용해 메뉴를 만듬 */}
                <div className="text-center mb-4">
                    <ButtonGroup>
                        {
                            languages.map((lang, idx) => (
                                <Button
                                    key={idx}
                                    variant={lang === languageFilter ? 'dark' : 'outline-dark'}
                                    onClick={()=> handleLanguageChange(lang)}
                                    >{lang}</Button>
                            ))
                        }
                    </ButtonGroup>
                </div>

                {
                    loading ? (
                        <div className="text-center py-5">
                            <img src="img/loading.gif" alt="로딩중..." />
                            <p className="text-danger">로딩중입니다. 잠시만 기달리세요.</p>
                        </div>
                    ) : error ? (
                        <div className="text-danger">
                            {error}
                        </div>
                    )
                        : (
                          <>
                            <Row xs={1} md={2} className="g-4">
                                {
                                    currentRepos.map((repo) => (
                                        <Col key={repo.id}>
                                            <Card className="h-100 shadow-sm">
                                                <Card.Body>
                                                    <Card.Title>
                                                        {repo.name}
                                                    </Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">
                                                        {repo.language || 'Other'}
                                                    </Card.Subtitle>
                                                    <Card.Text>
                                                        {repo.description || ''}
                                                    </Card.Text>
                                                    <Button variant="dark"
                                                        href={repo.html_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    ><FaGithub className="me-2" /> View on GitHub</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>

                            {/**  페이징 */}
                            <div className="text-center mt-5">
                            {
                                Array.from({ length: totalPages }, (_, i) => (
                                    <Button
                                        variant='dark'
                                        key={i + 1}
                                        onClick={(() => setCurrentPage(i + 1))}
                                        className="mx-2">
                                        {i + 1}
                                    </Button>
                                ))
                            }
                        </div>
                    </>

                        )
                }


            </Container>
        </section>
    )
}

export default Portfolio