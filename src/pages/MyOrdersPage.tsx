import { CheckCircle, ChevronLeft, Clock, Package, Truck } from "lucide-react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import NavLink from "@/components/NavLink";

const orders = [
  {
    id: "ORD-2024-001",
    date: "5 Jan 2024",
    status: "delivered",
    items: [products[0], products[1]],
    total: products[0].price + products[1].price,
  },
  {
    id: "ORD-2024-002",
    date: "3 Jan 2024",
    status: "shipping",
    items: [products[2]],
    total: products[2].price,
  },
  {
    id: "ORD-2024-003",
    date: "1 Jan 2024",
    status: "processing",
    items: [products[3], products[4]],
    total: products[3].price + products[4].price,
  },
];

const statusConfig = {
  processing: {
    label: "Processing",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  shipping: {
    label: "Shipping",
    icon: Truck,
    color: "text-blue-600 bg-blue-100",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
};

const MyOrdersPage = () => {
  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Link to="/profile" className="p-2 -ml-2">
            <ChevronLeft size={24} className="text-foreground" />
          </Link>
          <h1 className="text-xl font-display font-bold text-foreground">
            My Orders
          </h1>
        </div>

        {/* Orders List */}
        <div className="px-4 mt-4 space-y-4">
          {orders.map((order, index) => {
            const status =
              statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border/50 overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {order.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.color}`}
                  >
                    <StatusIcon size={14} />
                    <span className="text-xs font-medium">{status.label}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="flex gap-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="w-16 h-16 rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">
                          +{order.items.length - 2}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} item(s)
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      Rp {order.total.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Order Action */}
                <div className="px-4 pb-4">
                  <button className="w-full py-2.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Package size={64} className="text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No orders yet</p>
          </div>
        )}
      </div>

      <NavLink />
    </div>
  );
};

export default MyOrdersPage;
