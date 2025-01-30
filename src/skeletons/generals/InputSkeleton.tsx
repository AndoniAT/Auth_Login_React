/**
 * Author: Andoni ALONSO TORT
 */

import { Skeleton } from "@heroui/skeleton";

export const InputDescriptionSkeleton = () => {
    return (
        <>
            <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-lg">
                <div className="h-10 rounded-lg bg-default-300" />
            </Skeleton>
        </>
    );
};