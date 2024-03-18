export interface IRoute {
    path: string;
    page: () => JSX.Element;
}
