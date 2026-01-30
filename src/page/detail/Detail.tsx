import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Or use your router of choice
import { Star, ArrowLeft, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import type { Product } from "@/model/Product";

export default function ProductDetailPage() {
 // const { id } = useParams<{ id: string }>();
  const{id} =useParams<{id:string}>();
  const [product, setProduct] = useState<Product |null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        // 1. Fetch main product
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: Product = await res.json();
        setProduct(data);

        // 2. Fetch related products (from same category)
        const relRes = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
        const relData: Product[] = await relRes.json();
        setRelated(relData.filter(p => p.id !== data.id).slice(0, 4)); // Exclude current and limit to 4
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) return <div className="p-20 text-center text-xl">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Back Link */}
      <Link to="/">
        <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Product Image */}
        <div className="bg-white rounded-4xl border-amber-600 p-12 flex justify-center items-center shadow-sm">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[500px] object-contain"
          />
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge className="capitalize text-sm px-3">{product.category}</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-600">{product.title}</h1>
            <div className="flex items-center gap-2 px-7">
               <div className="flex text-yellow-500">
                  {/* Quick Rating Stars */}
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating.rate) ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
               </div>
               <span className="text-sm font-medium">{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>
          </div>

          <p className="text-4xl font-bold text-stone-500">${product.price}</p>
          <Separator />
          <p className="text-muted-foreground leading-relaxed text-lg text-stone-500">{product.description}</p>
          
          <div className="flex gap-4 pt-4">
            <Button size="lg" variant="outline" className="h-14 w-fit bg-orange-400 text-lg text-white">Add to Cart</Button>
            <Button size="lg" variant="secondary" className="px-8 h-14">Wishlist</Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="p-4 border rounded-lg flex items-center gap-3">
               <Truck className="h-6 w-6 text-primary" />
               <span className="text-sm font-medium">Fast Global Shipping</span>
            </div>
            <div className="p-4 border rounded-lg flex items-center gap-3">
               <ShieldCheck className="h-6 w-6 text-primary" />
               <span className="text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-24 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">You Might Also Like</h2>
          <Link to={`/category/${product.category}`} className="text-primary hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`}>
              <Card className=" border-0 hover:shadow-md transition-shadow h-full flex flex-col">
                <CardHeader className="p-4 flex-grow">
                   <div className="aspect-square w-full bg-white flex items-center justify-center mb-4">
                      <img src={item.image} alt={item.title} className="max-h-32 object-contain" />
                   </div>
                   <CardTitle className="text-sm line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="font-bold">${item.price}</span>
                  <Badge variant="outline">View</Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}