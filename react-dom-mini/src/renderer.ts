import React from 'react';
// @ts-ignore
import Reconciler from 'react-reconciler';
import { isImgElement, ReconcilerDOMHostConfig } from './typings';

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

const hostConfig: ReconcilerDOMHostConfig = {
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
        return (
            typeof props.dangerouslySetInnerHTML === 'object' &&
            props.dangerouslySetInnerHTML !== null &&
            props.dangerouslySetInnerHTML.__html !== null
        );
    },

    /*
     * Сопоставляет хост-компонент с конкретным инстансом в среде
     * и обрабатывает первоначальные пропсы. Вызывается на всех нодах,
     * кроме текстовых листьев во время рендер-фазы
     *
     * Возвращает созданный инстанс
     * */
    createInstance(type, props) {
        const node = document.createElement(type);

        if (props.className) {
            node.className = props.className;
        }

        if (isImgElement(node) && props.src) {
            node.src = props.src;
        }

        if (props.onClick) {
            node.addEventListener('click', props.onClick);
        }

        return node;
    },

    /*
     * Создает представление для текстового листа в среде
     * Вызывается исключительно на текстовых листьях во время рендер-фазы
     *
     * Возвращает созданный текстовый инстанс
     * */
    createTextInstance(text) {
        return document.createTextNode(text);
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
    commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
        domElement.className = updatePayload.className ?? '';
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
        parentInstance.insertBefore(child, beforeChild);
    },

    /*
     * Аналогично insertBefore, только родитель – корневой контейнер
     */
    insertInContainerBefore(container, child, beforeChild) {
        container.insertBefore(child, beforeChild);
    },

    // Удаление узлов

    /*
     * Удаляет некоторого ребенка (и его детей)
     * Вызывается в стадии коммита
     */
    removeChild(parentInstance, child) {
        parentInstance.removeChild(child);
    },

    /*
     * Аналогично removeChild, если родитель – корневой контейнер
     */
    removeChildFromContainer(container, child) {
        container.removeChild(child);
    },

    // Обновление текстовых листьев

    /*
     * Выполняется во время коммит-фазы, если на текстовом листе произошло изменение
     */
    commitTextUpdate(textInstance, oldText, newText) {
        textInstance.nodeValue = newText;
    },

    // Заглушки
    getRootHostContext(rootContainerInstance) {},
    getChildHostContext(parentHostContext, type, rootContainerInstance) {},
    finalizeInitialChildren(domElement, type, props) {
        return false;
    },

    prepareForCommit() {},
    resetAfterCommit() {},

    commitMount(domElement, type, newProps) {},
};

const render = (jsx: React.ReactNode, root: Element | null) => {
    if (!root) {
        return;
    }

    const reconciler = Reconciler(hostConfig);
    const container = reconciler.createContainer(root, false, false);

    reconciler.updateContainer(jsx, container);
};

export default render;
