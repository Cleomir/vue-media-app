import { createStore } from "vuex";

export default createStore({
  state: {
    pictures: [] as string[],
    nextPage: {},
    picturePreviewUrl: "",
    displaySpinner: false,
    displaySnackBar: false,
    snackBarMessage: "",
    snackBarType: "",
  },
  mutations: {
    setPictures: (state, pictures) => {
      state.pictures = [...state.pictures, ...pictures];
    },
    clearPictures: (state) => {
      state.pictures = [];
      state.nextPage = {};
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
    showSnackBar: (state, options) => {
      state.snackBarMessage = options.message;
      state.snackBarType = options.type;
      state.displaySnackBar = true;
    },
    hideSnackBar: (state) => {
      state.displaySnackBar = false;
    },
  },
  actions: {},
  modules: {},
});
