import Tweet from 'components/Tweet';
import { dbService } from 'fbase';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, 'tweet'),
            orderBy('createdAt', 'desc'),
        );
        onSnapshot(q, (snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    }, []);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTweet(value);
    };

    const onTweetSubmit = (event) => {
        event.preventDefault();
        addDoc(collection(dbService, 'tweet'), {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTweet('');
    };

    return (
        <div>
            <form onSubmit={onTweetSubmit}>
                <input
                    type='text'
                    placeholder='write'
                    maxLength={120}
                    value={tweet}
                    onChange={onChange}
                />
                <input type='submit' value='tweet' />
            </form>
            <ul>
                {tweets.map((data) => (
                    <Tweet
                        key={data.id}
                        tweetObj={data}
                        isOwner={data.creatorId === userObj.uid}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Home;
