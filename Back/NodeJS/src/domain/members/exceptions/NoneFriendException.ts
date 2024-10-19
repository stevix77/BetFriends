export class NoneFriendException extends Error {
    constructor() {
        super("Requester has none friend to bet");
    }
}