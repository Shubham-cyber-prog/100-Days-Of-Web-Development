import React from 'react';

export default function VideoGrid({ localRef, remoteStreams }) {
  return (
    <div    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
      <video className='person'   ref={localRef} autoPlay playsInline muted style={{ background: '#111', width: '100%', height: 'auto' }} />
      {remoteStreams.map(({ id, stream }) => (
        <video className='person' key={id} autoPlay playsInline style={{ width: '100%' }} ref={el => el && (el.srcObject = stream)} />
      ))}
    </div>
  );
}