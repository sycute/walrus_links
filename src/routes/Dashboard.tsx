
import { getSiteList } from "@/actions/getSiteList";
import { AddSite } from "@/components/AddSite";
import { base36Encode } from "@/utils/util";
import { useEffect, useState } from "react";

export function Dashboard() {
    const [sites, setSites] = useState<SiteCardProps[]>([]);

    useEffect(() => {
        const fetchSites = async () => {
            const list = await getSiteList();
            setSites(list);
        };

        fetchSites();
    }, []);

    return (

        <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">友链</h1>
                    <AddSite />
                </div>
                <div className="grid grid-cols-[1fr_2fr_1fr] gap-4">
                    <div className="text-zinc-400 font-medium">名称</div>
                    <div className="text-zinc-400 font-medium">描述</div>
                    <div className="text-zinc-400 font-medium">归属</div>
                </div>
                <div className="mt-2 space-y-1">
                    {sites.map((site, index) => (
                        <div key={index} className="grid grid-cols-[1fr_2fr_1fr] gap-4 py-2">
                            <a
                                href={`https://` + base36Encode(site.id) + `.walrus.site`}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                {site.name}
                            </a>
                            <div className="text-zinc-300 ">{site.description}</div>
                            <a
                                href={`https://suiscan.xyz/testnet/account/` + site.author}
                                className="text-blue-400 hover:text-blue-300 transition-colors overflow-auto truncate"
                            >
                                {site.author}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}