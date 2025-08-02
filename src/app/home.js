'use client';
import 'aframe';
import * as React from 'react';

import StereoVideo from './components/stereo.js';

export default function DynamicHome() {
  const [rendered, set_rendered] = React.useState(false);
  const [cameraPosition, setCameraPosition] = React.useState({ x: 0, y: 0, z: 0}); //真後ろ
 
  //webrtc接続
  const [stereo_visible, set_stereo_visible] = React.useState(true);

  const StereoProps = {
    rendered,
    stereo_visible,
    cameraPosition,
    setCameraPosition,
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        set_rendered(true);
        console.log('set rendered');
      }, 1000);
    }
    
  }, []);

  if (rendered) {
    return (
      <>

        <StereoVideo{...StereoProps}/>
        <a-scene >
            <a-entity position={`${-cameraPosition.x} ${-cameraPosition.y} ${-cameraPosition.z}`} >
              <a-entity
                id="UIBack"
                camera='active: true'
                position='0 0 0'
                stereocam='eye:left;'
              >                
                </a-entity>
            </a-entity>              
        </a-scene>
      </>
    );
  } else {
    return (
      <a-scene>
        <a-text  position="0 0 -3" value="Please wait..." />
      </a-scene>
    );
  }
}
