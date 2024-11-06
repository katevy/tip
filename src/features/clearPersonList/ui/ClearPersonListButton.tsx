import { personListStore } from "@entities/person";
import { Button } from "@src/shared/ui/button";
import { observer } from "mobx-react";

export const ClearPersonListButton = observer(() => {

    const { clearLists, persons } = personListStore

    const isEmpty = !persons.length

    const handleClick = () => {
        clearLists()
    }

    return (
        <Button disabled={isEmpty} onClick={handleClick}>
            Очистить
        </Button>
    );
});