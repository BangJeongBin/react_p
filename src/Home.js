import {useState} from "react";
import {Link} from "react-router-dom";
import "./css/list.css";

let Home = () => {

    const allPosts = Array.from({length: 25}, (_, index) => ({
        id: index + 1,
        title: `${index + 1} 번째 게시글`,
        content: `${index + 1} 번째 게시글 내용입니다.`
    }));

    // 페이지당 보여줄 게시글 수 설정
    const postsPerPage = 10;
    // 현재 페이지 상태 관리
    const [currentPage, setCurrentPage] = useState(1); // 초기값 1로 설정

    // 현재 페이지에 해당하는 게시글 리스트 계산
    //ex) currentPage = 2일 경우
    // indexOfLastPost = 2 * 10 = 20
    // indexOfFirstPage = 20 - 10 = 10
    // currentPosts = allPosts.slice(10, 20) ==> 11~20번째 게시글
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPage, indexOfLastPost);

    // 전체 페이지 번호 배열 계산
    // 25 / 10 = 2.5 → Math.ceil로 올림 처리 ==> 3 페이지
    // [1, 2, 3]으로 페이지 번호를 만들어서 버튼으로 보여줌
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
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
                    currentPosts.map(post => (
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