import React from 'react'

export default function NextImage({ src, ...props }: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
    return (
        <picture>
            <source srcSet={src} type="image/webp" />
            <img src={src} {...props} />
        </picture>
    )
}
