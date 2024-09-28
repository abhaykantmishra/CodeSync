'use client'
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <main className="">
      Hello from next app!!
      <Button 
        onClick={() => {console.log("clicked button!!")}} 
        variant="outline" 
      >Hello</Button>
      {/* <Heatmap /> */}
    </main>
  );
}
