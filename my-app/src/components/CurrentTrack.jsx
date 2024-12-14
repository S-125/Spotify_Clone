import React,{useEffect} from 'react';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
export default function CurrentTrack() {
    const [{token,currentPlaying},dispatch]=useStateProvider();
useEffect(()=>{
    const getCurrentTrack=async()=>{
        const response=await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                 Authorization: "Bearer "+token,
                 "Content-Type":"application/json",
            },
        }
    );
    if(response.data!==""){
        
        const currentPlaying={
            id:response.data.item.id,
            name:response.data.item.name,
            artists:response.data.item.artists.map((artist)=>artist.name),
            image:response.data.item.album.images[2].url,

        };
        
    dispatch({type:reducerCases.SET_PLAYING,currentPlaying });
    }
  };
    getCurrentTrack();
},[token,dispatch]);
  return (
    <Container>
      {
        currentPlaying && (
            <div className="track">
                <div className="track_image">
                    <img src={currentPlaying.image} alt="currentlyplaying" />
                </div>
                <div className="track_info">
                    <h4>{currentPlaying.name}</h4>
                    <h6>{currentPlaying.artists}</h6>
                </div>
            </div>
        )
      }
    </Container>
  )
}
const Container = styled.div`
  .track {
    display: flex;
    margin:0rem;
    gap: 1rem;
    .track_image {
     margin-top:0.5rem;
    }
    .track_info {
      display: flex;
      flex-direction: column;
      
     h4{
      color:white;
      margin-top:0.3rem;
      margin:0rem;
      width:20rem;
     }
      h6{
      color:#b3b3b3;
      margin:0.3rem;
      }
    }
  }
`;
