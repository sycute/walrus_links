import { SharedWalursLogObject, WalursLogPackage } from "@/constants";
import { useTransactionExecution } from "@/hooks/useTransactionExecution";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMutation } from "@tanstack/react-query";

export function useNewSiteLogMutation() {
    const account = useCurrentAccount();
    const executeTransaction = useTransactionExecution();

    return useMutation(
        {
            mutationFn: async ({ siteLog }: { siteLog: WalursLogObject }) => { 
                if (!account) throw new Error("No account found");

                let txb = new Transaction();
                txb.moveCall({
                    target: `${WalursLogPackage}::walurslink::add_to_log`,
                    arguments: [
                        txb.object(SharedWalursLogObject),
                        txb.pure.address(siteLog.suiObj),
                        txb.pure.string(siteLog.name),
                        txb.pure.string(siteLog.desc)
                    ],
                    typeArguments: []
                });
                return executeTransaction(txb);
            }
        }
    )
}