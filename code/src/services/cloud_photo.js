import {API, Storage, graphqlOperation} from 'aws-amplify';
import { createPhoto as createPhotoMutation } from 'src/graphql/mutations';
import { getPhoto as getPhotoQuery }  from 'src/graphql/queries'
import { listPhotos as listPhotosQuery }  from 'src/graphql/queries'
import { v4 as uuid } from 'uuid';
import awsconfig from 'src/aws-exports';



export const createPhotoFile= async (data) => {
   const {
       aws_user_files_s3_bucket_region: region,
       aws_user_files_s3_bucket: bucket
   } = awsconfig;
   console.log("Data");
   console.log(data);
   const file = data;
   const extension = file.name.substr(file.name.lastIndexOf(".")+1);
   const photoId = uuid();
   const key = `ìmages/${photoId}.${extension}`
   const inputData = {
       contentType: file.type,
       fullsize: {
           key,
           region,
           bucket
       }
   }
try {
    await Storage.put(key,file,{
        level: "public",
        contentType: file.mimeType,
        metadata: {name: "Testname" , photoId }
    })
    return {status: "ok", inputData}
} catch (error) {
    throw error
}
}




export const createPhoto = async (photo) => {
    try {
        const result = await API.graphql(graphqlOperation(createPhotoMutation,{input: photo}))
        return {status: "ok", result}
    } catch (error) {
       console.error("createPhoto",error)    
       throw error
    };
}

export const listPhotos = async() => {
    try {
       const photosData = await API.graphql(
           graphqlOperation(
               listPhotosQuery
           )
       )  
       return {status: "ok", photos: photosData.data.listPhotos.items}
    } catch (error) {
        throw error
    }
}

export const getPhoto = async (photoId) => {
    try {
        const photoData = await API.graphql(
            graphqlOperation(
            getPhotoQuery,{id: photoId})
        ); 
        return {status: "ok", photo: photoData.data.getPhoto}



    } catch (error) {
        
    }
}