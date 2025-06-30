// import { useEffect } from "preact/hooks";

// import { getList, getDigimon } from "@services/digimonApi";

import "@styles/index.css";

import { Layout } from "@layouts/layout";
import { Home } from "@pages/Home";

export const App = () => {

    // const getListDigimon = async () => {
    //     const list = await getList();
    //     console.log(list);
    // };
    
    // const getSearchDigimon = async () => {
    //     const list = await getDigimon("v-mon");
    //     console.log(list);
    // };

    // useEffect(() => {
    //     // getListDigimon();
    //     getSearchDigimon();
    // }, []);

    return (
        <Layout>
            <Home/>
        </Layout>
    );
};