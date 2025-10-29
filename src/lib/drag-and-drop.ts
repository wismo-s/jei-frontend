// filepath: /home/joel/Documents/dev/portals/erp/src/lib/drag-and-drop.ts
import {
    draggable,
    dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Order, OrderStage } from "@/features/crm/types/order";

export const makeDraggable = (element: HTMLElement, order: Order) => {
    return draggable({
        element,
        getInitialData: () => ({
            type: "order",
            order: JSON.stringify(order),
            sourceStage: order.stage,
            orderId: order.oid,
        }),
        onDragStart: () => {
            element.classList.add("order-card-dragging");
        },
        onDrop: () => {
            element.classList.remove("order-card-dragging");
        },
    });
};

export const makeDroppable = (
    element: HTMLElement,
    targetStage: OrderStage,
    onDrop: (order: Order, sourceStage: OrderStage, targetStage: OrderStage) => void,
) => {
    return dropTargetForElements({
        element,
        getData: () => ({
            type: "order-column",
            targetStage,
        }),
        canDrop: ({ source }) => {
            const sourceData = source.data;
            return (
                sourceData.type === "order" && sourceData.sourceStage !== targetStage
            );
        },
        onDragEnter: ({ source }) => {
            const sourceData = source.data;
            const canDrop =
                sourceData.type === "order" && sourceData.sourceStage !== targetStage;

            if (canDrop) {
                element.classList.add("drop-zone-can-drop");
            } else {
                element.classList.add("drop-zone-invalid");
            }
        },
        onDragLeave: () => {
            element.classList.remove(
                "drop-zone-can-drop",
                "drop-zone-invalid",
                "drop-zone-active",
            );
        },
        onDrop: ({ source }) => {
            element.classList.remove(
                "drop-zone-can-drop",
                "drop-zone-invalid",
                "drop-zone-active",
            );

            const sourceData = source.data;
            if (
                sourceData.type === "order" &&
                sourceData.order &&
                sourceData.sourceStage
            ) {
                try {
                    const order = JSON.parse(sourceData.order as string) as Order;
                    onDrop(order, sourceData.sourceStage as OrderStage, targetStage);
                } catch (error) {
                    console.error("Error parsing order data:", error);
                }
            }
        },
    });
};
