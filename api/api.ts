import axios from "axios";
import * as deve from '@DEVE-proj/deve_sdk'
import type { ChatListItemProps } from "../src/components/chatListItem/chatListItem";
import type { INewChatData } from "../src/components/newChatForm/newChatForm";

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

    }

    class ALiianceApi
    {

    }

    class ClanApi
    {

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

        static async createNewRoom(roomData : INewChatData, userId = "f47ac10b-58cc-4372-a567-0e02b2c3d479") : Promise<{id : string, name: string, logo_url: string}>
        {
            console.log(roomData.logo)

            try
            {
                const formData = new FormData()
                formData.append("name", roomData.name)
                formData.append("user_id", userId)
                formData.append("description", roomData.description)
                formData.append("logo", roomData.logo)

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