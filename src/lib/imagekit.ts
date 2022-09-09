import { BACKEND_URL, IMAGEKIT_APP_FOLDER_PATH, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_URL_ENDPOINT } from "@/config";
import ImageKit from "imagekit-javascript";
import { UploadResponse } from "imagekit-javascript/dist/src/interfaces";
import IKResponse from "imagekit-javascript/dist/src/interfaces/IKResponse";

// SDK initialization

export const imagekit = new ImageKit({
    publicKey : IMAGEKIT_PUBLIC_KEY,
    urlEndpoint : IMAGEKIT_URL_ENDPOINT,
    authenticationEndpoint : BACKEND_URL + '/api/image-upload/auth',
});

// URL generation

export function generateURL(imagePath: string, height = 300, width = 400) {
    return imagekit.url({
        path : imagePath,
        transformation : [{
            "height" : height.toString(),
            "width" : width.toString()
        }]
    });
}

// Upload function internally uses the ImageKit.io javascript SDK

export function uploadImage(file: File, folder?: string, tags?: string[]) {
    return new Promise<IKResponse<UploadResponse>>((resolve, reject) => {
        if (folder) {
            folder = `${IMAGEKIT_APP_FOLDER_PATH}/${folder}`
        }
        imagekit.upload({
            file,
            fileName : file.name,
            folder,
            tags
        }, function(err, result) {
            if (result) {
                resolve(result)
            } else if (err) {
                console.log('Error uploading an image')
                console.error(err.message)
                reject(err)
            }
        })
    })
}
