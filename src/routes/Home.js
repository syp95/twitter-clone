import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

const Home = () => {
    const [tweet, setTweet] = useState('');
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
