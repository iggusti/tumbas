import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import NavLink from "@/components/NavLink";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import EmptyState from "@/components/EmptyState";
import { useOrder, Order } from "@/contexts/OrderContext";
import { formatPrice } from "@/lib/formatters";

const statusConfig = {
  pending: {
    label: "Menunggu",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  processing: {
    label: "Diproses",
    icon: Clock,
    color: "text-amber-600 bg-amber-100",
  },
  shipped: {
    label: "Dikirim",
    icon: Truck,
    color: "text-blue-600 bg-blue-100",
  },
  delivered: {
    label: "Diterima",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  cancelled: {
    label: "Dibatalkan",
    icon: XCircle,
    color: "text-red-600 bg-red-100",
  },
};

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const { orders } = useOrder();

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getOrderItems = (order: Order) => {
    return order.items.map((item) => ({
      product: getProduct(item.productId),
      quantity: item.quantity,
    })).filter((item) => item.product);
  };

  return (
    <div className="mobile-container">
      <div className="page-content pb-24">
        {/* Header */}
        <PageHeader title="Pesanan Saya" />

        {/* Orders List */}
        <div className="px-4 mt-4 space-y-4">
          {orders.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Belum ada pesanan"
              description="Anda belum memiliki pesanan"
            />
          ) : (
            orders.map((order, index) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              const orderItems = getOrderItems(order);

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
                        {formatDate(order.createdAt)}
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
                      {orderItems.slice(0, 2).map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          to={`/product/${item.product?.id}`}
                          className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 hover:ring-2 hover:ring-primary/50 transition-all"
                        >
                          <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      ))}
                      {orderItems.length > 2 && (
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">
                            +{orderItems.length - 2}
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
                        {formatPrice(order.total)}
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
            })
          )}
        </div>
      </div>

      <NavLink />
    </div>
  );
};

export default MyOrdersPage;
