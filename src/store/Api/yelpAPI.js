import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GraphQLClient, gql } from 'graphql-request'

import { yelp_apiKey } from '../../common/config'
export const yelpAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.yelp.com/v3/businesses/',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${yelp_apiKey}`)
        }
    }),
    endpoints: (build) => ({
        citySearch: build.query({
            query: (arg) => {
                const { lat, lon } = arg
                return {
                    url: `search`,
                    method: 'GET',
                    params: {
                        latitude: lat,
                        longitude: lon,
                        limit: 20
                    }
                }
            }
        })
    })
})
export const { useCitySearchQuery } = yelpAPI


const graphqlBaseQuery =
    ({ baseUrl }) =>
        async ({ body }) => {
            try {
                const client = new GraphQLClient(baseUrl, {
                    headers: {
                        authorization: `Bearer ${yelp_apiKey}`,
                        "Accept-Language": 'en-US',
                        "Content-Type": "application/graphql"
                    }
                })
                const result = await client.request(body)
                return { data: result }
            } catch (e) {
                return { error: e }
            }
        }
export const yelpGraphQL = createApi({
    reducerPath: 'yelp_graphQL',
    baseQuery: graphqlBaseQuery({
        baseUrl: 'https://api.yelp.com/v3/graphql',
    }),
    endpoints: (builder) => ({
        getBussiness: builder.query({
            query: (arg) => {
                const { lat, lon } = arg
                return ({
                    body: gql`query{
                        search(
                            limit: 10
                            radius: 30000
                            longitude: ${lon}
                            latitude: ${lat}
                          ) {
                            business {
                                name
                                coordinates{
                                    latitude
                                    longitude
                                }
                                photos
                                rating
                                price
                                is_closed
                                review_count
                                id
                              }  
                            }
                    }`
                })
            },
            transformResponse: (response) => response.search.business
        }),
        getStore: builder.query({
            query: (arg) => {
                return ({
                    body: gql`query{
                        business(id: "${arg}") {
                            hours {
                              open{
                                is_overnight
                                end
                                start
                                day
                              }
                              is_open_now
                            }
                            location {
                                address1
                                address2
                                address3
                                city
                                state
                                postal_code
                                country
                                formatted_address
                              }
                              reviews(limit: 10) {
                                user {
                                  name
                                  image_url
                                }
                                text
                                time_created
                                rating
                              }
                            price
                            photos
                            phone
                            name
                            rating
                            review_count
                            url
                            categories {
                                title
                                alias
                              }
                          }
                    }`
                })
            },
            transformResponse: (response) => response.business
        })
    })
})


export const { useGetBussinessQuery, useLazyGetBussinessQuery, useGetStoreQuery } = yelpGraphQL