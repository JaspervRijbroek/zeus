export function callController(controllerConstruct: any, method: string) {
    let controller = new controllerConstruct;

    return controller[method];
}