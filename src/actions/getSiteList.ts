import { SharedWalursLogObjectTableId } from "@/constants";
import { getDynamicFields, getObjects, getOwner } from "@/utils/util";

export async function getSiteList(): Promise<SiteCardProps[]> {
    let reply: SiteCardProps[] = [];

    try {
        // 获取 objectIds
        const o = await getDynamicFields(SharedWalursLogObjectTableId);
        const ids = o.data.map((item) => item.objectId);

        if (ids.length > 0) {
            // 获取 objects
            const datas = await getObjects(ids);
            datas.forEach((data, _index) => {
                reply.push({
                    id: (data as any).data?.content?.fields.name,
                    name: (data as any).data?.content?.fields.value.fields.name,
                    author: "?",
                    description: (data as any).data?.content?.fields.value.fields.desc
                });
            });

            
        }
    } catch (error) {
        console.error('Error fetching site list:', error);
    }

    reply = await Promise.all(reply.map(async (item) => {
        item.author = await getOwner(item.id);
        return item;
    }));

    return reply;
}