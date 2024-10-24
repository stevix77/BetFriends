export class NotEnoughChipsException extends Error {
    constructor(){
        super("Requester has not enough chips")
    }
}