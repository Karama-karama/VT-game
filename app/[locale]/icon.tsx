// app/icon.tsx
import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#3b2a1a', 
          borderRadius: '6px',        
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F1BE48',    
            display: 'flex',
          }}
        >
          VT
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}