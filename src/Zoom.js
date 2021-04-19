import './App.css';
import React, {useEffect} from 'react';
import {ZoomMtg} from '@zoomus/websdk';
import { rawListeners } from 'process';

const Zoom = (props) => {
  const crypto = require('crypto') // crypto comes with Node.js
  function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    return new Promise((res, rej) => {
      const timestamp = new Date().getTime() - 30000
      const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
      const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
      const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
      res(signature)
    })
  }

  var apiKey = 'vupeYDpqRgauFJ1dIFP4xQ'
  var apiSecret = "FcrTFnYaivjSa0GeZASgHBaeTj9nBi01vy0q"
  var meetingNumber = props.mNumber
  var role = 0
  var leaveUrl = '/'
  var userName = 'WebSDK'
  var userEmail = 'mohd.ayaz@navialifecare.com'
  var passWord = props.password
  var signature = ''
  generateSignature(apiKey, apiSecret, meetingNumber, 0).then(res => {
    signature = res;
  })

  useEffect(() => {
    showMeetingDiv()
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av')
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initiateMeeting()
  }, [])

  const showMeetingDiv = () => {
    document.getElementById("zmmtg-root").style.display = "block"
  }

  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
    
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    // <ZoomContext.Provider value={client}>
    //   <App />
    // </ZoomContext.Provider>
    <h2>Meeting here</h2>
  );
}

export default Zoom;
