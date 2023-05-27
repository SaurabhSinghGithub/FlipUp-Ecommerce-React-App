import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/apiURL";
import { STATUS } from "../../utils/status";

const initialState = {
    searchProducts: [],
    searchProductsStatus: STATUS.IDLE,
    filteredProducts: [],
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch: (state, action) => {
            state.searchProducts = [];
        },
        updateFilter: (state, action) => {
            const filterValue = action.payload.toLowerCase();
            state.filteredProducts = state.searchProducts.filter(product =>
                product.name.toLowerCase().includes(filterValue)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncSearchProduct.pending, (state, action) => {
                state.searchProductsStatus = STATUS.LOADING;
            })

            .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
                state.searchProducts = action.payload;
                state.searchProductsStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchAsyncSearchProduct.rejected, (state, action) => {
                state.searchProductsStatus = STATUS.FAILED;
            })
    }
})

export const fetchAsyncSearchProduct = createAsyncThunk('product-search/fetch', async (searchTerm) => {
    const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products;
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export const getSearchProducts = (state) => state.search.searchProducts;
export const getSearchProductsStatus = (state) => state.search.searchProductsStatus;
export default searchSlice.reducer;



// extra
export const selectFilteredProducts = state => state.search.filteredProducts;
export const { updateFilter } = searchSlice.actions;
