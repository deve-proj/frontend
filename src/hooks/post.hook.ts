import { useEffect, useState, useRef } from "react";
import { Socket } from "phoenix";

export function usePost(postId : string)
{
    const [comments, setComments] = useState([]);
    const isJoinedRef = useRef(false)
    const channelRef = useRef<any>(null)
    const socketRef = useRef<any>(null)

    const connect = () => {

        if(socketRef.current)
        {
            if(!channelRef.current || !isJoinedRef.current)
            {
                const ch = socketRef.current.channel(`post:${postId}`, {user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", user_name: "mark"})

                setupChannel(ch)
            }

            return
        }

        const socket = new Socket("ws://localhost:4000/socket", {params: {user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", user_name: "mark"}})
        socket.connect()
        socketRef.current = socket

        const ch = socketRef.current.channel(`post:${postId}`, {user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", user_name: "mark"})
        setupChannel(ch)

    }

    const setupChannel = (ch : any) => {

        ch.join()
            .receive('ok', () => {
                console.log('Joined post', postId)
                isJoinedRef.current = true
            })
            .receive('error', (err) => console.error('Join failed', err))

        ch.on('new_comment', (comment) => {
            setComments(prev => [...prev, comment])
        })

        ch.onClose(() => {
            isJoinedRef.current = false
            channelRef.current = null

            setTimeout(() => connect(), 1000)
        })

        channelRef.current = ch
    }

    useEffect(() => {

        if(postId)
        {
            connect()

            return () => {

                if(channelRef.current)
                {
                    channelRef.current.leave()
                    channelRef.current = null
                }

                if(socketRef.current)
                {
                    socketRef.current.disconnect()
                    socketRef.current = null
                }

                isJoinedRef.current = false

            }
        }

    }, [postId])

    const sendComment = (body : string) => {

        if(channelRef.current && isJoinedRef.current)
        {
            channelRef.current.push('new_comment', { body })
        }
        else
        {
            console.warn("Channel not ready")
        }
    }

    return { comments, sendComment }

}