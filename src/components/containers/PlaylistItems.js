import React from 'react';
import PlaylistItem from '../PlaylistItem';
import StyledPlaylistItems from '../styles/StyledPlaylistitems';

const Playlistitems = ({ videos, active }) => (
    <StyledPlaylistItems>
        {videos.map(video => (
            <PlaylistItem 
                key={video.id}
                video={video}
                active={video.id === active.id ? true : false}
                played={video.played}
            />
        ))}
    </StyledPlaylistItems>
)

export default Playlistitems;