import { configureStore } from "@reduxjs/toolkit";
import { homeHeroApi } from "./apis/homeHeroApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { myAboutApi } from "./apis/myAboutApi";
import { servicesApi } from "./apis/myServicesApi";
import { projectApi } from "./apis/myProject";
import { contactApi } from "./apis/myContactApi";
import { messageApi } from "./apis/meMessageApi";
import { loginApi } from "./apis/loginApi";

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]:loginApi.reducer,
        [homeHeroApi.reducerPath]: homeHeroApi.reducer,
        [myAboutApi.reducerPath]: myAboutApi.reducer,
        [servicesApi.reducerPath]: servicesApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
    },
    middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(loginApi.middleware).concat(homeHeroApi.middleware).concat(myAboutApi.middleware).concat(servicesApi.middleware).concat(projectApi.middleware).concat(contactApi.middleware).concat(messageApi.middleware))
});

setupListeners(store.dispatch);