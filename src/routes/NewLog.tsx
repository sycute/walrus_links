import { useNewLogMutaion } from "@/mutations/useNewLogMutation";
import { Button } from "@radix-ui/themes";

export function NewLog() {
    const { mutate: newlogMutation } = useNewLogMutaion();

    return (
        <div>
            <Button onClick={() => newlogMutation()}>New Log</Button>
        </div>
    )
}