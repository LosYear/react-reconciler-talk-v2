type HostContext = any;
type Type = 'frame' | 'rectangle' | 'text';
type Props = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    backgroundColor?: string;
    children?: any;
};

type Container = ChildrenMixin;
type ParentInstance = ChildrenMixin;
type Instance = RectangleNode | FrameNode | TextNode;
type UpdatePayload = Props;

export type ReconcilerFigmaHostConfig = {
    supportsMutation?: boolean;

    shouldSetTextContent?(type: Type, props: Props): boolean;

    createInstance?(
        type: Type,
        props: Props,
        rootContainerInstance: Container,
        hostContext: HostContext,
        internalInstanceHandle: Object
    ): Instance;

    appendInitialChild?(parentInstance: ParentInstance, child: Instance): void;

    appendChildToContainer?(container: Container, child: Instance): void;

    prepareUpdate?(
        node: Instance,
        type: Type,
        oldProps: Props,
        newProps: Props,
        rootContainerInstance: Container,
        hostContext: HostContext
    ): null | UpdatePayload;

    commitUpdate?(
        node: Instance,
        updatePayload: UpdatePayload,
        type: Type,
        oldProps: Props,
        newProps: Props,
        internalInstanceHandle: Object
    ): void;

    appendChild?(parentInstance: ParentInstance, child: Instance): void;

    insertBefore?(
        parentInstance: ParentInstance,
        child: Instance,
        beforeChild: Instance
    ): void;

    insertInContainerBefore?(
        container: Container,
        child: Instance,
        beforeChild: Instance
    ): void;

    removeChild?(parentInstance: ParentInstance, child: Instance): void;

    removeChildFromContainer?(container: Container, child: Instance): void;

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

declare global {
    namespace JSX {
        interface IntrinsicElements {
            rectangle: Props;
            frame: Props;
            // @ts-ignore
            text: Props;
        }
    }
}
