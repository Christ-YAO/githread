import Loader from "@/components/ui/loader";

export default function loading() {
  return (
    <div className="h-[80vh] grid place-content-center">
      <Loader />
    </div>
  );
}
