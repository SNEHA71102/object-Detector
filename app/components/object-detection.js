//Nextjs has server and client components: 
//server component basically rendered on server and are mostly static

"use client";
import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import {load as cocoSSDLoad} from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

let detectInterval;
const ObjectDetection = () => {
    const [isLoading,setIsLoading] = useState(true);
    //to make web camera according to user screen width
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    
    async function runCoco() {
        setIsLoading(true); //set loading state to true when model loading starts
        const net = await cocoSSDLoad();
        setIsLoading(false);  //set loading state to false when model loading complete

        detectInterval = setInterval(()=>{
            //canvasref to render all the detected object on our webcam
            runObjectDetection(net);
        },10);
    }
    async function runObjectDetection(net) {
        if(
            canvasRef.current && 
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState ===4
        ) {
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;
        
            //find detected object
            //await net.detect takes 3things-1.videp,2.max number of obj detect 3.accuracy while displaying obj it goes with 0-1
            const detectObjects = await net.detect(webcamRef.current.video, undefined,0.6);
            // console.log(detectObjects);

            const context = canvasRef.current.getContext("2d");
            retnderPredictions(detectObjects,context);

        }
    }

    const showmyVideo = () =>{
        if(
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState ===4
        ) {
            //fetch my video width and height
            const myVideoWidth = webcamRef.current.video.videoWidth;
            const myVideoHeight = webcamRef.current.video.videoHeight;
            
            webcamRef.current.video.width = myVideoWidth;
             webcamRef.current.video.height = myVideoHeight;
        }
    };

    useEffect(()=>{
        runCoco()
        showmyVideo()
    }, [])
  return (
  <div className='mt-8'>{
    isLoading ? (
        <div className='gradient-text'>Loading AI Model</div>
    ):(
    <div className='relative flex justify-center items-center gradient p-1.5 rounded-md'>
        {/* {webcam--to displaying live feild or webcam} */}
        <Webcam
        //reference to test webcam
        ref = {webcamRef}
        className="rounded-md w-full lg:h-[720px]" muted />
        {/* {canvas-- for focusing on object  } */}
        <canvas ref={canvasRef} 
        className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"
        />
         
    </div>
    )}
  </div>
  )
  
}

export default ObjectDetection;