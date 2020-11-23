import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    picturePreviewUrl: "",
  },
  mutations: {
    setPicturePreview: (state, previewUrl) => {
      console.log("Called setPicturePreview, params: ", state, previewUrl);
      state.picturePreviewUrl = previewUrl;
    },
  },
});

export default store;
