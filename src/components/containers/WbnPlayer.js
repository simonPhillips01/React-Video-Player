import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "styled-components";
import Video from '../Video';
import Playlist from '../containers/Playlist';
import StyledWbnPlayer from '../styles/StyledWbnPlayer';

const theme = {
    bgcolor: "#353535",
    bgcolorItem: "#414141",
    bgcolorItemActive: "#405c63",
    bgcolorPlayed: "#526d4e",
    border: "none",
    borderPlayed: "none",
    color: "#fff",
};

const themeLight = {
    bgcolor: "#fff",
    bgcolorItem: "#fff",
    bgcolorItemActive: "#80a7b1",
    bgcolorPlayed: "#7d9979",
    border: "1px solid #353535",
    borderPlayed: "none",
    color: "#353535",
};

const WbnPlayer = ({ match, history, location }) => {

    const videos = JSON.parse(document.querySelector('[name="videos"]').value);
    const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`))

    const [state, setState] = useState({
        videos: savedState ? savedState.videos : videos.playlist,
        activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
        nightMode: savedState ? savedState.nightMode : true,
        playlistId: savedState ? savedState.playlistId : videos.playlistId,
        autoplay: false,
    });

    useEffect(() => {
        localStorage.setItem(`${state.playlistId}`, JSON.stringinfy({ ...state }));
    },
    [state]
    )

    useEffect(() => {
        const videoId = props.match.params.activeVideo;
        if (videoId !== undefined) {
            const newActiveVideo = state.videos.findIndex(
                video => video.id === videoId,
            );
            setState(prev => ({
                ...prev,
                activeVideo: state.videos[newActiveVideo],
                autoplay: props.location.autoplay,
            }));
        } else {
            props.history.push({
                pathname: `/${state.activeVideo.id}`,
                autoplay: false,
            });
        }
    }, 
    // [history, location.autoplay, match.params.activeVideo, state.activeVideo.id, state.videos]);
    [props.match.params.activeVideo])

    const nightModeCallback = () => {
        // setState(state => ({ ...state, nightMode: !state.nightMode }));
        setState(prevState => ({...prevState, nightMode: !prevState.nightMode }));
    }

    const endCallback = (props) => {
        const videoId = props.match.params.activeVideo;
        const currentVideoIndex = state.videos.findIndex(
            video => video.id === videoId
        );

        const nextVideo = currentVideoIndex === state.videos.length - 1 ? 0 : currentVideoIndex + 1;

        props.history.push({
            pathname: `${state.videos[nextVideo].id}`,
            autoplay: false
        });
    }

    const progressCallback = e => {
        if (e.playSeconds > 10 && e.playSeconds < 11) {
            const videos = [...state.videos]
            const playedVideo = video.find(
                video => video.id === state.activeVideo.id
            )
            playedVideo.played = true;

            // setState({ ...state, videos })
            prevState({ ...prevState, videos })
        
            //     setState({
        //         ...state,
        //         videos: state.videos.map( element => {
        //             return element.id === state.activeVideo.id ? { ...element, played: true } : element;
        //         })
        //     });
        }
    };

    return (
        <ThemeProvider theme={state.nightMode ? theme : themeLight}>
            {state.videos !== null ? (
            <StyledWbnPlayer>
                <Video 
                    active={state.activeVideo}
                    autolplay={state.autoplay}
                    endCallback={endCallback}
                    progressCallback={progressCallback}
                />
                <Playlist 
                    videos={state.videos}
                    active={state.activeVideo}
                    nightModeCallback={nightModeCallback}
                    nightMode={state.nightMode}
                />
            </StyledWbnPlayer>
            ) : null}
        </ThemeProvider>
    )
}

export default WbnPlayer;