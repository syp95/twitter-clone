import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const TweetTextRef = doc(dbService, 'tweet', tweetObj.id);
    const onDeleteClick = async () => {
        const ok = window.confirm('delete?');

        if (ok) {
            await deleteDoc(TweetTextRef);
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewTweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(TweetTextRef, { text: newTweet });
        toggleEditing();
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type='text'
                            value={newTweet}
                            onChange={onChange}
                            required
                        />
                        <input type='submit' value='Confirm' />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <li>{tweetObj.text}</li>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Tweet;
