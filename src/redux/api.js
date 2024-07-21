import { setProducts } from "./reducer";
import { api } from "./rtk"
export const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        allProducts: builder.query({
            query: () => ({
                url: "/api/v1/all-products",
            }),
            providesTags: ['products'],
        }),

        addProduct: builder.mutation({
            query: (content) => ({
                url: `/api/v1/admin/add-product`,
                method: 'POST',
                body: content
            }),
            invalidatesTags: ['products'],
        }),

        updateStock: builder.mutation({
            query: (content) => ({
                url: "/api/v1/admin/add-stock",
                method: "PUT",
                body: content
            }),
            invalidatesTags: ['products'],
        }),
        deleteProduct: builder.mutation({
            query: (content) => ({
                url: "/api/v1/admin/delete-product",
                method: "DELETE",
                body: content
            }),
            invalidatesTags: ['products'],
        }),
        orderHandler: builder.mutation({
            query: (content) => ({
                url: "/api/v1/order/new-order",
                method: "POST",
                body: content
            })
        }),
        discountHandler: builder.mutation({
            query: (content) => ({
                url: "/api/v1/admin/discount",
                method: "POST",
                body: content
            }),
            invalidatesTags: ['products'],
        }),
        expenseHandler: builder.mutation({
            query: (content) => ({
                url: "/api/v1/admin/expense",
                method: "POST",
                body: content
            }),
        }),
        // expenseHandler: builder.mutation({
        //     query: (content) => ({
        //         url: "/api/v1/admin/sheet",
        //         method: "POST",
        //         body: content
        //     }),
        // }),
        sheetHandler: builder.query({
            query: () => ({
                url: "/api/v1/admin/sheet",
            }),
        }),

        ledgerHandler: builder.query({
            query: () => ({
                url: "/api/v1/admin/ledger",
            }),
        }),


    })
})


export const { useAllProductsQuery, useAddProductMutation, useUpdateStockMutation, useDeleteProductMutation, useOrderHandlerMutation, useDiscountHandlerMutation, useExpenseHandlerMutation, useSheetHandlerQuery, useLedgerHandlerQuery } = productsApi



