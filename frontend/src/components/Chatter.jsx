import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MongoClient } from 'mongodb';

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;
const MONGO_DBNAME = import.meta.env.VITE_MONGO_DBNAME;
const CHAT_BASE_URL = import.meta.env.VITE_CHAT_BASE_URL;

const Chatter = () => {
  const email = Cookies.get('email');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(MONGO_DBNAME);
        const chats = await db.collection("chatDB").find({ participants: email }).toArray();
        const contactos = new Set();

        chats.forEach(chat => {
          chat.participants.forEach(part => {
            if (part !== email) contactos.add(part);
          });
        });

        setUsuarios(Array.from(contactos));
        await client.close();
      } catch (error) {
        console.error("Error al conectarse a MongoDB:", error);
      }
    };

    fetchChats();
  }, [email]);

  return (
    <div>
      <h2>Chatter</h2>
      {usuarios.map((u, i) => (
        <div key={i}>
          {u}
          <a
            href={`${CHAT_BASE_URL}/?from=${email}&to=${u}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Ir al chat</button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Chatter;
