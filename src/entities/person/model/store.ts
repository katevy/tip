import { makeAutoObservable, reaction, runInAction } from "mobx";
import { personsApi, RequestStatus } from "@src/shared/api";
import { Person } from "@src/shared/api/Person/models";
import { loadFromStorage, saveToStorage } from "@src/shared/lib/localStorageHelpers";

export class PersonListStore {
    private _requestStatus: RequestStatus = RequestStatus.INITIAL
    private _list: Person[] = []
    private _newList: Person[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true, deep: false })

        const initialList = loadFromStorage("myStore_list", [])
        const initialNewList = loadFromStorage("myStore_newList", [])

        this._list = initialList
        this._newList = initialNewList

        reaction(
            () => this._list,
            () => saveToStorage("myStore_list", this._list)
        )

        reaction(
            () => this._newList,
            () => saveToStorage("myStore_newList", this._newList)
        )
    }

    get requestStatus() {
        return this._requestStatus
    }

    get persons() {
        return [...this._list, ...this._newList]
    }

    get list() {
        return this._list
    }

    get newList() {
        return this._newList
    }

    private _setRequestStatus(requestStatus: RequestStatus) {
        this._requestStatus = requestStatus
    }

    public async loadPersons() {
        this._setRequestStatus(RequestStatus.LOADING)
        try {
            const personsResponse = await personsApi.fetchAllPersons()
            runInAction(() => {
                this._list = personsResponse.map((item, id) => ({ ...item, id: id } as Person))

                this._setRequestStatus(RequestStatus.SUCCESS)
            })
        } catch (error) {
            this._setRequestStatus(RequestStatus.ERROR);
            console.error("Ошибка загрузки списка:", error)
        }
    }

    public addPerson(person: Person) {
        this._newList.push(person)
    }

    public updatePersons(list: Person[]) {
        const newList = list.filter(item => item.isNew)
        const existingList = list.filter(item => !item.isNew)

        this._list = existingList
        this._newList = newList
    }

    public clearLists() {
        runInAction(() => {
            this._list = []
            this._newList = []
        })
        localStorage.removeItem("myStore_newList")
        localStorage.removeItem("myStore_list")
    }

    public destroy() { }
}


export const personListStore = new PersonListStore()
