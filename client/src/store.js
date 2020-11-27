import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    picturePreviewUrl: "",
    displaySpinner: false,
    displayModal: false,
  },
  mutations: {
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
