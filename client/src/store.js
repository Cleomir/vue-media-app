import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pictures: [],
    nextPage: {},
    picturePreviewUrl: "",
    displaySpinner: false,
    displayModal: false,
  },
  mutations: {
    setPictures: (state, pictures) => {
      state.pictures = [...state.pictures, ...pictures];
    },
    clearPictures: (state) => {
      state.pictures = [];
    },
    setNextPage: (state, nextPage) => {
      state.nextPage = nextPage;
    },
    setPicturePreview: (state, previewUrl) => {
      state.picturePreviewUrl = previewUrl;
    },
    showSpinner: (state) => {
      state.displaySpinner = true;
    },
    hideSpinner: (state) => {
      state.displaySpinner = false;
    },
    showModal: (state) => {
      state.displayModal = true;
    },
    hideModal: (state) => {
      state.displayModal = false;
    },
  },
});

export default store;
