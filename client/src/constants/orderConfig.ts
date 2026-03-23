import { Clock, Package, Truck, CheckCircle2, XCircle } from "lucide-react";

export const ORDER_STATUS_CONFIG = {
    Pending: { 
        label: "Pending",
        color: "bg-amber-50 text-amber-600 border-amber-100", 
        icon: Clock 
    },
    Processing: { 
        label: "Processing",
        color: "bg-blue-50 text-blue-600 border-blue-100", 
        icon: Package 
    },
    Shipped: { 
        label: "Shipped",
        color: "bg-purple-50 text-purple-600 border-purple-100", 
        icon: Truck 
    },
    Delivered: { 
        label: "Delivered",
        color: "bg-emerald-50 text-emerald-600 border-emerald-100", 
        icon: CheckCircle2 
    },
    Cancelled: { 
        label: "Cancelled",
        color: "bg-stone-100 text-stone-400 border-stone-200", 
        icon: XCircle 
    },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS_CONFIG;