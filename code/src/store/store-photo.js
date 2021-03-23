
import { Logger } from '@aws-amplify/core';
import { createPhoto, createPhotoFile, listPhotos } from 'src/services/cloud_photo';

const state = {
    photo: null,
    photos: []
}

const mutations = {
  setPhoto(store,newPhoto){
    state.photo = newPhoto;
  },
  setPhotos(store, newPhotos){
    state.photos=newPhotos;
  }
}
//fileData is from the fileselectionDialog from the browser
const actions = {

  async listPhotos(context){
    try {
       const result = await listPhotos()
       context.commit("setPhotos", result.photos)
       return {status: "ok", result}
    } catch (error) {
      throw error
    }
  },

  async createPhoto(context,photoData) {
    try {
        const fileData = photoData.file;
        const s3Object = await createPhotoFile(fileData)
        console.log("Photo-UploadedData")
        console.log(s3Object)
        const payload = {
          name: photoData.metaData.name,
          description: photoData.metaData.description,
          fullsize: s3Object.inputData.fullsize,
          contentType: s3Object.inputData.contentType  }
          const result = await createPhoto(payload)   
          context.commit("setPhoto",payload)        
        } catch (error) {
      console.error("createPhoto", error)  
    }
}
}

const getters = {
   photo: state => {
       return state.photo;
   },
   photos: state => {
     return state.photos;
   }

 




}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};