export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBBSCRIBE";

//define type of subscribe message

export type SubscribeMessage = {
    method: typeof SUBSCRIBE;
    params: string[];
}

//define type of unsubscribe message

export type UnsubscribeMessage = {
    method: typeof UNSUBSCRIBE;
    params: string[];
}

export type IncomingMessage = SubscribeMessage | UnsubscribeMessage;