import { CheckCircle, Clock, Package, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { products } from "@/data/products";

const orders = [
  {
    id: "ORD-2024-001",
    date: "5 Jan 2024",
    status: "delivered",
    items: [
      { product: products[0], quantity: 1 },
      { product: products[1], quantity: 1 },
    ],
    total: products[0].price + products[1].price,
  },
  {
    id: "ORD-2024-002",
    date: "3 Jan 2024",
    status: "shipping",
    items: [{ product: products[2], quantity: 2 }],
    total: products[2].price * 2,
  },
  {
    id: "ORD-2024-003",
    date: "1 Jan 2024",
    status: "processing",
    items: [
      { product: products[3], quantity: 1 },
      { product: products[4], quantity: 1 },
    ],
    total: products[3].price + products[4].price,
  },
];

const statusConfig = {
  processing: {
    label: "Diproses",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  shipping: {
    label: "Dikirim",
    icon: Truck,
    color: "text-blue-600 bg-blue-100",
  },
  delivered: {
    label: "Diterima",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
};

const MyOrdersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        <PageHeader title="Pesanan Saya" />

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

                {/* Order Items - Clickable */}
                <div className="p-4">
                  <div className="flex gap-3">
                    {order.items.slice(0, 2).map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={`/product/${item.product.id}`}
                        className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 hover:ring-2 hover:ring-primary/50 transition-all"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
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
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}{" "}
                      item
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      Rp {order.total.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Order Action */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="w-full py-2.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Lihat Detail
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
            <p className="text-muted-foreground">Belum ada pesanan</p>
          </div>
        )}
      </div>

      <NavLink />
    </div>
  );
};

export default MyOrdersPage;
