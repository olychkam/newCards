import React from "react";
import classes from './Error404.module.css';

function Error404() {
    return (
        <div>
            <div className={classes.messageContainer}>
                <img className={classes.mainImage} src="https://svgsilh.com/svg/1298794.svg" alt="cat"/>
                <div className={classes.errorText}>
                    <h1>Ooooops...</h1>
                    <h2>404</h2>
                    <h3>Page not found :(</h3>
                </div>
            </div>

        </div>
    );
}

export default Error404;
