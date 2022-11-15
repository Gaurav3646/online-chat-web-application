import React from 'react';
import ReactLoading from 'react-loading';
import classes from './Loading.module.css';
const Loading = () => (
    <div className={classes.LoadingBack}>
        <div className={classes.Loading}><ReactLoading type={'spokes'} color={'#455d7a'} height={'80px'} width={'80px'} /></div>
        </div>
);
 
export default Loading;