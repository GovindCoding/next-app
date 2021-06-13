import Head from 'next/head'
import classes from '../styles/Home.module.css'
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import React, {useState} from 'react';
import Card from '../components/ui/Card';

const  VerifyOtp = () => {
    const router = useRouter()
    const { query: { userId },
    } = router
    const [loginError, setLoginError] = useState('');
    const [otp, setOtp] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3003/user/otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp, userId }),
        }).then((r) => {
            return r.json();
        }).then((res) => {
            if (res && res.status === "ERROR") {
                setLoginError(res.message);
            }
            if (res && res.status === "SUCCESS") {
                Router.push('/');
            }
        });
    }
    return (
        <Card>
            <Head>
                <title>Verify OTP</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor='title'>OTP</label>
                    <input name="otp" required id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
                </div>
                <div className={classes.control}>
                    <button>Submit</button>
                </div>
                {loginError && <p style={{color: 'red'}}>{loginError}</p>}
            </form>
            <>
                <Link href="/signup">Edit Details</Link>
            </>
        </Card>
    );
};

export default VerifyOtp;
