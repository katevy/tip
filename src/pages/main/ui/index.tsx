import { ClearPersonListButton } from "@src/features/clearPersonList";
import './main-page.scss'
import { AddPersonButton } from "@src/features/addPerson";
import { FetchPersonListButton, PersonsDataGrid } from "@src/features/getPersonList";

export const MainPage = () => {
    return (
        <>
            <div className="button-bar">
                <FetchPersonListButton />
                <ClearPersonListButton />
                <AddPersonButton />
            </div>
            <PersonsDataGrid />
        </>
    );
};