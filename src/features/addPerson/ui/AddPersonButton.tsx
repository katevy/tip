import { Button } from "@src/shared/ui/button";
import { Link } from "react-router-dom";

export const AddPersonButton = () => {

    return (
        <Link to="/form">
            <Button>
                Добавить
            </Button>
        </Link>
    );
};
