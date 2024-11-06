import { ROUTE_CONSTANTS } from "@src/shared/config";
import { Route, Routes } from "react-router-dom"
import { FormPage } from "./form";
import { MainPage } from "./main";

export const Router = () => {
    return (
        < Routes >
            <Route path="*" element={<>Страница не найдена</>} />
            <Route path={ROUTE_CONSTANTS.HOME} element={<MainPage />} />
            <Route path={ROUTE_CONSTANTS.PEOPLE_FORM} element={<FormPage />} />
            <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<>Страница не найдена</>} />
        </Routes >
    );
};
