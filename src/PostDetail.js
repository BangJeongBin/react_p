import {Link, useNavigate, useParams} from "react-router-dom";
import "./css/detail.css"
import {useEffect, useState} from "react";
import axios from "axios";

let PostDetail = () => {
    const {id} = useParams();

    let naviagate = useNavigate(); // 해당 엔드포인트로 이동

    let [post, setPost] = useState({
        title: "",
        content: ""
    });

    // 해당 id의 페이지를 불러오는 컴포넌트
    const getPost = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                console.log(res.data);
                setPost(res.data);
            }).catch(err => {
            console.error(err);
        });
    };

    // 렌더링 시 패이지 로드
    useEffect(() => {
        getPost();
    }, []);

    // 삭제 이벤트 핸들러
    const handleDelete = () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }
        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                console.log(res.data);
                alert("삭제가 완료되었습니다.");
                naviagate("/");
            }).catch(err => {
            console.error(err);
            alert("삭제 중 오류가 발생했습니다.");
        });
    }

    return (
        <div className={"post-detail-container"}>
            <h1 className={"post-detail-title"}>{post.title}</h1>
            <p className={"post-detail-content"}>{post.content}</p>
            <div className={"button-group"}>
                <Link to={`/post/edit/${id}`} className={"edit-button"}>
                    수정하기
                </Link>
                <button onClick={handleDelete} className={"delete-button"}>
                    삭제하기
                </button>
            </div>
            <Link to={"/"} className={"back-link"}>목록으로 돌아가기</Link>
        </div>
    );
}

export default PostDetail;