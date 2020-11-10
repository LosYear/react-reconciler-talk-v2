type HostContext = any;
type Type = string;
type Props = {
    className?: string;
    src?: string;
    onClick?: (e: MouseEvent) => void;
    dangerouslySetInnerHTML?: { __html?: string };
};
type Container = Element;
type Instance = Element;
type TextInstance = Text;
type UpdatePayload = Props;

// Typings for methods used in example renderer
// Source: https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMHostConfig.js

export type ReconcilerDOMHostConfig = {
    supportsMutation?: boolean;

    shouldSetTextContent?(type: string, props: Props): boolean;

    createInstance?(
        type: Type,
        props: Props,
        rootContainerInstance: Container,
        hostContext: HostContext,
        internalInstanceHandle: Object
    ): Instance;

    createTextInstance?(
        text: string,
        rootContainerInstance: Container,
        hostContext: HostContext,
        internalInstanceHandle: Object
    ): TextInstance;

    appendInitialChild?(
        parentInstance: Instance,
        child: Instance | TextInstance
    ): void;

    appendChildToContainer?(
        container: Container,
        child: Instance | TextInstance
    ): void;

    prepareUpdate?(
        domElement: Instance,
        type: Type,
        oldProps: Props,
        newProps: Props,
        rootContainerInstance: Container,
        hostContext: HostContext
    ): null | UpdatePayload;

    commitUpdate?(
        domElement: Instance,
        updatePayload: UpdatePayload,
        type: Type,
        oldProps: Props,
        newProps: Props,
        internalInstanceHandle: Object
    ): void;

    appendChild?(
        parentInstance: Instance,
        child: Instance | TextInstance
    ): void;

    insertBefore?(
        parentInstance: Instance,
        child: Instance | TextInstance,
        beforeChild: Instance | TextInstance
    ): void;

    insertInContainerBefore?(
        container: Container,
        child: Instance | TextInstance,
        beforeChild: Instance | TextInstance
    ): void;

    removeChild?(
        parentInstance: Instance,
        child: Instance | TextInstance
    ): void;

    removeChildFromContainer?(
        container: Container,
        child: Instance | TextInstance
    ): void;

    commitTextUpdate?(
        textInstance: TextInstance,
        oldText: string,
        newText: string
    ): void;

    getRootHostContext(rootContainerInstance: Container): HostContext;

    getChildHostContext(
        parentHostContext: HostContext,
        type: string,
        rootContainerInstance: Container
    ): HostContext;

    finalizeInitialChildren(
        domElement: Instance,
        type: string,
        props: Props,
        rootContainerInstance: Container,
        hostContext: HostContext
    ): boolean;

    prepareForCommit(containerInfo: Container): Object | null | void;
    resetAfterCommit(containerInfo: Container): void;

    commitMount(
        domElement: Instance,
        type: string,
        newProps: Props,
        internalInstanceHandle: Object
    ): void;
};
export const isImgElement = (node: Element): node is HTMLImageElement => {
    return node.tagName === 'IMG';
};
