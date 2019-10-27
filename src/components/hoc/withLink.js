import React from 'react';
import { Link } from 'react-router-dom';

const withLink = WrappedContent => props => {
    const newProps = {
        ...props,
        video: {
            ...props.video,
            title: (
                <Link to={{ pathname: `/${props.video.id}`, autoplay: true }}>
                    {props.video.title}
                </Link>
            )
        }
    };

    return <WrappedContent { ...newProps } />
}

export default withLink;