import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useNewSiteLogMutation } from "@/mutations/useSiteLogMutation";
import { Box } from "@radix-ui/themes";

export function AddSite() {
    const { mutate: createSiteLogMutation } = useNewSiteLogMutation();

    const [isOpen, setIsOpen] = useState(false);
    const [newSite, setNewSite] = useState<WalursLogObject>({
        name: "",
        suiObj: "", // 添加 site_obj 属性
        desc: ""     // 添加 desc 属性
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSite({ ...newSite, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createSiteLogMutation({ siteLog: newSite }, {
            onSuccess: () => {

            }
        });

        setNewSite({
            name: "",
            suiObj: "",
            desc: ""
        });
        setIsOpen(false);
    }

    return (

        <Box>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild >
                    <Button variant="outline">添加站点</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>添加站点</DialogTitle>
                        <DialogDescription>
                            {/*  */}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                value={newSite.name}
                                onChange={handleInputChange} required
                                id="name"
                                name="name"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="desc" className="text-right">
                                Description
                            </Label>
                            <Input
                                value={newSite.desc}
                                onChange={handleInputChange} required
                                id="desc"
                                name="desc"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="suiobj" className="text-right">
                                SiteObj
                            </Label>
                            <Input
                                value={newSite.suiObj}
                                onChange={handleInputChange} required
                                id="suiobj"
                                name="suiObj"
                                className="col-span-3"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    )
}