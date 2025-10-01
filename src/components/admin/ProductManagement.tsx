import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { productSchema } from "@/lib/validations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  subcategory: string;
  available: boolean;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("category", { ascending: true });

    if (error) {
      toast.error("Failed to load products");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      image_url: formData.get("image_url") as string,
      category: formData.get("category") as string,
      subcategory: formData.get("subcategory") as string,
    };

    // Validate input
    const validation = productSchema.safeParse(rawData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    const { name, description, price, image_url, category, subcategory } = validation.data;
    const productData = {
      name,
      description,
      price,
      image_url,
      category,
      subcategory,
      available: true,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);

      if (error) {
        toast.error("Failed to update product");
      } else {
        toast.success("Product updated successfully");
        setDialogOpen(false);
        setEditingProduct(null);
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from("products").insert(productData);

      if (error) {
        toast.error("Failed to create product");
      } else {
        toast.success("Product created successfully");
        setDialogOpen(false);
        fetchProducts();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete product");
    } else {
      toast.success("Product deleted successfully");
      fetchProducts();
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setEditingProduct(null)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update the product details below"
                : "Fill in the details to create a new product"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingProduct?.name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingProduct?.description}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={editingProduct?.price}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                type="url"
                defaultValue={editingProduct?.image_url}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={editingProduct?.category || "Coffee"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coffee">Coffee</SelectItem>
                  <SelectItem value="Pastry">Pastry</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input
                id="subcategory"
                name="subcategory"
                defaultValue={editingProduct?.subcategory || "General"}
                placeholder="e.g., Espresso Based, Fresh Baked"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? "Update" : "Create"} Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openEditDialog(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <p className="text-sm text-muted-foreground mb-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary">{product.category}</p>
                  <p className="text-xs text-muted-foreground">{product.subcategory}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
