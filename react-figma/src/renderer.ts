import React from 'react';
// @ts-ignore
import Reconciler from 'react-reconciler';
import { backgroundColorAssign } from './helpers';
import { ReconcilerFigmaHostConfig } from './typings';

/*
 * Обработка дерева и порядок вызовов методов при:
 * - первоначальной отрисовке: https://github.com/LosYear/react-reconciler-talk-v2/blob/master/materials/images/initialRender.png
 * - изменении пропсов: https://github.com/LosYear/react-reconciler-talk-v2/blob/master/materials/images/propUpdate.png
 * – вставке элемента:
 *      https://github.com/LosYear/react-reconciler-talk-v2/blob/master/materials/images/appendChild.png
 *      https://github.com/LosYear/react-reconciler-talk-v2/blob/master/materials/images/insertBefore.png
 * – удалении элемента: https://github.com/LosYear/react-reconciler-talk-v2/blob/master/materials/images/removeChild.png
 * - изменении текстового листа: https://github.com/LosYear/react-reconciler-talk-v2/blob/master/materials/images/commitTextUpdate.png
 */

const hostConfig: ReconcilerFigmaHostConfig = {
    // Среда поддерживает мутацию нод
    supportsMutation: true,

    /*
     * Нужно ли обрабатывать вложенное содержимое как текст?
     * Вызывается во время рендер-фазы
     *
     * true: на следующем шаге будет создано представление узла
     * и дальнейший обход вложенного поддерева осуществляться не будет
     * false: рекурсивная обработка поддерева продолжается
     * */
    shouldSetTextContent: (type, props) => {
        return type === 'text';
    },

    /*
     * Сопоставляет хост-компонент с конкретным инстансом в среде
     * и обрабатывает первоначальные пропсы. Вызывается на всех нодах,
     * кроме текстовых листьев во время рендер-фазы
     *
     * Возвращает созданный инстанс
     * */
    createInstance(type, props) {
        let node;

        if (type === 'frame') {
            node = figma.createFrame();
        } else if (type === 'rectangle') {
            node = figma.createRectangle();
        } else if (type === 'text') {
            node = figma.createText();
            node.characters = props.children;
        } else {
            throw Error('Unsupported host-component');
        }

        node.x = props.x ?? node.x;
        node.y = props.y ?? node.y;

        node.resize(props.width ?? node.width, props.height ?? node.height);

        if (props.backgroundColor) {
            backgroundColorAssign(node, props.backgroundColor);
        }

        return node;
    },

    /*
     * Присоединяет ребенка к родителю
     * Вызывается на каждом ребенке, если родитель еще не отрисован на экране
     * (т.е. во время рендер-фазы)
     * */
    appendInitialChild(parentInstance, child) {
        parentInstance.appendChild(child);
    },

    /*
     * Добавляет ребенка корневому контейнеру
     * Вызывается для каждого ребенка во время коммит-фазы
     * */
    appendChildToContainer(container, child) {
        container.appendChild(child);
    },

    // Изменение пропсов

    /*
     * Проверяет наличие изменений и говорит реконсилятору, изменилось ли что-то
     * Основная задача – найти их, но не вносить. Рекурсивно вызывается на всех
     * вершинах изменившегося поддерева (кроме текстовых) во время рендер-фазы.
     * */
    prepareUpdate(instance, type, oldProps, newProps) {
        return newProps;
    },

    /*
     * Вносит изменения, найденные ранее. Вызывается в фазе коммита
     * на всех элементах, которые имеют updatePayload
     * */
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
        if (updatePayload.backgroundColor) {
            backgroundColorAssign(instance, updatePayload.backgroundColor);
        }
    },

    // Вставка узлов

    /*
     * Присоединяет ребенка к родителю
     * Вызывается для ребенка на стадии коммита, если родитель уже отрисован на экране
     * */
    appendChild(parentInstance, child) {
        parentInstance.appendChild(child);
    },

    /*
     * Вставляет нового ребенка перед некоторым узлом, который уже существует на экране
     * Вызывается во время коммит-фазы
     */
    insertBefore(parentInstance, child, beforeChild) {
        const index = parentInstance.children.indexOf(beforeChild);
        parentInstance.insertChild(index, child);
    },

    /*
     * Аналогично insertBefore, только родитель – корневой контейнер
     */
    insertInContainerBefore(container, child, beforeChild) {
        const index = container.children.indexOf(beforeChild);
        container.insertChild(index, child);
    },

    // Удаление узлов

    /*
     * Удаляет некоторого ребенка (и его детей)
     * Вызывается в стадии коммита
     */
    removeChild(parentInstance, child) {
        child.remove();
    },

    /*
     * Аналогично removeChild, если родитель – корневой контейнер
     */
    removeChildFromContainer(container, child) {
        child.remove();
    },

    // Заглушки
    getRootHostContext(rootContainerInstance) {},
    getChildHostContext(parentHostContext, type, rootContainerInstance) {},
    finalizeInitialChildren(instance, type, props) {
        return false;
    },

    prepareForCommit() {},
    resetAfterCommit() {},

    commitMount(instance, type, newProps) {},
};

export const render = (jsx: React.ReactNode, rootNode: ChildrenMixin) => {
    const reconciler = Reconciler(hostConfig);
    const container = reconciler.createContainer(rootNode);

    reconciler.updateContainer(jsx, container);
};
