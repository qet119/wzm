import { useState } from "react";

interface AvatarProps {
    src: string;
    size?: number;
    alt?: string;
  }
  
export const Avatar: React.FC<AvatarProps> = ({ src, size = '5rem', alt }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState(src);

    return (
      <div style={{ position: 'relative' }}>
        {isLoading && (
          <div className="loading-spinner" /> // 加载图标
        )}
        <img
          src={url}
          alt={alt}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
          }}
          onLoad={() => {
              setIsLoading(false)
          }}
          onError={() =>{
              setIsLoading(false)
              setUrl('/avatar.svg')
          }}
        />
      </div>
    );
  };