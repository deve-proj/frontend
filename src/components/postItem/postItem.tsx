import { useNavigate } from 'react-router-dom'
import styles from './postItem.module.scss'

export type PostProps = {

    id : string
    user_id : string
    datetime : string
    views : number
    likes : number
    dislikes : number
    tags : string[]
    title : string
    previewImage : string
    content : {
        type : string
        style : string
        value : string
    }[]

}

export const PostItem = ({props} : {props : PostProps}) => {

    const navigate = useNavigate()

    return(

        <div className={styles.main} style={{backgroundImage: `url(${props.previewImage})`}}>
            <div className={styles.postInfoBlock}>
                <p>{props.datetime}</p>
                <div>
                    <img src='icons/eye.svg'/>
                    <p>{props.views}</p>
                </div>
                <div>
                    <img src='icons/like.svg'/>
                    {/* <p>{props.likes}</p> */}
                    <img src='icons/dislike.svg'/>
                </div>
                <div>
                    <img src='icons/dislike.svg'/>
                    <p>{props.dislikes}</p>
                </div>
                <div onClick={() => navigate(`${props.id}/comments`)}>
                    <img src='icons/comment.svg'/>
                    <p>0</p>
                </div>
            </div>
            <p className={styles.title}>{props.title}</p>
        </div>

    )

}