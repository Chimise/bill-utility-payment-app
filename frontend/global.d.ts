import {TableOptions, UsePaginationState, PluginHook, TableInstance, UsePaginationInstanceProps, TableState, UseSortByOptions, UseSortByState, UseSortByColumnProps, HeaderGroup} from 'react-table';

interface InitialState<D extends object = {}> extends Partial<UsePaginationState<D>>, Partial<UseSortByState<D>> {

}

interface Header<D extends object = {}> extends HeaderGroup<D> {
    
}

interface Instance<D extends object = {}> extends TableInstance<D> {
    
}

interface Options<D extends object = {}> extends TableOptions<D>, UseSortByOptions<D> {
    initialState: InitialState<D>;
}

type State<D extends object> = TableState<D> & {
    pageIndex: UsePaginationState<D>['pageIndex'],
    pageSize: UsePaginationState<D>['pageSize']
}



interface InstanceProps<D extends object> extends TableInstance<D>, UsePaginationInstanceProps<D>{
    state: State<D>
}

declare module 'react-table' {
    // export interface useTable<D extends object = {}> {
    //     (options: Options<D>, ...plugins: PluginHook<D>[]): InstanceProps<D>
    // }

    export declare function useTable<D extends object = {}> (options: Options<D>, ...plugins: PluginHook<D>[]): InstanceProps<D> {
        
    }
}