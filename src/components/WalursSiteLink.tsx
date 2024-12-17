



export function WalursSiteLink({ siteProps }: { siteProps: WalursLogObject }) {

    return (
        <div className="p-5">
            <div className="flex items-center">
                <img
                    className="h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                    src={`https://avatar.vercel.sh/${siteProps.name}`} />
                <div className="ml-4">
                    <h3 className="text-lg font-medium">
                        <a className="hover:underline">
                            {siteProps.name}
                        </a>
                    </h3>
                </div>

                <div className="ml-24">{siteProps.desc}</div>

                <div className="ml-24">{siteProps.suiObj}</div>
            </div>


        </div>
    )
}