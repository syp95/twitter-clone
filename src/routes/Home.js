import { dbService } from 'fbase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, 'tweet'));

        dbTweets.forEach((doc) => {
            const tweetObj = {
                ...doc.data(),
                id: doc.id,
            };
            console.log(tweetObj);
            setTweets((prev) => [tweetObj, ...prev]);
        });
    };
    useEffect(() => {
        getTweets();
    }, []);

    const onTweetSubmit = (event) => {
        event.preventDefault();
        addDoc(collection(dbService, 'tweet'), {
            tweet,
            createdAt: Date.now(),
        });
        setTweet('');
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTweet(value);
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
        </div>
    );
};

export default Home;
