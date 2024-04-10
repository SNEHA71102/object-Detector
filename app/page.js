import Image from "next/image";
import ObjectDetection from "./components/object-detection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      {/* md: medium-screen ,lg larger-screen tracking-tighter is->letterspacing  */}
      {/* font-extrabold is-> tailwind css component */}
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-align:center">
        Thief Detection Alarm
      </h1>
      <ObjectDetection/>
    </main>
  );
}
