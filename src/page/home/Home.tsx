import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../../components/ui/card"
import { useEffect, useState } from "react";
import type { Product } from "@/model/Product";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate=useNavigate();
    const [result,setResult]=useState<Product[]>([]);

    useEffect(()=>{
      // Fix: Moving fetchData inside useEffect clears the lint warning
      const fetchData = async () => {
        try {
    
          const response = await fetch("https://fakestoreapi.com/products");
          const resp: Product[] = await response.json();
          setResult(resp);
        } catch (error) {
          console.error("Fetch error:", error);
        } 
      };

      fetchData();
        fetchData();
    },[])
  return (
<div className="grid grid-cols-3 gap-4">
{result && result.map((item)=>(
<Card className="relative mx-auto w-[98%] max-w-sm pt-0 border-0">
      <div className="absolute inset-0 z-10 aspect-video bg-stone-100" />
      <img
        src={item.image}
        alt={item.title}
        className="relative z-20 aspect-video w-full object-contain "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
        onClick={()=>{navigate(`/React_vite_CI-CD/detail/${item.id}`)}}
        variant="outline" className="w-full bg-orange-300 border-0">View Event</Button>
      </CardFooter>
    </Card>
    ))}
</div>
  )
}
