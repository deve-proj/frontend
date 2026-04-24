import { useEffect, useState } from 'react'
import { ScreenLayout } from '../../layouts/screenLayout/screenLayout'
import styles from './news.module.scss'
import { Api } from '../../../api/api'
import { PostItem, type PostProps } from '../../components/postItem/postItem'

export const News = () => {

    const [news, setNews] = useState<PostProps[]>([])

    useEffect(() => {

        (async () => {

            try
            {
                let result = await Api.NewsApi.getPosts()

                if(result)
                {
                    setNews(result)
                }

            }
            catch(e)
            {
                console.error(e)
            }

        })()

    }, [])

    return(

        <ScreenLayout>
            <div className={styles.main}>
                <section className={styles.newsBlock}>
                    {
                        news.map((post, index) => (

                            <PostItem props={post} key={index}/>

                        ))
                    }
                </section>
            </div>
        </ScreenLayout>

    )

}