import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductManagement from "@/components/admin/ProductManagement";
import UserManagement from "@/components/admin/UserManagement";
import NotificationSender from "@/components/admin/NotificationSender";

const Admin = () => {
  return (
    <div className="space-y-6 pb-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your coffee shop</p>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationSender />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
