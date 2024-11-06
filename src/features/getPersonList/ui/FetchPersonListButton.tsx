import { personListStore } from "@entities/person";
import { Button } from "@src/shared/ui/button";

export const FetchPersonListButton = () => {
    return (
        <Button onClick={() => personListStore.loadPersons()}>
            Загрузить
        </Button>
    );
};