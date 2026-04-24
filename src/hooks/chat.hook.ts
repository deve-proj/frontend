import { useEffect, useState, useRef } from 'react';
import { Socket } from 'phoenix';

export function useChat(roomId: string)
{

    const [messages, setMessages] = useState<any[]>([]);
    const isJoinedRef = useRef(false)
    const channelRef = useRef<any>(null)
    const socketRef = useRef<any>(null)

    const connect = () => {

        if(socketRef.current)
        {
            if(!channelRef.current || !isJoinedRef.current)
            {
                const ch = socketRef.current.channel(`room:${roomId}`, {user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", user_name: "mark"});

                setupChannel(ch)
            }

            return;
        }

        const socket = new Socket('ws://localhost:4000/socket', {params: {user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", user_name: "mark"}});
        socket.connect();
        socketRef.current = socket

        const ch = socketRef.current.channel(`room:${roomId}`, {user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", user_name: "mark"});

        setupChannel(ch)

    }

    const setupChannel = (ch : any) => {

        ch.join()
            .receive('ok', () => {
                console.log('Joined room', roomId)
                isJoinedRef.current = true
            })
            .receive('error', (err) => console.error('Join failed', err));

        ch.on('new_message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        ch.onClose(() => {
            isJoinedRef.current = false;
            channelRef.current = null;

            setTimeout(() => connect(), 1000);
        })

        channelRef.current = ch
    }

    useEffect(() => {

        if(roomId)
        {
            connect();

            return () => {

                if(channelRef.current)
                {
                    channelRef.current.leave()
                    channelRef.current = null
                }

                if(socketRef.current)
                {
                    socketRef.current.disconnect();
                    socketRef.current = null
                }

                isJoinedRef.current = false

            };
        }

    }, [roomId]);

    const sendMessage = (body: string) => {

        if (channelRef.current && isJoinedRef.current)
        {
            channelRef.current.push('new_message', { body });
        }
        else
        {
            console.warn('Channel not ready')
        }
    };

    return { messages, sendMessage };
}