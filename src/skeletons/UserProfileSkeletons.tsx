/**
 * Author: Andoni ALONSO TORT
 */

import {Card} from "@heroui/card";
import { InputDescriptionSkeleton } from "./generals/InputSkeleton";
import { Skeleton } from "@heroui/skeleton";

export default function UserProfileSkeleton() {
    return (
        <div className="block lg:flex">
            <div className="profileUserContainer container-form loading">
                <Card className="w-7/12 space-y-5 p-4 h-fit" radius="lg">
                    <InputDescriptionSkeleton/>
                    <InputDescriptionSkeleton/>
                    <InputDescriptionSkeleton/>
                    <InputDescriptionSkeleton/>
                    <br/><br/><br/>
                </Card>
            </div>
            <div className="flex lg:w-7/12">
                <PostsSkeleton/>
            </div>
        </div>
    );
}

export function PostsSkeleton() {
    return  (
        <div className="w-11/12 my-0 mx-auto relative overflow-x-auto shadow-md sm:rounded">
            <Card className="w-full space-y-5 p-4 h-fit border-2 border-slate-500 bg-slate-400" radius="lg">
                <div className="max-w-[300px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                </div>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-secondary" />
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-200"/>
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-300" />
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-300" />
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-300" />
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-300" />
                </Skeleton>
                <Skeleton className="rounded-lg border-2 border-slate-300 dark:border-slate-100">
                    <div className="h-16 rounded-lg bg-default-300" />
                </Skeleton>
            </Card>
        </div>
    );
}