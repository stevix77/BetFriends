import { ICommand } from './Request/ICommand';
export interface IBetModule {
    ExecuteCommand(command: ICommand) : Promise<void>;
}