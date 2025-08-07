import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./css/list.css";
import axios from "axios";

let Home = () => {

    const [posts, setPosts] = useState([]); // 받을 포스트는 배열이기 때문에 "[]"로 받음
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const getPostList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            params: {
                page: currentPage - 1,
                size: postsPerPage
            }
        }).then(res => {
            console.log(res.data.content);
            setPosts(res.data.content);
            setTotalPages(res.data.totalPages);
        }).catch(err => {
            console.err("게시글 가져오기 실패");
        });
    };

    useEffect(() => { // currentPage가 변경하면 getPostList() 실행
        getPostList();
    }, [currentPage]);

    // 페이지 번호 리스트
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);


    // 페이지 변경 이벤트 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={"home-container"}>
            <h1 className={"home-title"}>게시글 목록</h1>
            <div className={"posts-list"}>
                {
                    posts.map(post => (
                        <div key={post.id} className={"post-card"}>
                            <h2 className={"post-title"}>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h2>
                            <p className={"post-content"}>
                                {post.content}
                            </p>
                        </div>
                    ))
                }
            </div>

            {/* 페이지 번호 네비게이션 */}
            <div className={"pagination"}>
                {
                    pageNumbers.map((number) => (
                        <button key={number} className={`page-btn ${number === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(number)}>
                            {number}
                        </button>
                    ))
                }
            </div>
            
            <Link to={"/create"} className={"create-link"}>게시글 작성하기</Link>
        </div>
    );
}

export default Home;