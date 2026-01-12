import * as React from "react";
import { DataFormContext } from "../Components/shared/context";

const useDataForm = () => {
    const ctx = React.useContext(DataFormContext);
    if (!ctx) throw new Error("useDataForm must be used within the DataForm component");
    return ctx;
};

export default useDataForm;