import axios from "axios";
import * as deve from '@DEVE-proj/deve_sdk'
import type { ChatListItemProps } from "../src/components/chatListItem/chatListItem";
import type { INewChatData } from "../src/components/newChatForm/newChatForm";
import type { PostProps } from "../src/components/postItem/postItem";
import userApiClient from './user.api.client'
export namespace Api
{
    export class UserApi
    {

        private api: deve.UserApi;

        constructor()
        {
            const config = new deve.Configuration({
                basePath: 'http://localhost:5263',
            })

            this.api = new deve.UserApi(config)
        }

        async CreateUser()
        {
            try
            {
                const result = await this.api.userPost({
                    createUserRequestDto: {
                        name: "Mark",
                        login: "@Mark",
                        password: "13241324mark"
                    }
                })

                return result;
            }

            catch(e)
            {
                console.log(e)
            }
        }

        async CheckAuth()
        {
            try
            {
                console.log("Пытаемся войти...")

                const result = await userApiClient.post("http://localhost:5263/user/check_auth");

                console.log("Result: " + result)

                return result
            }
            catch(e)
            {
                throw new Error(e)
            }
        }

    }

    class ALiianceApi
    {

    }

    class ClanApi
    {

    }

    export class NewsApi
    {
        static async getPosts() : Promise<PostProps[]>
        {
            try
            {
                const query = `
                    query {
                        posts{
                            id
                            userId,
                            datetime
                            title,
                            previewImage,
                            views,
                            likes,
                            dislikes,
                            content{
                                type
                                value
                            }
                        }
                    }
                `;

                let result = (await axios.post("http://localhost:8000/graphql", {query: query}))

                return result.data.data.posts
            }
            catch(e)
            {
                throw new Error(e)
            }
        }

        static async getComments(postId : string)
        {
            try
            {
                const query = `
                    query {
                        post(postId: "${postId}"){
                            comments{
                                id
                                userId,
                                text
                            }
                        }
                    }
                `;

                let result = (await axios.post("http://localhost:8000/graphql", {query: query}))

                return result.data.data.post.comments

            }
            catch(e)
            {
                throw new Error(e)
            }
        }
    }

    export class ChatApi
    {
        static async getRoomsByUserId(userId = "f47ac10b-58cc-4372-a567-0e02b2c3d479")
        {
            try
            {
                let result = (await axios.get(`http://localhost:4000/api/rooms/${userId}`)).data["rooms"]
                
                console.log(result)

                return result
            }

            catch(e)
            {
                throw new Error(e)
            }
        }

        static async getMessagesByRoomId(roomId : string, userId = "f47ac10b-58cc-4372-a567-0e02b2c3d479")
        {
            try
            {
                let result = (await axios.get(`http://localhost:4000/api/messages/${userId}/${roomId}`)).data["messages"]

                return result
            }

            catch(e)
            {
                throw new Error(e)
            }
        }

        static async createNewRoom(roomData : INewChatData, userId = "f47ac10b-58cc-4372-a567-0e02b2c3d479", type : "channel" | "group" | "person" = "group", accessability : "public" | "private" = "public") : Promise<{id : string, name: string, logo_url: string}>
        {
            try
            {
                const formData = new FormData()
                formData.append("name", roomData.name)
                formData.append("user_id", userId)
                formData.append("description", roomData.description)
                formData.append("logo", roomData.logo)
                formData.append("type", type)
                formData.append("accessability", accessability)

                let result = await axios.post('http://localhost:4000/api/rooms', formData, {headers: {"Content-Type": "multipart/form-data"}})

                return result.data
            }

            catch(e)
            {
                throw new Error(e)
            }
        }
    }
}