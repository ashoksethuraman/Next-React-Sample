
"use client";
import { useEffect, useRef, useState } from "react";
import { blob } from "stream/consumers";

type ServerMessage = {
    message: string;
    processedAt: string;
};

export default function Socket() {
    const socketRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<ServerMessage[]>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        socketRef.current = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({ message: "hello ashok" }));
        };

        ws.onmessage = async (event) => {
            let text: string;
            if (event.data instanceof Blob) {
                text = await event.data.text(); // ✅ convert Blob → string
            } else {
                text = event.data;
            }
            const data = JSON.parse(text) as ServerMessage;
            setMessages(prev => [...prev, data]);
        };

        ws.onerror = err => {
            console.error("WebSocket error", err);
        };

        return () => ws.close();
    }, []);

    const sendMessage = () => {
        socketRef.current?.send(
            JSON.stringify({ message: "react to node duplex" })
        );
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>WebSocket Duplex + Transform</h2>

            <button onClick={sendMessage}>Send Message</button>

            <pre>{JSON.stringify(messages, null, 2)}</pre>
        </div>
    );
}
