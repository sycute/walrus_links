import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

const client = new SuiClient({ url: getFullnodeUrl("testnet") });


export const getDynamicFields = (id: string) => {
    return client.getDynamicFields({
      parentId: id,
    });
};
  
export const getObjects = (ids: string[]) => {
    return client.multiGetObjects({
      ids,
      options: {
        showContent: true,
        showOwner: true,
      },
    });
};
  
export  const getOwner = async (id: string) => {
  const res = await client.getObject({
    id: id,
    options: {
      showOwner: true,
      showContent: false,
      showType: false,
    }
  });

  const owner = (res as any).data?.owner?.AddressOwner;
  return owner;
}

export const base36Encode = (str: string):string => {

  const bigIntValue = BigInt(str);

  return bigIntValue.toString(36);
}