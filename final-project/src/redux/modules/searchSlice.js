import { createSlice } from "@reduxjs/toolkit";

import {
    getSearchResult,
    getUnivSearchResult,
    getMainSearchResult,
} from "../async/search";

const initialState = {
    isFetching: false,
    errorMessage: "",
    searchResult: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getSearchResult.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getSearchResult.fulfilled]: (state, { payload: result }) => {
            state.isFetching = false;
            // state.searchResult = [...state.searchResult, ...result];
            state.searchResult = result;
            state.errorMessage = "";
        },
        [getSearchResult.rejected]: (state, { payload: message }) => {
            state.isFetching = false;
            state.errorMessage = message;
        },
        [getUnivSearchResult.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getUnivSearchResult.fulfilled]: (state, { payload: result }) => {
            state.isFetching = false;
            state.searchResult = result;
            state.errorMessage = "";
        },
        [getUnivSearchResult.rejected]: (state, { payload: message }) => {
            state.isFetching = false;
            state.errorMessage = message;
        },
        [getMainSearchResult.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getMainSearchResult.fulfilled]: (state, { payload: result }) => {
            state.isFetching = false;
            state.searchResult = result;
            state.errorMessage = "";
        },
        [getMainSearchResult.rejected]: (state, { payload: message }) => {
            state.isFetching = false;
            state.errorMessage = message;
        },
    },
});

export default searchSlice;
