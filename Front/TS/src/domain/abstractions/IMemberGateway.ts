export interface IMemberGateway {
  RetrieveInfo(): Promise<MemberInfo>;

}

export interface MemberInfo {
    username: string;
    coins: number;
}