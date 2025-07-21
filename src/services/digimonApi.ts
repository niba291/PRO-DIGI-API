import { axios } from "@utils/axios";
import { getRandom } from "@utils/getRandom";

export const getList = async (props? : any) => {
    const params : any = {
        "pageSize": "8",
        // "page": Math.floor(getRandom(1, 82)).toString(),
        // "page": 0,
        ...props
    };
    const parametersFirst = new URLSearchParams(params).toString();
    const responseFirst = await axios({ url: `/digimon?${parametersFirst}` });
    const pagesTotal = Math.floor(getRandom(1, responseFirst.pageable.totalPages)).toString()
    params["page"] = pagesTotal;
    const parameters = new URLSearchParams(params).toString();
    const response = await axios({  url: `/digimon?${parameters}` });
    return response;
};

export const getDigimon = async (idOrName : string) => {
    const url = `/digimon/${idOrName}`;
    const response = await axios({ url });
    return response;
};