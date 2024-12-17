import { WalursLogPackage } from "@/constants";
import { useTransactionExecution } from "@/hooks/useTransactionExecution";
import { useCurrentAccount } from "@mysten/dapp-kit"
import { Transaction } from "@mysten/sui/transactions";
import { useMutation } from "@tanstack/react-query"

export function useNewLogMutaion() {
    const account = useCurrentAccount();
    const executeTx = useTransactionExecution();

    return useMutation(
        {
            mutationFn: async () => {
                if (!account?.address) {
                    throw new Error("No account found");
                }

                const txb = new Transaction();
                const logObj = txb.moveCall({
                    target: `${WalursLogPackage}::walurslink::new_log`,
                    arguments: [],
                });

                txb.moveCall({
                    target: `${WalursLogPackage}::walurslink::share_log`,
                    arguments: [txb.object(logObj)],
                });

                // txb.transferObjects([logObj], txb.pure.address(account.address));

                return executeTx(txb);
            },
            onSuccess: () => {
                
            }
        }
    )
}