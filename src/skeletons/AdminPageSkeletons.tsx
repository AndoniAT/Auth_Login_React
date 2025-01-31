/**
 * Author: Andoni ALONSO TORT
 */

import {Card} from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export default function AdminPageSkeletons() {
    return (
        <div className="w-9/12 my-0 mx-auto relative overflow-x-auto shadow-md sm:rounded">
            <Card className="w-full space-y-5 p-4 h-fit bg-slate-300 dark:bg-slate-200 border-2 border-slate-300" radius="lg">
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-secondary" />
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-200"/>
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-300" />
                </Skeleton>
            </Card>
        </div>
    );
}