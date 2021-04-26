import { SubjectResource } from "./hal/subject.resource";
import { UserResource } from "./hal/user.resource";

export interface Teaching {
    subjectObj: SubjectResource;

    userObj: UserResource;
} 