import Tweet from 'components/Tweet';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
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
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const [image, setImage] = useState('');
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

    const onTweetSubmit = async (event) => {
        event.preventDefault();

        let imageUrl = '';

        if (image !== '') {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, image, 'data_url');
            imageUrl = await getDownloadURL(response.ref);
        }
        const newTweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            imageUrl,
        };
        await addDoc(collection(dbService, 'tweet'), newTweetObj);
        setTweet('');
        setImage('');
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finish) => {
            setImage(finish.currentTarget.result);
        };
        reader.readAsDataURL(theFile);
    };
    const onImageClear = () => {
        setImage('');
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
                {image && (
                    <div>
                        <img style={{ width: '100px' }} src={image} />
                        <button onClick={onImageClear}>Clear</button>
                    </div>
                )}
                <input type='file' accept='image/*' onChange={onFileChange} />
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
