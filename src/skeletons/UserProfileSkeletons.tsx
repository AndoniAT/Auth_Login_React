/**
 * Author: Andoni ALONSO TORT
 */

import {Card} from "@heroui/card";
import { InputDescriptionSkeleton } from "./generals/InputSkeleton";

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
            </div>
        </div>
    );
}