import { apiInstance } from "../baseApi";

const BASE_URL = "/people";

// export type GetProductsListParams = {
//     page?: number
// };

type PersonReponseItem = {
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    homeworld: string
    films: string[]
    species: string[]
    vehicles: string[]
    starships: string[]
    created: string
    edited: string
    url: string
}

type PersonListResponse = {
    count: number
    next: string
    previous: any
    results: PersonReponseItem[]
}

// export const getPersonList = (
//     // params?: GetProductsListParams
// ): Promise<PersonListResponse> => {
//     return apiInstance.get(BASE_URL)
// };

export async function fetchAllPersons(
    pageUrl: string = BASE_URL,
    allPersons: PersonReponseItem[] = []
): Promise<PersonReponseItem[]> {
    const response = await apiInstance.get<PersonListResponse>(pageUrl)
    allPersons = [...allPersons, ...response.results]

    if (response.next) {
        const nextPageUrl = `${BASE_URL}/${new URL(response.next).search}`
        return await fetchAllPersons(nextPageUrl, allPersons)
    }

    return allPersons
}