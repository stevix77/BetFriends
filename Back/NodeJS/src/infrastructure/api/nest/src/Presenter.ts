import { HttpStatus } from "@nestjs/common";

export abstract class Presenter {
    protected response: { code: HttpStatus, body: any};
}